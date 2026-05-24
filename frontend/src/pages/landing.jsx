import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { ROUTES } from "../config/routes";

const createMeetingCode = () => {
  return Math.random().toString(36).slice(2, 10).toUpperCase();
};

export default function LandingPage() {
  const navigate = useNavigate();
  const [quickCode, setQuickCode] = useState("");
  const hasToken = Boolean(localStorage.getItem("token"));

  const handleQuickJoin = () => {
    const code = quickCode.trim().toUpperCase() || createMeetingCode();
    navigate(`/${code}`);
  };

  return (
    <div className="landingPageContainer">
      <nav>
        <div className="navHeader">
          <h2>ZoomClone Pro</h2>
        </div>
        <div className="navlist">
          <Button
            variant="text"
            onClick={() => navigate(hasToken ? ROUTES.HOME : ROUTES.AUTH)}
          >
            {hasToken ? "Dashboard" : "Login"}
          </Button>
          <Button variant="outlined" onClick={() => navigate(ROUTES.AUTH)}>
            Register
          </Button>
        </div>
      </nav>

      <div className="landingMainContainer">
        <div className="landingContent">
          <p className="landingTag">Real-time collaboration app</p>
          <h1>
            Interview-ready <span>video meetings</span> with chat and call history
          </h1>
          <p>
            Launch meetings instantly, invite guests with a code, and keep your
            sessions organized with secure login and activity tracking.
          </p>
          <div className="landingActions">
            <Button
              size="large"
              variant="contained"
              onClick={() => navigate(hasToken ? ROUTES.HOME : ROUTES.AUTH)}
            >
              {hasToken ? "Open Dashboard" : "Get Started"}
            </Button>
            <Button
              size="large"
              variant="outlined"
              onClick={() => navigate(`/${createMeetingCode()}`)}
            >
              Join as Guest
            </Button>
          </div>
          <div className="quickJoin">
            <TextField
              size="small"
              fullWidth
              label="Meeting code (optional)"
              value={quickCode}
              onChange={(event) => setQuickCode(event.target.value)}
            />
            <Button variant="contained" onClick={handleQuickJoin}>
              Join
            </Button>
          </div>
        </div>
        <div className="landingVisual">
          <img src="/mobile.png" alt="Video call preview" />
        </div>
      </div>
    </div>
  );
}
