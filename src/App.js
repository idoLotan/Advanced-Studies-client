import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import { Login } from "./pages/Login";
import { SecureRoute } from "./components/SecureRoute";
import { SignUp } from "./pages/SignUp";
import { UserProvider } from "./context/UserContext";
import { Admin } from "./pages/Admin";
import CoursePage from "./pages/CoursePage";
import CoursesPage from "./pages/CoursesPage";
import Home from "./pages/Home";

export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/class" element={<CoursePage />} />
          <Route
            path="/admin"
            element={
              <SecureRoute>
                <Admin />
              </SecureRoute>
            }
          />
          <Route path="/profile" />
        </Routes>
      </UserProvider>
    </div>
  );
};
