import { ArrowLeft, BadgeCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommentCard from "../componets/CommentCard";
import { getUser } from "../redux/actions/userActions";
import { BASE_URL, clientServer } from "../redux";
import {
  createComment,
  deleteComment,
  deleteItem,
  getItemById,
} from "../redux/actions/itemActions";
import Map from "../componets/Map";
import ItemCard from "../componets/ItemCard";

const View = () => {
  const itemState = useSelector((state) => state.item);
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [item, setItem] = useState();
  const [matchItems, setMatchItems] = useState([]);
  const [comment, setComment] = useState("");
  const path = window.location.href.split("/")[4];
  const dispatch = useDispatch();
  const route = useNavigate();

  const featchData = async () => {
    setLoading(true);
    await dispatch(getUser());
    await dispatch(getItemById({ id: path }));
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const featchMatchData = async () => {
    setLoading(true);
    const responce = await clientServer.get(`/match/${path}`, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });
    setMatchItems(responce.data);
    setTimeout(() => {
      setLoading(false);
    }, 250);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      route("/login");
    }
    featchData();
    featchMatchData();
  }, [path]);

  useEffect(() => {
    setItem(itemState.item);
  }, [itemState?.item]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const responce = await dispatch(
      createComment({ comment: comment, itemId: item._id }),
    );

    if (responce?.error?.message === "Rejected") {
      await setLoading(false);
    } else {
      await dispatch(getItemById({ id: path }));
      setTimeout(() => {
        setComment("");
        setLoading(false);
      }, 2000);
    }
  };

  const handleCommentDelete = async (id) => {
    setLoading(true);
    await dispatch(deleteComment({ commentId: id }));
    await dispatch(getItemById({ id: path }));
    setTimeout(() => {
      setComment("");
      setLoading(false);
    }, 1000);
  };

  const handleDelete = async () => {
    setLoading(true);
    await dispatch(deleteItem({ id: itemState?.item?._id }));
    setLoading(false);
    route("/dashboard");
  };

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
    <>
      <div className="min-h-screen bg-neutral-900 text-white ">
        <section className=" w-full flex justify-between py-6 px-10">
          <div>
            <h1 className="text-4xl font-bold text-orange-500 mb-2">Findora</h1>
            <p className="text-gray-400 flex gap-2 justify-center items-center ">
              {item?.user.email}
              <BadgeCheck size={16} className="text-blue-600" />
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Link
              to={"/dashboard"}
              className="flex justify-center gap-2 items-center border rounded-full py-2 px-4"
            >
              <ArrowLeft />
              back
            </Link>
          </div>
        </section>
        <section className="md:h-[70vh] md:flex px-10">
          <div className="h-full md:w-[50%] flex justify-center items-center ">
            <img
              src={`${BASE_URL}/${item?.image}`}
              alt="Event image logo"
              className=" h-full w-full rounded-xl object-cover"
            />
          </div>
          <div className="h-full md:w-[50%] md:px-6 py-4 flex flex-col justify-start">
            <h2 className=" font-bold  text-4xl ">{item?.title}</h2>
            <p className="text-gray-400 text-xl mt-2">{item?.description}</p>

            <hr className="my-4" />
            <h3 className="text-xl font-bold">Location</h3>
            <p className="text-gray-400  mt-4">
              <span className="text-white text-base font-medium">
                Address :{" "}
              </span>
              {item?.location}
            </p>
            <p className="text-gray-400  mt-2">
              <span className="text-white text-base font-medium">city : </span>
              {item?.city}
            </p>
            <p className="text-gray-400  mt-2">
              <span className="text-white text-base font-medium">state : </span>
              {item?.state}
            </p>
            <p className="text-gray-400  mt-2">
              <span className="text-white text-base font-medium">
                Country :{" "}
              </span>
              {item?.country}
            </p>
            <hr className="my-4" />
            <div className="flex justify-between items-center mb-3">
              <p className="text-gray-400 ">
                <span className="text-white text-lg font-medium">
                  Phone No :{" "}
                </span>
                +91 {item?.user.phone}
              </p>
              {item?.type === "lost" ? (
                <button className="text-white flex justify-center items-center bg-red-500 p-2 h-8 w-8 font-bold text-sm">
                  L
                </button>
              ) : (
                <button className="text-white flex justify-center items-center bg-green-500 p-2 h-8 w-8 font-bold text-sm">
                  F
                </button>
              )}
            </div>
            {userState?.user?._id.toString() ===
            itemState?.item?.user._id.toString() ? (
              <button
                onClick={handleDelete}
                className="flex justify-center font-bold gap-2 w-full items-center bg-red-600 text-white rounded-md py-2 px-4"
              >
                Delete Item
              </button>
            ) : null}
          </div>
        </section>
        <br />
        <br />
        <hr className="mx-8 border rounded-full border-gray-200" />
        <section className="md:min-h-[90vh] md:flex px-10">
          <div className="h-full md:w-[50%] md:pr-6 py-8  ">
            <form onSubmit={handleSubmit} className="w-full">
              <label className="font-bold text-xl" htmlFor="review">
                Comment
              </label>
              <p className="text-gray-400 text-sm mb-4">If item is yours</p>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write the event review"
                required
                className="w-full px-4 py-3 bg-neutral-700 border border-neutral-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
              ></textarea>
              <button
                type="submit"
                className="w-full mt-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition"
              >
                Send
              </button>
            </form>

            <hr className="my-4" />
            <Map />
          </div>
          <div className=" md:min-h-[90vh] md:w-[50%] md:px-6 py-4 flex flex-col justify-start items-start ">
            <h4 className="font-bold text-xl" htmlFor="review">
              Comments
            </h4>
            <div className="mt-4 h-full  w-full commentBox bg-neutral-800 border border-neutral-700 rounded-lg p-4 overflow-y-scroll">
              {item?.comments.map((el) => {
                return (
                  <CommentCard
                    key={el._id}
                    comment={el}
                    handleCommentDelete={handleCommentDelete}
                  />
                );
              })}
            </div>
          </div>
        </section>
        <hr className="mx-8 border rounded-full border-gray-200 " />
        <section className="px-10 py-4">
          <h3 className="font-bold text-xl">Match Items</h3>
          <p className="text-gray-300 ">Find your {item?.title}</p>
          <br />
          <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
            {matchItems.map((item, index) => (
              <ItemCard key={index} item={item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default View;
