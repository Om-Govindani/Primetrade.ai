import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdSearch, MdFilterList } from "react-icons/md";
import SearchBar from "./SearchBar";
import ProfileInfo from "./cards/ProfileInfo";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  const onLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleSearch = () => {
    if (searchQuery) onSearchNote(searchQuery);
    else handleClearSearch();
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  const toggleSearchBar = () => {
    setShowSearchBar(true);
  };

  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setShowSearchBar(false);
      setShowFilterMenu(false);
    }
  };

  const handleFilterSelect = (order) => {
    onFilterChange(order);
    setShowFilterMenu(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navbarRef}
      className="bg-white h-16 flex items-center justify-between px-4 py-2 drop-shadow relative"
    >
      {!showSearchBar && (
        <h2 className="site-name flex flex-row items-center text-lg sm:text-xl font-medium text-black py-2 gap-x-1">
          <img
            width="40"
            height="40"
            src="https://img.icons8.com/clouds/200/apple-notes.png"
            alt="apple-notes"
          />{" "}
          Notes
        </h2>
      )}

      {showSearchBar ? (
        <div className="absolute left-0 right-0 mx-auto flex justify-center items-center gap-2 w-[90%] sm:w-[60%]">
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => {
              setSearchQuery(target.value);
              handleSearch();
            }}
            onClearSearch={onClearSearch}
            handleSearch={handleSearch}
          />
          {/* Filter button */}
          <div className="relative">
            <MdFilterList
              className="text-2xl text-gray-600 cursor-pointer hover:text-primary"
              onClick={toggleFilterMenu}
            />
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleFilterSelect("new-old")}
                >
                  New → Old
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => handleFilterSelect("old-new")}
                >
                  Old → New
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          {userInfo && <MdSearch className="text-xl cursor-pointer" onClick={toggleSearchBar} />}
          {userInfo && <ProfileInfo userInfo={userInfo} onLogout={onLogout} />}
        </div>
      )}
    </div>
  );
};

export default Navbar;
