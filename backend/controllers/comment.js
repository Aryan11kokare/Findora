import Item from "../models/item.js";
import Comment from "../models/commets.js";

export const createCommnet = async (req, res) => {
  const user = req.user;
  try {
    const { itemId, message } = req.body;
    let item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json("Item not found");
    }
    let newComment = new Comment({
      message: message,
    });
    newComment.user = user._id;
    item.comments.push(newComment);
    await newComment.save();
    await item.save();
    res.status(200).json("Comment created successfully");
  } catch (e) {
    console.log(e);
  }
};

export const deleteComment = async (req, res) => {
  const user = req.user;
  try {
    let itemId = req.header("itemId");
    let commentId = req.header("commentId");
    const foundComment = await Comment.findById(commentId);
    if (foundComment.user.toString() !== user._id.toString()) {
      return res
        .status(401)
        .json("You don't have permission to delete this review");
    }
    await Item.findByIdAndUpdate(itemId, { $pull: { comments: commentId } });
    await Comment.findByIdAndDelete(commentId);
    res.status(200).json("review deleted successfully");
  } catch (e) {
    console.log(e);
  }
};
