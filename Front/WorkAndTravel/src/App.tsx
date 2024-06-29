import { Router, Route, Routes, Link } from "react-router-dom";
import NotFound from "./pages/NotFound";
import Forum from "./pages/Forum";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import CreateJob from "./pages/CreateJob";
import JobPage from "./pages/Job";
import axios from "axios";
import Thread from "./pages/Thread";
import CreateThread from "./pages/CreateThread";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import ProfileOther from "./pages/ProfileOther";
import { AppProvider } from "./components/AppContext";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
axios.defaults.baseURL = 'http://localhost:4123';
import { useAppContext } from './components/AppContext';
import MainPage from "./pages/MainPage";
function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <AppProvider>
          <ResponsiveDrawer>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/Forum/:page" element={<Forum />} />
              <Route path="/Register" element={<Register />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/Profile/:id" element={<ProfileOther />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Jobs/:page" element={<Jobs />} />
              <Route path="/CreateJob" element={<CreateJob />} />
              <Route path="/CreateThread" element={<CreateThread />} />
              <Route path="/Job/:id" element={<JobPage />} />
              <Route path="/Forum/Thread/:id" element={<Thread />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ResponsiveDrawer >
        </AppProvider>
      </LocalizationProvider>
    </>
  );
}

export default App;
