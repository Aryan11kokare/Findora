import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ItemCard from "../componets/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllItems } from "../redux/actions/itemActions";
import { getUser } from "../redux/actions/userActions";
import { Search } from "lucide-react";
import logo from "../assets/findoralogo.png";

export default function Dashboard() {
  const itemState = useSelector((state) => state.item);
  const userState = useSelector((state) => state.user);
  const [loding, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("lost");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const route = useNavigate();

  const lostItems = itemState.items.filter((el) => el.type === "lost");

  const foundItems = itemState.items.filter((el) => el.type === "found");

  const items = activeTab === "lost" ? lostItems : foundItems;

  const fetchTickets = async () => {
    setLoading(true);
    const responce = await dispatch(getAllItems());
    await dispatch(getUser());
    if (responce?.error?.name === "JsonWebTokenError") {
      localStorage.removeItem("token");
      route("/login");
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
    fetchTickets();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    route("/");
  };

  useEffect(() => {
    console.log(itemState.items);
  }, [itemState.items]);

  const filteredComplaints = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });
  }, [searchTerm, itemState?.items, activeTab]);

  if (loding) {
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
              <Link
                to={"/"}
                className="text-2xl font-bold flex  text-orange-500"
              >
                Findora
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300 text-sm">
                {userState?.user?.email}
              </span>
              <button
                onClick={handleSignOut}
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your lost and found items</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Lost</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {lostItems?.length}
                </p>
              </div>
              <div className="bg-red-600/20 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Found</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {foundItems?.length}
                </p>
              </div>
              <div className="bg-green-600/20 p-3 rounded-lg">
                <svg
                  className="w-8 h-8 text-green-500"
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
              </div>
            </div>
          </div>

          <div className="bg-neutral-800 border border-neutral-700 rounded-lg  p-6">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Search Items
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title or description..."
                className="w-full  py-3 pl-10 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 rounded-lg overflow-hidden">
          <div className="border-b border-neutral-700">
            <div className="flex">
              <button
                onClick={() => setActiveTab("lost")}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === "lost"
                    ? "bg-neutral-700 text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Lost Items
              </button>
              <button
                onClick={() => setActiveTab("found")}
                className={`px-6 py-4 font-medium transition ${
                  activeTab === "found"
                    ? "bg-neutral-700 text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Found Items
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                {activeTab === "lost" ? "Your Lost Items" : "Items You Found"}
              </h2>
              <Link
                to={"/addItem"}
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                + Report New Item
              </Link>
            </div>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredComplaints.map((item, index) => (
                <ItemCard key={index} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
