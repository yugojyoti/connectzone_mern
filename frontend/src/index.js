import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import AddPostPage from "./pages/AddPostPage";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./component/ProtectedRoute";
import AllUsers from "./pages/AllUsers";
import EditProfile from "./pages/EditProfile";
import EditPost from "./pages/EditPost";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} index={true} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/addpost" element={<AddPostPage />} />
        <Route path="/alluser" element={<AllUsers />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/editpost/:postId" element={<EditPost />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
