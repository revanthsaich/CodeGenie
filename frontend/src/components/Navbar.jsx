import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ThemeToggler from "./ThemeToggler"; // Import the ThemeToggler

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
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
            <Link to="/chat">Chat</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {/* Theme Toggler */}
        <ThemeToggler theme={theme} toggleTheme={toggleTheme} />
      </div>
    </nav>
  );
};

export default Navbar;