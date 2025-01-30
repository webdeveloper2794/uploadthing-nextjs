import mongoose, { model, Schema } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    images: [
      {
        url: {
          type: String,
        },
        key: {
          type: String,
        },
        name: {
          type: String,
        },
      },
    ],
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Posts = mongoose.models?.Posts || model("Posts", PostsSchema);
export default Posts;
