import React from "react";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";
import { selectPostById } from "./postSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state) => selectPostById(state, Number(postId)));

  if (!post) {
    return (
      <section>
        <h2>Post Not Found</h2>
      </section>
    )
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </p>
    </article>
  );
};

export default SinglePostPage;
