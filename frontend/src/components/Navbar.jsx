import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for localStorage changes (User Login/Logout)
    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/auth"); // Redirect to login page
  };

  const handleChatClick = (e) => {
    if (!username) {
      e.preventDefault(); // Prevent default link behavior
      navigate("/auth"); // Redirect to login page
    }
  };

  return (
    <nav className="navbar bg-base-100 fixed w-full shadow-lg z-50">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          CodeGenie
        </Link>
      </div>
      <div className="navbar-center hidden font-bold lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/chat" onClick={handleChatClick}>
              Chat
            </Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end flex items-center">
        {username ? (
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">👤 {username}</span>
            <button
              onClick={handleLogout}
              className="btn btn-sm btn-error text-white"
            >
              Logout
            </button>
          </div>
        ) : (
          <button className="btn btn-sm">
            <Link to="/auth">Login</Link>
          </button>
        )}
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;
