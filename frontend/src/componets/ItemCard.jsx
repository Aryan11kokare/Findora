import React from "react";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { BASE_URL } from "../redux";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-black text-white block max-w-sm p-6 border border-gray-500 rounded-md shadow-xs">
      <Link>
        <img
          className="rounded-base object-cover h-50 w-full rounded-md"
          src={`${BASE_URL}/${item.image}`}
          alt=""
        />
      </Link>
      <Link>
        <h5 className="mt-6 mb-2 text-2xl font-semibold tracking-tight text-heading">
          {item.title}
        </h5>
      </Link>
      <p className="mb-6 text-body">{item.description}</p>
      <div className=" flex justify-between items-center">
        <Link
          to={`/viewItem/${item._id}`}
          className="inline-flex gap-2 items-center text-body bg-neutral-secondary-medium box-border border border-gray-500 rounded-md hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
        >
          View details
          <MoveRight strokeWidth={1.5} />
        </Link>
        {item.type === "lost" ? (
          <button className="text-white flex justify-center items-center bg-red-500 p-2 h-8 w-8 font-bold text-sm">
            L
          </button>
        ) : (
          <button className="text-white flex justify-center items-center bg-green-500 p-2 h-8 w-8 font-bold text-sm">
            F
          </button>
        )}
      </div>
    </div>
  );
};

export default ItemCard;
