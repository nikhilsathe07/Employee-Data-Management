import React, { useState, useEffect, useRef } from "react";
import "./Navbar.css";

const Navbar = ({ onSearch, onFilter, onAddEmployeeModalOpen, positions }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const menuRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950 ) {
        setIsMenuOpen(false);
      }
    };
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen && window.innerWidth <= 950) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const handleFilter = (e) => {
    onFilter(e.target.value);
  };

  const handleAddEmployee = () => {
    onAddEmployeeModalOpen();
    if (window.innerWidth <= 950) {
      closeMenu();
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container" ref={menuRef}>
        <div className="navbar-header">
          <h1 className="navbar-title">Employee Management System</h1>
          <button
            className={`hamburger ${isMenuOpen ? "active" : ""}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
        <div className={`navbar-actions ${isMenuOpen ? "open" : ""}`}>
          <input
            type="text"
            className="navbar-search"
            placeholder="Search by name..."
            value={searchValue}
            onChange={handleSearch}
          />
          <select
            className="navbar-filter"
            onChange={handleFilter}
            defaultValue=""
          >
            <option value="">All Positions</option>
            {positions.map((pos) => (
              <option key={pos} value={pos}>
                {pos}
              </option>
            ))}
          </select>
          <button className="btn1 btn-primary1" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </div>
      </div>
      {isMenuOpen && window.innerWidth <= 950 && (
        <div className="navbar-overlay" onClick={closeMenu} />
      )}
    </nav>
  );
};

export default Navbar;
