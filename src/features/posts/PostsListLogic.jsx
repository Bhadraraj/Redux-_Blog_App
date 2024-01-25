import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { Link } from "react-router-dom";
const PostsListLogic = ({ post }) => {
  // console.log(post);

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 75)}...</p>
      <p>
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  );
};

export default PostsListLogic;
