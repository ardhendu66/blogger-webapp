import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Home";
import SingleBlog from "./pages/blogs";
import AdminPage from "./pages/admin";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import CustomeError from "./pages/Error";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Homepage /> } errorElement={<CustomeError/>} />
        <Route path="/blog">
          <Route path=":id" element={ <SingleBlog />} errorElement={<CustomeError/>} />
        </Route>
        <Route path="/admin" element={ <AdminPage />} errorElement={<CustomeError/>} />
        <Route path="/auth">
          <Route path="login" element={ <LoginPage />} errorElement={<CustomeError/>} />
          <Route path="register" element={ <RegisterPage />} errorElement={<CustomeError/>} />
          <Route path="*" element={<CustomeError/>} />
        </Route>
        <Route path="/*" element={<CustomeError/>} />
      </Routes>
    </BrowserRouter>
  )
}