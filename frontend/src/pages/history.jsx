import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LogoutIcon from "@mui/icons-material/Logout";
import AppHeader from "../components/layout/AppHeader";
import { ROUTES } from "../config/routes";
import withAuth from "../utils/withAuth";
import "../App.css";

function History() {
  const { getHistoryOfUser, handleLogout } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getHistoryOfUser();
        if (Array.isArray(history)) {
          setMeetings(history);
          return;
        }
        setMeetings([]);
        setError(history?.message || "Unable to fetch meeting history.");
      } catch (fetchError) {
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="pageContainer">
      <AppHeader title="Meeting History" subtitle="Your recent activity">
        <Button startIcon={<HomeIcon />} onClick={() => navigate(ROUTES.HOME)}>
          Dashboard
        </Button>
        <Button
          startIcon={<LogoutIcon />}
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </AppHeader>

      <div className="historyContainer">
        {loading ? (
          <div className="historyState">
            <CircularProgress />
          </div>
        ) : null}

        {error ? <Alert severity="error">{error}</Alert> : null}

        {!loading && !error && meetings.length === 0 ? (
          <div className="historyState">
            <Typography variant="h6">No meetings yet</Typography>
            <Typography color="text.secondary">
              Start a meeting from dashboard and it will appear here.
            </Typography>
          </div>
        ) : null}

        <Stack spacing={2}>
          {meetings.map((meeting) => (
            <Card key={meeting._id} variant="outlined" className="historyCard">
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  {meeting.meetingCode}
                </Typography>
                <Typography sx={{ mb: 2 }} color="text.secondary">
                  Date: {formatDate(meeting.date)}
                </Typography>
                <Button
                  startIcon={<VideoCallIcon />}
                  variant="contained"
                  onClick={() => navigate(`/${meeting.meetingCode}`)}
                >
                  Join Again
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </div>
    </div>
  );
}

export default withAuth(History);
