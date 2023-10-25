import Overview from "./pages/Overview";
import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import ToggleColorModeButton from "./components/ToggleColorModeButton";

function App() {
  return (
    <Router>
      <Box minHeight="100vh">
        <ToggleColorModeButton />
        <Routes>
          <Route path="/freelanceHelper" element={<Overview />} />{" "}
          {/* Overview Page */}
          <Route path="/login" element={<Login />} /> {/* Login Page */}
          <Route path="/signup" element={<Signup />} /> {/* Signup Page*/}
          <Route path="*" element={<NotFound />} /> {/* Route 404 */}
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Dashboard Page */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;