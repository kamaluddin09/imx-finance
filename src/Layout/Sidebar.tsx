import {
  FaTachometerAlt,
  FaUserCheck,
  FaClipboardList,
  FaBell,
  FaDollarSign,
  FaCog,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path: string) =>
    `flex items-center gap-3 text-gray-700 hover:bg-gray-100 p-2 rounded-md cursor-pointer ${
      location.pathname === path ? "bg-gray-200" : ""
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-md flex flex-col justify-between">
      <div>
        <ul className="mt-6 space-y-1 px-4">
          <li>
            <Link to="/" className={linkClasses("/dashboard")}>
              <FaTachometerAlt /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/attendance" className={linkClasses("/attendance")}>
              <FaUserCheck /> Attendance
            </Link>
          </li>
          <li>
            <Link to="/leaves" className={linkClasses("/leaves")}>
              <FaClipboardList /> Leaves
            </Link>
          </li>
          <li>
            <Link to="/notices" className={linkClasses("/notices")}>
              <FaBell /> Notices
            </Link>
          </li>
          <li>
            <Link to="/finance" className={linkClasses("/")}>
              <FaDollarSign /> Finance
            </Link>
          </li>
        </ul>
      </div>
      <div className="mb-4 px-4">
        <Link to="/settings" className={linkClasses("/settings")}>
          <FaCog /> Settings
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
