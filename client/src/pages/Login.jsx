import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({});
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", form);
    login(data);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center bg-[#f9f6de] min-h-full">
      <form onSubmit={submit} className="bg-[#efe49c] p-8 shadow rounded w-96">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="border border-green-600 rounded p-2 w-full mb-4 bg-transparent outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-green-600 rounded p-2 w-full mb-4 bg-transparent outline-none focus:ring-2 focus:ring-green-500"
          onChange={(e) => setForm({...form, password: e.target.value})}
        />
        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">
          Login
        </button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold hover:text-green-700">
            Click here to register
          </Link>
        </p>
      </form>
    </div>
  );
}
