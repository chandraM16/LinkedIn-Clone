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
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<Signup />} />
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
