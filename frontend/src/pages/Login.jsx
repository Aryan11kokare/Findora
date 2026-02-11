import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../redux/actions/userActions";
import { useDispatch } from "react-redux";
import { Eye, EyeClosed } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const responce = await dispatch(userLogin({ email, password }));

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
      await setError(JSON.stringify(responce.payload));
    } else {
      setTimeout(() => {
        setLoading(false);
        navigate("/dashboard");
        setEmail("");
        setPassword("");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-orange-500">
            Findora
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-white">Welcome back</h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <div className="bg-neutral-800 rounded-lg shadow-xl border border-neutral-700 p-8">
          {error && (
            <div className="mb-4 bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type={show === true ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                placeholder="••••••••"
              />

              {show === true ? (
                <Eye
                  onClick={() => setShow((c) => !c)}
                  className="absolute right-3 cursor-pointer top-13 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              ) : (
                <EyeClosed
                  onClick={() => setShow((c) => !c)}
                  className="absolute right-3 cursor-pointer top-13 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-orange-500 hover:text-orange-400 font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
