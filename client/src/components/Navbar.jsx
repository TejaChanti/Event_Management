import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar({ search, setSearch }) {
  const { user, logout } = useContext(AuthContext);

  const activeClass =
    "border-b-2 border-green-600 text-green-600 pb-1";

  const normalClass =
    "text-gray-700 hover:text-green-600 pb-1";

  return (
    <nav className="bg-[#f6f0c8] shadow px-6 py-4 flex justify-between items-center">
      
      <div>
      <NavLink to="/" className="text-xl font-bold text-green-600">
        Bellcorp Events
      </NavLink>
      </div>

      <div className="flex-1 mx-8">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-transparent border-green-600 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        />
      </div>

      <div className="flex items-center space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? activeClass : normalClass
          }
        >
          Events
        </NavLink>

        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? activeClass : normalClass
            }
          >
            Dashboard
          </NavLink>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Login
            </NavLink>

            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive ? activeClass : normalClass
              }
            >
              Register
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
}
