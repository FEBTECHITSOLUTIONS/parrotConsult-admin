import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiList,
  FiXCircle,
  FiBookOpen,
  FiDollarSign,
  FiUserCheck,
  FiUsers,
  FiSettings,
  FiBell,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { logout } from "../../api/AdminApis";
import { CgClose } from "react-icons/cg";
import { GrNext } from "react-icons/gr";

const menuItems = [
  { label: "Dashboard", icon: <FiHome />, path: "/dashboard" },
  { label: "Pending Application", icon: <FiList />, path: "/pending-applications" },
  { label: "Rejected Application", icon: <FiXCircle />, path: "/rejected-applications" },
  { label: "All Booking", icon: <FiBookOpen />, path: "/all-booking" },
  { label: "Revenue", icon: <FiDollarSign />, path: "/revenue" },
  { label: "All Consultants", icon: <FiUserCheck />, path: "/all-consultants" },
  { label: "All Users", icon: <FiUsers />, path: "/all-users" },
  { label: "Settings", icon: <FiSettings />, path: "/settings" },
  { label: "Send Notification", icon: <FiBell />, path: "/send-notification" },
];

const NavBar = ({open , handleNavbar , admin}) => {
  
  const location = useLocation();
  const navigate = useNavigate();


  const navHandler = (path) => {
    navigate(path);
   handleNavbar()
  };

  const handleLogout = async () => {
    try {
      const logoutResponse = await logout();
      if (logoutResponse.statusCode === 200) {
        localStorage.clear();
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div
        className={` left-0 top-0 h-screen w-60 bg-gradient-to-br from-slate-900 text-white via-emerald-900 to-teal-900 transition-transform duration-300 z-40 md:relative absolute ${
          open ? "translate-x-0 text-white" : "-translate-x-60 md:translate-x-0"
        } ${admin ? 'block' : 'hidden'}`}
      >
        <div className="flex flex-col h-full px-3 py-5 gap-6">
          <div className="font-bold text-xl mb-8 text-center">Admin Panel</div>
         <div className=" absolute right-4 top-4 md:hidden" onClick={()=>{handleNavbar()}}>
           <CgClose size={24}  />
         </div>
          <ul className="flex-1 flex flex-col gap-3 overflow-y-scroll 2xl:overflow-hidden">
            {menuItems.map((item) => {
              const isSelected = location.pathname === item.path;
              return (
                <li key={item.label}>
                  <button
                    className={`flex items-center gap-4 px-4 py-3 w-[95%] rounded-lg transition ${
                      isSelected
                        ? "bg-white bg-opacity-70 text-black"
                        : "hover:bg-white hover:bg-opacity-10 hover:text-black"
                    }`}
                    onClick={() => navHandler(item.path)}
                    aria-current={isSelected ? "page" : undefined}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="sm:inline text-sm">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="flex items-center gap-3 px-4 py-3 mt-auto w-full rounded-lg bg-black text-white hover:bg-white hover:text-black transition cursor-pointer"
            onClick={handleLogout}
          >
            <FiLogOut size={20} />
            <span className="sm:inline">Logout</span>
          </button>
        </div>
      </div>
   
  );
};

export default NavBar;
