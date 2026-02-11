import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  const [isLogin, setIsLogin] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-14 h-14 text-orange-100 fill-orange-500 animate-spin fill-brand"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-900">
      <nav className="bg-neutral-800 border-b border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-orange-500">
                Findora
              </span>
            </div>
            <div className="flex items-center space-x-4">
              {isLogin === true ? (
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    setIsLogin(false);
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Find What You've Lost,
              <span className="block text-orange-500 mt-2">
                Return What You've Found
              </span>
            </h1>
            <p className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto">
              Connect people with their lost belongings. Our platform makes it
              easy to report lost items and help reunite them with their owners.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/signup"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition transform hover:scale-105"
              >
                Get Started
              </Link>
              <Link
                to="/dashboard"
                className="bg-neutral-700 hover:bg-neutral-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition border border-neutral-600"
              >
                Browse Items
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Simple steps to reunite with your belongings
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-neutral-700 p-8 rounded-xl border border-neutral-600 hover:border-orange-600 transition">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Report Item
              </h3>
              <p className="text-gray-400">
                Create a detailed report of your lost or found item with photos
                and description.
              </p>
            </div>

            <div className="bg-neutral-700 p-8 rounded-xl border border-neutral-600 hover:border-orange-600 transition">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Search & Match
              </h3>
              <p className="text-gray-400">
                Browse through reported items or let our system match your
                report with existing entries.
              </p>
            </div>

            <div className="bg-neutral-700 p-8 rounded-xl border border-neutral-600 hover:border-orange-600 transition">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Connect & Reunite
              </h3>
              <p className="text-gray-400">
                Connect with the finder or owner and arrange a safe way to
                return the item.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Community-Driven Platform
              </h2>
              <p className="text-gray-400 text-lg mb-6">
                Join thousands of people helping each other find lost items. Our
                community is built on trust, compassion, and the simple belief
                that lost things deserve to be found.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-orange-500 mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Quick and easy item reporting
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-orange-500 mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">Secure messaging system</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-orange-500 mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">
                    Smart matching algorithms
                  </span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-orange-500 mr-3 mt-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-300">Location-based search</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl p-12 text-center">
              <div className="text-6xl font-bold text-white mb-4">10,000+</div>
              <p className="text-xl text-orange-100 mb-8">
                Items Successfully Reunited
              </p>
              <Link
                to="/signup"
                className="inline-block bg-white text-orange-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-800 border-t border-neutral-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="mb-2">© 2026 Findora. All rights reserved.</p>
            <p className="text-sm">
              Helping communities reunite with their belongings.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
