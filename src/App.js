import "./App.css";
import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";
import Layouts from "./components/Layouts";
// import  PostList  from "./features/posts/PostList";
import SinglePostPage from "./features/posts/SinglePostPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditPostForm from "./features/posts/EditPostForm";
import UserList from "./features/User/UserList";
import UserPage from "./features/User/UserPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Layouts />
        <Routes>
          {/* <Route path="/*" element={<App />} /> */}
          {/* <Route path="/" element={<Layouts />} /> */}
          <Route index element={<PostList />} />
          <Route path="post">
            <Route index element={<AddPostForm />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path="edit/:postId" element={<EditPostForm />} />
          </Route>
          
          <Route path="user">
            <Route index element={<UserList />} />
            <Route path=":postId" element={<SinglePostPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
