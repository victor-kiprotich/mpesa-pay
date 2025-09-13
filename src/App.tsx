import React, { useState, ChangeEvent, FormEvent } from "react";
import "./index.css"; // Import styles

interface FormData {
  phone: string;
  amount: string;
  till: string;
}

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    phone: "",
    amount: "",
    till: "",
  });

  const [status, setStatus] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Processing payment...");

    setTimeout(() => {
      setStatus(
        `Payment of KES ${formData.amount} to Till/Paybill ${formData.till} initiated for ${formData.phone}`
      );
    }, 1500);
  };

  return (
    <div className="container">
      <h1 className="title">M-Pesa Payment</h1>

      <form className="form" onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="phone"
          placeholder="Phone Number (07XXXXXXXX)"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="number"
          name="amount"
          placeholder="Amount (KES)"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <input
          className="input"
          type="text"
          name="till"
          placeholder="Till/Paybill Number"
          value={formData.till}
          onChange={handleChange}
          required
        />

        <button className="button" type="submit">
          Pay Now
        </button>
      </form>

      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default App;
