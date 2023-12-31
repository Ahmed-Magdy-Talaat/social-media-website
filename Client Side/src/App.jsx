import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthLayout from "./Components/_auth/AuthLayout.jsx";
import RootLayout from "./Components/_root/RootLayout.jsx";
import {
  Home,
  AllUsers,
  Explore,
  CreatePost,
  EditPost,
  EditProfile,
  Saves,
  PostDetails,
  Profile,
  SignupForm,
  SigninForm,
} from "./pages/index.js";

function App() {
  return (
    <main>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RootLayout>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="saved" element={<Saves />} />
                <Route path="all-users" element={<AllUsers />} />
                <Route path="create-post" element={<CreatePost />} />
                <Route path="update-post/:id" element={<EditPost />} />
                <Route path="posts/:id" element={<PostDetails />} />
                <Route path="profile/:id/*" element={<Profile />} />
                <Route path="update-profile/:id" element={<EditProfile />} />
              </RootLayout>
            }
          />
          <Route
            path="sign-in"
            element={
              <AuthLayout>
                <Route index element={<SigninForm />} />
              </AuthLayout>
            }
          />
          <Route
            path="sign-up"
            element={
              <AuthLayout>
                <Route index element={<SignupForm />} />
              </AuthLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
