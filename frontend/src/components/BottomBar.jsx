import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    GoHome, GoHomeFill
} from "react-icons/go";
import {
    MdOutlineExplore, MdExplore,
    MdOutlineMovie, MdMovie
} from "react-icons/md";
import {
    RiAddBoxLine, RiAddBoxFill,
    RiMessengerLine
} from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const BottomBar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/home', icon: GoHome, activeIcon: GoHomeFill },
        { name: 'Explore', path: '/explore', icon: MdOutlineExplore, activeIcon: MdExplore },
        { name: 'Reels', path: '/reels', icon: MdOutlineMovie, activeIcon: MdMovie },
        { name: 'Create', path: '/create', icon: RiAddBoxLine, activeIcon: RiAddBoxFill },
        { name: 'Profile', path: '/myprofile', icon: CgProfile, activeIcon: CgProfile }, // Replace with Avatar
    ];

    return (
        <div className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-300 z-50 px-4 py-3 flex justify-between items-center">
            {navItems.map((item) => (
                <Link key={item.name} to={item.path} className="flex-1 flex justify-center">
                    {isActive(item.path) ? <item.activeIcon size={26} /> : <item.icon size={26} />}
                </Link>
            ))}
        </div>
    );
};

export default BottomBar;
