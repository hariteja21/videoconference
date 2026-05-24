import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/VideoMeet";
import HomeComponent from "./pages/home";
import History from "./pages/history";
import { ROUTES } from "./config/routes";

function App() {
  return (
    <div className="App">

      <Router>

        <AuthProvider>


          <Routes>
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            <Route path={ROUTES.AUTH} element={<Authentication />} />
            <Route path={ROUTES.HOME} element={<HomeComponent />} />
            <Route path={ROUTES.HISTORY} element={<History />} />
            <Route path="/:url" element={<VideoMeetComponent />} />
            <Route path="*" element={<LandingPage />} />
          </Routes>
        </AuthProvider>

      </Router>
    </div>
  );
}

export default App;
