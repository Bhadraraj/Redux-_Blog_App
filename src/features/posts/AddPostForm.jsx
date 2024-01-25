import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { postAdded } from "./postSlice";
import { selectAllUsers } from "../User/usersSlice";
const AddPostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [staff, setStaff] = useState("");
  const [userId, setUserId] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onstaffChanged = (e) => setStaff(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const users = useSelector(selectAllUsers);
  const onSavePostClicked = () => {
    if (title && staff) {
      // Before adding nanoid in slice
      //   dispatch(postAdded({ id: nanoid(), title, staff }));
      // after adding nanoid in slice
      dispatch(postAdded(title, staff, userId));
    }
  };

  const canSave = Boolean(title) && Boolean(staff) && Boolean(userId);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add Staff</h2>
      <form action="">
        <label htmlFor="postTitle">Role</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />

        <label htmlFor="postAuthor">Author:</label>

        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          {userOptions}
        </select>

        <label htmlFor="staff">staff :</label>
        <input
          type="text"
          id="poststaff"
          name="poststaff"
          value={staff}
          onChange={onstaffChanged}
        />
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Staff    
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
