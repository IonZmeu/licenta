import { Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdvancedSearch from "./pages/AdvancedSearch";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";
import Forum from "./pages/Forum";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
        <Route path="/Forum" element={<Forum />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Jobs" element={<Jobs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
