// import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthProvider";
import RequireAuth from "./components/RequiredAuth";
import Layout from "./Layout/Layout";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import UpdateProfile from "./pages/UpdateProfile";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route element={<Layout />}>
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/gallery"
              element={
                <RequireAuth>
                  <Gallery />
                </RequireAuth>
              }
            />
            <Route
              path="/posts"
              element={
                <RequireAuth>
                  <Posts />
                </RequireAuth>
              }
            />
            <Route
              path="/todos"
              element={
                <RequireAuth>
                  <Todo />
                </RequireAuth>
              }
            />
            <Route
              path="/edit"
              element={
                <RequireAuth>
                  <UpdateProfile />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<h1>404 not found</h1>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
