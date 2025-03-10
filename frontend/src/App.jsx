// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home"; // Import the HomePage component
import ChatPage from "./pages/ChatPage";
import Auth from "./pages/Auth";
const App = () => {
  return (
    <Router>
      {/* Navbar is always visible */}
      <Navbar />

      {/* Define routes */}
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />

        {/* Chat Route */}
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;