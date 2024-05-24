import { Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AdvancedSearch from "./pages/AdvancedSearch";
import Navbar from "./components/Navbar";
import Drawer from "./components/Drawer";
import NotFound from "./pages/NotFound";
import Forum from "./pages/Forum";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import Job from "./pages/Job";
import axios from "axios";
import Thread from "./pages/Thread";
axios.defaults.baseURL = 'http://localhost:4123';

function App() {

  return (
    <>

    
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
        <Route path="/Forum/:page" element={<Forum />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Jobs/:page" element={<Jobs />} />
        <Route path="/CreateJob" element={<CreateJob />} />
        <Route path="/Job/:id" element={<Job />} />
        <Route path="/Forum/Thread/:id" element={<Thread />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
