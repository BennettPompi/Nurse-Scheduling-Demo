import React from 'react';
import { Link } from 'react-router-dom';
import m7Logo from "/Logo-black.png";
import "../App.css";
const NavBar: React.FC = () => {

  return (
    <nav className="bg-gray-800 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <a href="https://m7health.com" target="_blank" rel="noopener noreferrer">
          <img src={m7Logo} className="logo" alt="M7 Health logo" />
        </a>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="nav-link hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/requirements" className="nav-link hover:text-gray-300">
              Requirements
            </Link>
          </li>
          <li>
            <Link to="/roster" className="nav-link hover:text-gray-300">
              Roster
            </Link>
          </li>
          <li>
            <Link to="/schedules" className="nav-link hover:text-gray-300">
              Generate Schedule
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
