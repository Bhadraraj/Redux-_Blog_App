
import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from "@reduxjs/toolkit";
  import { sub } from "date-fns";
  import axios from "axios";
  const POST_URL = "https://jsonplaceholder.typicode.com/posts";
  
  const postsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.date.localeCompare(a.date),
  });
  
  const initialState = {
    posts: [],
    status: "idle", //idle|loading|succeeded | failed
    error: null,
  };
  export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const response = await axios.get(POST_URL);
    // console.log(response.data)
    return response.data;
  });
  export const addNewPost = createAsyncThunk(
    "posts/addNewPosts",
    async (initialPost) => {
      const response = await axios.get(POST_URL, initialPost);
      // console.log(response.data)
      return response.data;
    }
  );
  export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async (initialPost) => {
      const { id } = initialPost;
      // try-catch block only for development/testing with fake API
      // otherwise, remove try-catch and add updatePost.rejected case
      try {
        const response = await axios.put(`${POST_URL}/${id}`, initialPost);
        return response.data;
      } catch (err) {
        //return err.message;
        return initialPost; // only for testing Redux!
      }
    }
  );
  export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async (initialPost) => {
      const { id } = initialPost;
  
      const response = await axios.delete(`${POST_URL}/${id}`);
      if (response?.status === 200) return initialPost;
      return `${response?.status}: ${response?.statusText}`;
    }
  );
  
  // const initialState = [
  //   {
  //     id: "1",
  //     title: "UI UX Designing",
  //     staff: "Regu Kumar",
  //     date: sub(new Date(), { minutes: 10 }).toISOString(),
  //     reactions: {
  //       thumpsUp: 0,
  //       wow: 0,
  //       heart: 0,
  //       rocket: 0,
  //       coffee: 0,
  //     },
  //   },
  //   {
  //     id: "2",
  //     title: "Front End Developement",
  //     staff: "Bhadri",
  //     date: sub(new Date(), { minutes: 10 }).toISOString(),
  //     reactions: {
  //       thumpsUp: 0,
  //       wow: 0,
  //       heart: 0,
  //       rocket: 0,
  //       coffee: 0,
  //     },
  //   },
  // ];
  // create slice get the copy of  old data and add it to upcomming data
  const postSlice = createSlice({
    name: "Posts",
    initialState,
  
    // reducers:{
    //     postAdded(state,action){
    //         state.push(action.payload);
  
    //     }
  
    // }
  
    // after adding nanoid here
    reducers: {
      postAdded: {
        reducer(state, action) {
          // state.push(action.payload);
          // add new post array
          state.posts.push(action.payload);
        },
        // by using prepare callback fns we can manage the data structure internally
        // prepare pass the payload to the reducer
        prepare(title, body, userId) {
          return {
            payload: {
              // id: nanoid(),
              title,
              body,
              date: new Date().toISOString(),
              userId,
              // Make initial reaction as zero
              reactions: {
                thumpsUp: 0,
                wow: 0,
                heart: 0,
                rocket: 0,
                coffee: 0,
              },
            },
          };
        },
      },
  
      reactionAdded(state, action) {
        const { postId, reaction } = action.payload;
        // const existingPost=state.find(post=>post.id===postId)
        const existingPost = state.posts.find((post) => post.id === postId);
        if (existingPost) {
          existingPost.reactions[reaction]++;
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = "succeeded";
          // Adding date and Reactions
          let min = 1;
          const loadedPosts = action.payload.map((post) => {
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
            post.reactions = {
              thumpsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
            return post;
          });
          //Add any Fetched posts to the Array
          // state.posts=state.posts.concat(loadedPosts)
          // state.posts = state.posts.concat(loadedPosts);
          state.posts = state.posts.concat(
            loadedPosts.filter(
              (newPost) =>
                !state.posts.some(
                  (existingPost) => existingPost.id === newPost.id
                )
            )
          );
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = "Failed";
          state.error = action.error.message;
        })
        .addCase(addNewPost.fulfilled, (state, action) => {
          const sortedPosts = state.posts.sort((a, b) => {
            if (a.id > b.id) return 1;
            if (a.id < b.id) return -1;
            return 0;
          });
          action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1;
          // End fix for fake API post IDs
          action.payload.userId = Number(action.payload.userId);
          action.payload.date = new Date().toISOString();
          action.payload.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          console.log(action.payload);
          postsAdapter.addOne(state, action.payload);
        })
        .addCase(updatePost.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            console.log("Update could not complete");
            console.log(action.payload);
            return;
          }
          action.payload.date = new Date().toISOString();
          postsAdapter.upsertOne(state, action.payload);
        })
        .addCase(deletePost.fulfilled, (state, action) => {
          if (!action.payload?.id) {
            console.log("Delete could not complete");
            console.log(action.payload);
            return;
          }
          const { id } = action.payload;
          postsAdapter.removeOne(state, id);
        });
    },                  
  });
  
  // export const selectAllPosts = (state) => state.posts;
  export const selectAllPosts = (state) => state.posts.posts;
  export const getPostStatus = (state) => state.posts.status;
  export const getPostError = (state) => state.posts.error;
  export const selectPostById = (state,postId) =>
  state.posts.posts.find(post => post.id === postId)
  export const { postAdded, reactionAdded } = postSlice.actions;
  export default postSlice.reducer;