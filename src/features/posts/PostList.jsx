import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostError,
  getPostStatus,
  // fetchPosts,
} from "./postSlice";
import PostsListLogic from "./PostsListLogic";

const PostList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  // const posts = useSelector((state) => state.posts);
  // ordered post
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostError);

  // useEffect(() => {
  //   if (postStatus === 'idle') {
  //     dispatch(fetchPosts());
  //   }
  // }, [postStatus, dispatch]);
  // Do Need This ,We have loaded in index.js

  let content;

  if (postStatus === "loading") {
    content = <p> "Loading..."</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    // console.log("orderedPosts:", orderedPosts);
    content = orderedPosts.map((post) => (
      <PostsListLogic key={post.id} post={post} />
    ));

    // content = orderedPosts.map(post =><PostsListLogic key={post.id} post={post} />);
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }
  return (
    <section>
      <h2>Staff List </h2>
      {content}
    </section>
  );
};

export default PostList;
