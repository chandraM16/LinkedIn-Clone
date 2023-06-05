import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./Components/Footer/Footer";
import { Login } from "./Components/Login page/Login";
import { Signup } from "./Components/Signup/Signup";
import { Home } from "./Components/Home/Home";
import ProtectedRoute from "./Components/ProtectedRoute";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="app">
      <Navbar />

      <Routes>
        {/* Default route lead us to login page */}
        <Route path="/" element={<Login />} />

        {/* for Sign Up Gape */}
        <Route path="/signUp" element={<Signup />} />

        {/* For Home page through Protected routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
