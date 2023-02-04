import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import { SecureRoute } from "./components/SecureRoute";
import { UserProvider } from "./context/UserContext";
import { Admin } from "./pages/Admin";

import ClassPage from "./pages/ClassPage";
import Courses from "./pages/Courses";
import Home from "./pages/Home";

export const App = () => {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <Routes>
          <Route path="*" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/class" element={<ClassPage />} />
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
