import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/icon12.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE } from "../utils/config";

const manuel = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "About us", link: "/footer" },
  { id: 3, name: "Shop", link: "/" },
];

function Header({ onSearch, onAboutClick, onShopClick }) {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${API_BASE}/api/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          setUser(null);
        });
    }
  }, []);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  const handleLoginRedirect = () => {
    setShowDropdown(false);
    navigate("/login");
  };

  return (
    <header className="p-4 h-20 flex items-center justify-between bg-royal bg-opacity-90 shadow-lg fixed top-0 left-0 right-0 z-50">
      <a href="/home">
        <img className="h-20 w-auto inline" src={logo} alt="Logo" />
      </a>
      <a href="/home">
        <span className="text-white text-4xl font-bold">SpecCheck</span>
      </a>

      <div className="relative group hidden sm:block ml-auto">
        <input
          className="search"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleSearchChange}
        />
        <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-1 text-xl text-royal group-hover:text-pretty duration-300 pl-1" />
      </div>

      <div>
        <ul className="flex items-center">
          {manuel.map((data, index) => (
            <li
              key={index}
              className="inline-block mx-4 text-white hover:text-gray-300 duration-200"
            >
              {data.name === "About us" ? (
                <button onClick={onAboutClick} className="font-semibold">
                  {data.name}
                </button>
              ) : data.name === "Shop" ? (
                <button onClick={onShopClick} className="font-semibold">
                  {data.name}
                </button>
              ) : (
                <a href={data.link} className="font-semibold">
                  {data.name}
                </a>
              )}
            </li>
          ))}

          <li className="relative inline-block mx-4">
            <button onClick={toggleDropdown}>
              <FaUserCircle className="text-white text-3xl hover:text-gray-300 transition mt-2" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg p-4 z-50">
                {user ? (
                  <>
                    <p className="text-sm font-semibold text-gray-800">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-xs text-gray-500 mb-2">{user.email}</p>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-500 hover:underline text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Not logged in</p>
                    <button
                      onClick={handleLoginRedirect}
                      className="w-full text-left text-blue-600 hover:underline text-sm"
                    >
                      Go to Login
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
