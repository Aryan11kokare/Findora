import { AlertCircle, ArrowLeft, FastForward } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createItem } from "../redux/actions/itemActions.js";
import { geocodeAddress } from "../utils/geocode.js";

const AddItem = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [media, setMedia] = useState();

  const dispatch = useDispatch();
  const route = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const code = await geocodeAddress(
      `${location},${city},${state},${country}`,
    );

    console.log(code);

    if (code === null) {
      setLoading(false);
      return setError("Please Enter valid Address");
    }

    const responce = await dispatch(
      createItem({
        title: title,
        description: description,
        type: type,
        country: country,
        state: state,
        city: city,
        location: location,
        media: media,
        lat: code.lat,
        lng: code.lng,
      }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
      await setError(JSON.stringify(responce.payload));
    } else {
      setTimeout(() => {
        setLoading(false);
        route("/dashboard");
      }, 2000);
    }
  };
  return (
    <div className=" bg-neutral-900 px-10 pb-10">
      <div className="mb-4 w-full flex justify-between py-8 ">
        <div>
          <h1 className="text-4xl font-bold text-orange-600 mb-2">Findora</h1>
          <p className="text-gray-300 ">Add Your Found/Lost Item</p>
        </div>
        <div className="flex text-white justify-center items-center gap-2">
          <Link
            to={"/dashboard"}
            className="flex justify-center gap-2 items-center border rounded-full py-2 px-4"
          >
            <ArrowLeft />
            back
          </Link>
        </div>
      </div>
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="w-full py-8 px-10 sm:px-20  text-white  bg-neutral-800 border border-neutral-700 rounded-lg "
      >
        <div className="w-full sm:flex gap-10  ">
          <div className="w-full">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <br />
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title"
              required
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="type" className="font-medium">
              Type
            </label>
            <br />
            <select
              id="type"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            >
              <option>Select the Type</option>
              <option value={"lost"}>Lost</option>
              <option value={"found"}>Found</option>
            </select>
          </div>

          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="endTime" className="font-medium">
              Image
            </label>
            <br />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              required
              onChange={(e) => setMedia(e.target.files[0])}
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <div className="mt-4 sm:mt-8 w-full">
          <label htmlFor="description" className="font-medium">
            Description
          </label>
          <br />
          <textarea
            type="text"
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the short about event"
            className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
          />
        </div>

        <hr className="my-4" />
        <h3 className="font-bold text-2xl">Location</h3>
        <div className="w-full sm:flex gap-10  mt-4  ">
          <div className="w-full">
            <label htmlFor="address" className="font-medium">
              Address
            </label>
            <br />
            <input
              type="text"
              name="address"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              placeholder="Enter the Address"
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="city" className="font-medium">
              City
            </label>
            <br />
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              placeholder="Mumbai"
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <div className="w-full sm:flex gap-10  mt-4 sm:mt-8 ">
          <div className="w-full">
            <label htmlFor="state" className="font-medium">
              State
            </label>
            <br />
            <input
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Maharastra"
              required
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
          <div className="w-full mt-4 sm:mt-0">
            <label htmlFor="country" className="font-medium">
              Country
            </label>
            <br />
            <input
              type="text"
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
              placeholder="India"
              className="w-full mt-2 px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
            />
          </div>
        </div>
        <br />
        <br />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddItem;
