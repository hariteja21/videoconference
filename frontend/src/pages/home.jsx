import React, { useContext, useMemo, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, Card, CardContent, Chip, Stack, TextField, Typography } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../contexts/AuthContext";
import AppHeader from "../components/layout/AppHeader";
import { ROUTES } from "../config/routes";

const makeMeetingCode = () => Math.random().toString(36).slice(2, 10).toUpperCase();

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [error, setError] = useState("");
  const { addToUserHistory, handleLogout } = useContext(AuthContext);
  const quickTips = useMemo(
    () => [
      "Use a stable network before joining group calls.",
      "Share your screen to present demos in interviews.",
      "Reuse history to quickly reconnect old meeting codes.",
    ],
    []
  );

  const joinMeeting = async (codeInput) => {
    const code = codeInput.trim().toUpperCase();

    if (!code) {
      setError("Enter a valid meeting code.");
      return;
    }

    setError("");
    try {
      await addToUserHistory(code);
    } catch {
      // navigation should still work for availability
    }
    navigate(`/${code}`);
  };

  const handleCreateMeeting = async () => {
    const code = makeMeetingCode();
    setMeetingCode(code);
    await joinMeeting(code);
  };

  return (
    <div className="pageContainer">
      <AppHeader title="ZoomClone Pro" subtitle="Meeting Dashboard">
        <Button
          startIcon={<RestoreIcon />}
          onClick={() => navigate(ROUTES.HISTORY)}
          variant="text"
        >
          History
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          variant="outlined"
          color="inherit"
        >
          Logout
        </Button>
      </AppHeader>

      <main className="meetContainer">
        <section className="leftPanel">
          <p className="sectionLabel">Start a meeting</p>
          <h1>Launch calls in one click</h1>
          <p className="sectionDescription">
            Join with an existing code or create a fresh room and share it instantly.
          </p>

          <div className="meetingForm">
            <TextField
              fullWidth
              label="Meeting code"
              value={meetingCode}
              onChange={(event) => setMeetingCode(event.target.value)}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                startIcon={<VideoCallIcon />}
                variant="contained"
                onClick={() => joinMeeting(meetingCode)}
              >
                Join Meeting
              </Button>
              <Button variant="outlined" onClick={handleCreateMeeting}>
                Create Instant Meeting
              </Button>
            </Stack>
            {error ? <p className="formError">{error}</p> : null}
          </div>

          <div className="tipRow">
            {quickTips.map((tip) => (
              <Chip key={tip} label={tip} />
            ))}
          </div>
        </section>
        <section className="rightPanel">
          <Card className="previewCard" elevation={0}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Live meeting preview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                This project demonstrates WebRTC + Socket.IO + full-stack auth integration.
              </Typography>
              <img src="/logo3.png" alt="Video meeting illustration" />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}

export default withAuth(HomeComponent);
