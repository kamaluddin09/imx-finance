import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Layout/Header";
import Sidebar from "./Layout/Sidebar";

// Pages
import Dashboard from "./Pages/Dashboard";
import Attendance from "./Pages/Attendance";
import Leaves from "./Pages/Leaves";
import Notices from "./Pages/Notices";
import Finance from "./Pages/Finance";
import Settings from "./Pages/Settings";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        {/* Top: Header */}
        <Header />

        {/* Below: Sidebar + Main content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left: Sidebar */}
          <Sidebar />

          {/* Right: Page Content */}
          <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/attendance" element={<Attendance />} />
              <Route path="/leaves" element={<Leaves />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
