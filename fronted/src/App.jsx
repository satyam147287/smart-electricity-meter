
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [meterId, setMeterId] = useState("101");
  const [bill, setBill] = useState(null);
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [currentReading, setCurrentReading] = useState("");
  const [message, setMessage] = useState("");

  const [meters, setMeters] = useState([]);

  // YAHAN fetchMeters FUNCTION PASTE KARO
  const fetchMeters = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/meter");

      if (!response.ok) {
        throw new Error("Meters load nahi ho paaye.");
      }

      const data = await response.json();
      setMeters(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchMeters();
  }, []);

  // Iske neeche tumhara existing code
  
  // Get Electricity Bill
  const getBill = async () => {
    try {
      setError("");
      setMessage("");
      setBill(null);

      const response = await fetch(
        `http://127.0.0.1:8000/meter/${meterId}/bill`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail || "Meter nahi mila.")
        );
      }

      setBill(data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Add New Meter
  const addMeter = async () => {
    try {
      setError("");
      setMessage("");

      const response = await fetch("http://127.0.0.1:8000/meter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          meter_id: Number(meterId),
          customer_id: Number(customerId),
          current_reading: Number(currentReading),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail || "Meter create nahi hua.")
        );
      }

      setMessage("New meter successfully create ho gaya!");
      await fetchMeters();

      setCustomerId("");
      setCurrentReading("");

    } catch (err) {
      setError(err.message);
    }
  };

  // Update Existing Meter Reading
  const updateReading = async () => {
    try {
      setError("");
      setMessage("");

      const response = await fetch(
        `http://127.0.0.1:8000/meter/${meterId}?current_reading=${currentReading}`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          typeof data.detail === "string"
            ? data.detail
            : JSON.stringify(data.detail || "Reading update nahi hui.")
        );
      }

      setMessage("Meter reading successfully update ho gayi!");
      await fetchMeters();
      await getBill();

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Smart Electricity Meter</h1>
      <p>Electricity Consumption Dashboard</p>

      {/* Dashboard Grid */}
      <div className="dashboard-grid">

        {/* Meter Details */}
        <div className="card">
          <h2>Meter Details</h2>

          <label>Meter ID</label>
          <input
            type="number"
            value={meterId}
            onChange={(e) => setMeterId(e.target.value)}
          />

          <button onClick={getBill}>
            Get Electricity Bill
          </button>
        </div>

        {/* Add New Meter */}
        <div className="card">
          <h2>Add New Meter</h2>

          <label>Meter ID</label>
          <input
            type="number"
            value={meterId}
            onChange={(e) => setMeterId(e.target.value)}
          />

          <label>Customer ID</label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />

          <label>Current Reading</label>
          <input
            type="number"
            value={currentReading}
            onChange={(e) => setCurrentReading(e.target.value)}
          />

          <button onClick={addMeter}>
            Add Meter
          </button>
        </div>

        {/* Update Reading */}
        <div className="card">
          <h2>Update Meter Reading</h2>

          <label>Meter ID</label>
          <input
            type="number"
            value={meterId}
            onChange={(e) => setMeterId(e.target.value)}
          />

          <label>New Current Reading</label>
          <input
            type="number"
            value={currentReading}
            onChange={(e) => setCurrentReading(e.target.value)}
          />

          <button onClick={updateReading}>
            Update Reading
          </button>
        </div>

      </div>

      
    
{/* Customer-wise Meter Details */}
<div className="card">
  <h2>Customer-wise Meter Details</h2>

  <label>Enter Customer ID</label>
  <input
    type="number"
    value={customerId}
    onChange={(e) => setCustomerId(e.target.value)}
    placeholder="Enter Customer ID"
  />

  <button onClick={fetchMeters}>
    Search Customer
  </button>

  {customerId === "" ? (
    <p>Please enter a Customer ID.</p>
  ) : meters.filter(
      (meter) =>
        String(meter.customer_id) === String(customerId)
    ).length === 0 ? (
    <p>No meters found for this customer.</p>
  ) : (
    <table>
      <thead>
        <tr>
          <th>Meter ID</th>
          <th>Previous Reading</th>
          <th>Current Reading</th>
          <th>Units Consumed</th>
          <th>Total Bill</th>
        </tr>
      </thead>

      <tbody>
        {meters
          .filter(
            (meter) =>
              String(meter.customer_id) === String(customerId)
          )
          .map((meter) => {
            const units =
              meter.current_reading - meter.previous_reading;

            const totalBill = units * 8;

            return (
              <tr key={meter.id}>
                <td>{meter.meter_id}</td>
                <td>{meter.previous_reading}</td>
                <td>{meter.current_reading}</td>
                <td>{units}</td>
                <td>₹{totalBill}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  )}
</div>


      
      {/* All Meters */}
      <div className="card">
        <h2>All Meters</h2>

        <button onClick={fetchMeters}>
          Refresh Meter List
        </button>

        {meters.length === 0 ? (
          <p>No meters found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Meter ID</th>
                <th>Customer ID</th>
                <th>Previous Reading</th>
                <th>Current Reading</th>
              </tr>
            </thead>

            <tbody>
              {meters.map((meter) => (
                <tr key={meter.id}>
                  <td>{meter.meter_id}</td>
                  <td>{meter.customer_id}</td>
                  <td>{meter.previous_reading}</td>
                  <td>{meter.current_reading}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      {/* Success Message */}
      {message && (
        <p className="success-message">{message}</p>
      )}

      {/* Error Message */}
      {error && (
        <p className="error-message">{error}</p>
      )}
      {/* Bill Summary */}
      {bill && (
        <div className="card bill-summary">
          <h2>Bill Summary</h2>

          <p>Meter ID: {bill.meter_id}</p>
          <p>Previous Reading: {bill.previous_reading}</p>
          <p>Current Reading: {bill.current_reading}</p>
          <p>Units Consumed: {bill.units_consumed}</p>
          <p>Rate Per Unit: ₹{bill.rate_per_unit}</p>

          <h2>Total Bill: ₹{bill.total_bill}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
