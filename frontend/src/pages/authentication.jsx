import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { Alert, Snackbar, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { AuthContext } from "../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { ROUTES } from "../config/routes";

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [formState, setFormState] = React.useState("signin");
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    setError("");

    if (!username.trim() || !password.trim() || (formState === "signup" && !name.trim())) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      if (formState === "signin") {
        await handleLogin(username.trim(), password.trim());
      } else {
        const result = await handleRegister(name.trim(), username.trim(), password.trim());
        setMessage(result || "Registration successful. Please login.");
        setOpen(true);
        setPassword("");
        setFormState("signin");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Grid container component="main" sx={{ minHeight: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={5}
        md={7}
        sx={{
          background: "linear-gradient(135deg, #0b1220 0%, #102347 50%, #1e3a8a 100%)",
          color: "#f3f4f6",
          p: { sm: 5, md: 8 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="overline" sx={{ letterSpacing: 1.5 }}>
          Resume Project
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 700, maxWidth: 560, mb: 2 }}>
          Build and showcase real-time collaboration experience
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 560, opacity: 0.9 }}>
          Login to create secure meetings, join calls instantly, and maintain user activity history.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={7} md={5} component={Paper} elevation={0} square>
        <Box
          sx={{
            minHeight: "100%",
            px: { xs: 3, sm: 5 },
            py: { xs: 4, sm: 8 },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: 420 }}>
            <Avatar sx={{ mb: 2, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 700 }}>
              {formState === "signin" ? "Welcome back" : "Create your account"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              Access your personal meeting dashboard in seconds.
            </Typography>

            <ToggleButtonGroup
              color="primary"
              value={formState}
              exclusive
              onChange={(_, value) => value && setFormState(value)}
              sx={{ mb: 2 }}
            >
              <ToggleButton value="signin">Sign In</ToggleButton>
              <ToggleButton value="signup">Sign Up</ToggleButton>
            </ToggleButtonGroup>

            {formState === "signup" ? (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            ) : null}

            <TextField
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            {error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : null}

            <Button fullWidth variant="contained" sx={{ mt: 3 }} onClick={handleAuth}>
              {formState === "signin" ? "Login" : "Create account"}
            </Button>

            <Button
              fullWidth
              component={RouterLink}
              to={ROUTES.LANDING}
              sx={{ mt: 1 }}
            >
              Back to landing page
            </Button>
          </Box>
        </Box>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={() => setOpen(false)}
      >
        <Alert severity="success" onClose={() => setOpen(false)} variant="filled">
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
