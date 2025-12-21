import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        username,
        password,
      });

      localStorage.setItem("adminToken", res.data.token);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    // const validUsername = "123";
    // const validPassword = "123";

    // if (username === validUsername && password === validPassword) {
    //   toast.success("Login successful!");

    //   // store admin authentication (dummy)
    //   localStorage.setItem(
    //     "adminAuth",
    //     JSON.stringify({ username: validUsername })
    //   );

    //   navigate("/admin");
    // } else {
    //   setError("Invalid username or password");
    // }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Admin Username
            </label>
            <input
              type="text"
              placeholder="admin"
              className="block w-full px-3 py-2 mt-1 border rounded-2xl shadow-sm border-gray-300"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="block w-full px-3 py-2 mt-1 border rounded-2xl shadow-sm border-gray-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login button */}
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-2xl text-white bg-indigo-600 hover:bg-indigo-700 shadow"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
