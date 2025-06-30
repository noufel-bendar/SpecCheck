import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/images/icon12.png";

const manuel = [
  { id: 1, name: "Home", link: "/home" },
  { id: 2, name: "About us", link: "/#" },
  { id: 3, name: "Shop", link: "/#shop" }
];

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="p-4 h-20 flex items-center justify-between bg-royal bg-opacity-90 shadow-lg fixed top-0 left-0 right-0 z-50">
      <a href="/home">
      <img className="h-20 w-auto inline" src={logo} alt="Logo" />
      </a>
      <span className="text-white text-4xl font-bold">SpecCheck</span>

      <div className="relative group hidden sm:block ml-auto">
        <input className="search" type="text" placeholder="Search" />
        <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-1 text-xl text-royal group-hover:text-pretty duration-300 pl-1" />
      </div>

      <div>
        <ul className="flex items-center">
          {manuel.map((data, index) => (
            <li
              key={index}
              className="inline-block mx-4 text-white hover:text-gray-300 duration-200"
            >
              <a href={data.link} className="font-semibold">
                {data.name}
              </a>
            </li>
          ))}

          <li className="relative inline-block mx-4">
            <button onClick={toggleDropdown}>
              <FaUserCircle className="text-white text-3xl hover:text-gray-300 transition mt-2" />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt- w-48 bg-white rounded-md shadow-lg p-4 z-50">
                <p className="text-sm font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500 mb-2">john@example.com</p>
                <hr className="my-2" />
                <button className="w-full text-left text-red-500 hover:underline text-sm">
                  Logout
                </button>
              </div>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
