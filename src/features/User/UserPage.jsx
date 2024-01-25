import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { selectUserById } from "./usersSlice";
import { selectAllPosts } from "../posts/postSlice";

const UserPage = () => {
  const { usersIds } = useParams();
  const user = useSelector((state) => selectUserById());

  const postsForUsers = useSelector(state=>{
    const allPosts=selectAllPosts(state)
    return allPosts.filter(post=>post.usersId===Number(usersIds));

  })
  const postTitles=postsForUsers.map(post=>{
    <li key={post.id}>
        <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  })
  return <div>
    <h2>{user?.name}</h2>
    <ol>
        {postTitles}
    </ol>
  </div>;
};

export default UserPage;
