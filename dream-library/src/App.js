import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Tabs,
  Tab,
  Paper,
  CircularProgress
} from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate
} from "react-router-dom";
import DreamDashboard from "./components/DreamDashboard";
import DreamForm from "./components/DreamForm";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";

function App() {
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    console.log("User registered successfully");
  };

  const handleLogin = (token, userId) => {
    setToken(token);
    setUserId(userId);
    console.log("User logged in successfully");
  };

  const handleDreamAdded = () => {
    setActiveTab(0); // Switch to dashboard view
  };

  const handleLogout = () => {
    setToken(null);
    setUserId(null);
    setActiveTab(0);
  };

  return (
    <Router>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Dream Library
            </Typography>
            {token ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Container sx={{ flex: 1, py: 4 }}>
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <CircularProgress />
            </Box>
          ) : (
            <Routes>
              <Route
                path="/login"
                element={
                  token ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <LoginForm onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/register"
                element={
                  token ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <RegisterForm onRegister={handleRegister} />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  !token ? (
                    <Navigate to="/login" />
                  ) : (
                    <Paper sx={{ p: 2 }}>
                      <Tabs
                        value={activeTab}
                        onChange={(e, val) => setActiveTab(val)}
                        sx={{ mb: 3 }}
                      >
                        <Tab label="Dream Board" />
                        <Tab label="Add Dream" />
                      </Tabs>

                      {activeTab === 0 ? (
                        <DreamDashboard userId={userId} />
                      ) : (
                        <DreamForm
                          userId={userId}
                          onDreamAdded={handleDreamAdded}
                        />
                      )}
                    </Paper>
                  )
                }
              />
              <Route
                path="/"
                element={
                  token ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <Box
                      sx={{
                        textAlign: "center",
                        mt: 8,
                        p: 4,
                        bgcolor: "background.paper",
                        borderRadius: 1
                      }}
                    >
                      <Typography variant="h4" gutterBottom>
                        Welcome to Dream Library
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 4 }}>
                        Track and explore your dreams
                      </Typography>
                      <Box>
                        <Button
                          component={Link}
                          to="/login"
                          variant="contained"
                          sx={{ mr: 2 }}
                        >
                          Login
                        </Button>
                        <Button
                          component={Link}
                          to="/register"
                          variant="outlined"
                        >
                          Register
                        </Button>
                      </Box>
                    </Box>
                  )
                }
              />
            </Routes>
          )}
        </Container>
      </Box>
    </Router>
  );
}

export default App;
