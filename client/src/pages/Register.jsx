import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      return setError("All fields are required.");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      const { data } = await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      login(data);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#f9f6de] min-h-full px-4">
      <div className="w-full max-w-md bg-[#efe49c] shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-green-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-transparent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-green-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-transparent"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-green-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-transparent"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-green-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none bg-transparent"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold hover:text-green-700">
            Click here to login
          </Link>
        </p>
      </div>
    </div>
  );
}
