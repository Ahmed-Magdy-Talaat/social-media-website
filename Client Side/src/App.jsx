import { Routes, Route } from "react-router-dom";
import "./globals.css";
import SignupForm from "./Components/Forms/SignupForm.jsx";
import SigninForm from "./Components/Forms/SigninForm.jsx";
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
} from "./pages/index.js";
import AuthLayout from "./Components/_auth/AuthLayout.jsx";
import RootLayout from "./Components/_root/RootLayout.jsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <main>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saves />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<EditProfile />} />
        </Route>
      </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
