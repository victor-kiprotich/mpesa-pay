import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "./index.css";

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("Processing payment...");

    try {
      const response = await axios.post(
        "https://mpesa-pay-backend.onrender.com/api/payment/initiate",
        {
          phone: formData.phone,
          amount: formData.amount,
          till: formData.till,
        }
      );

      setStatus(
        `Payment initiated! CheckoutRequestID: ${response.data.response.CheckoutRequestID}`
      );
    } catch (error: any) {
      setStatus(
        `Payment failed: ${error.response?.data?.message || error.message}`
      );
    }
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
