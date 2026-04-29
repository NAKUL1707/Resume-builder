import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();
    setError("")
    if (!email || !password) {
      setError("Please enter email and password")
      return
    }
    setLoading(true)
    try {
      // FIX: was calling /api/auth/registerUser (wrong endpoint + wrong path)
      // Correct endpoint is /auth/login
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }
      // Store token for authenticated requests
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify({ name: data.name, email: data.email }))
      navigate("/builder");
    } catch (err) {
      setError("Network error. Is the server running?")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm p-8 border border-white/10 rounded-2xl shadow-lg mx-auto bg-slate-900/55 backdrop-blur"
    >
      {error && (
        <p className="text-red-400 text-sm bg-red-900/20 rounded-lg px-3 py-2">{error}</p>
      )}
      <div>
        <label className="text-slate-200 text-sm">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="david@gmail.com"
          className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-950/60 text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="text-slate-200 text-sm">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-slate-600 rounded-lg p-2 mt-1 bg-slate-950/60 text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition"
        />
      </div>
      <div className="flex flex-row gap-3 mt-1">
        <button
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-full px-5 py-2 hover:from-sky-400 hover:to-indigo-400 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <button
          type="button"
          className="text-slate-200 hover:bg-slate-700/50 rounded-full px-4 py-2 transition"
          onClick={() => navigate("/Signup")}
        >
          Sign up
        </button>
      </div>
    </form>
  )
}

export default Login
