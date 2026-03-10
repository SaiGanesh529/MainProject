import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  GoHome, GoHomeFill, 
  GoSearch,
  GoHeart, GoHeartFill 
} from "react-icons/go";
import { 
  MdOutlineExplore, MdExplore,
  MdOutlineMovie, MdMovie 
} from "react-icons/md";
import { 
  RiMessengerLine, RiMessengerFill,
  RiAddBoxLine, RiAddBoxFill 
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from '../logo.png'; // Make sure this path is correct or use a text logo

const Sidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const sidebarItems = [
    { name: 'Home', path: '/home', icon: GoHome, activeIcon: GoHomeFill },
    { name: 'Search', path: '/search', icon: GoSearch, activeIcon: GoSearch }, // Search usually opens a drawer, simplified here
    { name: 'Explore', path: '/explore', icon: MdOutlineExplore, activeIcon: MdExplore },
    { name: 'Reels', path: '/reels', icon: MdOutlineMovie, activeIcon: MdMovie },
    { name: 'Messages', path: '/messages', icon: RiMessengerLine, activeIcon: RiMessengerFill },
    { name: 'Notifications', path: '/notifications', icon: GoHeart, activeIcon: GoHeartFill },
    { name: 'Create', path: '/create', icon: RiAddBoxLine, activeIcon: RiAddBoxFill },
    { name: 'Profile', path: '/myprofile', icon: CgProfile, activeIcon: CgProfile }, // Ideally use user avatar
  ];

  return (
    <div className="hidden md:flex flex-col w-[245px] h-screen border-r border-gray-300 fixed left-0 top-0 bg-white px-3 pb-5 z-50">
      {/* Logo Area */}
      <div className="h-24 flex items-center px-3 mb-2">
        <img src={logo} alt="Instagram" className="w-8 h-auto block xl:hidden" />
        {/* Text Logo for larger screens if you had one, using standard text for now or keep generic */}
         <Link to="/home" className="hidden xl:block text-2xl font-bold italic tracking-wider mt-2 hover:opacity-70 transition-opacity">
          Insta Share
        </Link>
        <div className="xl:hidden">
             {/* Small logo icon only */}
        </div>
      </div>

      {/* Nav Items */}
      <div className="flex-1 flex flex-col gap-2">
        {sidebarItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group ${isActive(item.path) ? 'font-bold' : 'font-normal'}`}
          >
            <div className="group-hover:scale-105 transition-transform">
              {isActive(item.path) ? <item.activeIcon size={28} /> : <item.icon size={28} />}
            </div>
            <span className="text-base hidden xl:block">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* More Options */}
      <div className="mt-auto">
        <button className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 w-full text-left">
          <RxHamburgerMenu size={28} />
          <span className="text-base hidden xl:block font-normal">More</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
