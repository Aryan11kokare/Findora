import { BadgeCheck, Trash2 } from "lucide-react";

const CommentCard = ({ comment, handleCommentDelete }) => {
  return (
    <div className="w-full min-h-[5rem] border border-gray-500 px-2 flex justify-between mb-4 rounded-md  bg-black text-white">
      <div className=" p-2 rounded-md">
        <h3 className="text-gray-300 mb-1 flex gap-2 text-xs font-bold justify-start items-center">
          {comment.user.username}
          <BadgeCheck size={16} className="text-blue-600" />
        </h3>
        <div className="text-sm ">{comment.message}</div>
      </div>
      <div className="flex justify-center   items-start mt-2">
        <button
          onClick={() => handleCommentDelete(comment._id)}
          className="cursor-pointer"
        >
          <Trash2 className=" text-red-500" size={18} />
        </button>
      </div>
    </div>
  );
};

export default CommentCard;
