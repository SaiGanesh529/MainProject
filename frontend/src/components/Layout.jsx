import React from 'react';
import Sidebar from './Sidebar';
import BottomBar from './BottomBar';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();
    // Hide layout on login page if needed, but for now we'll assume we want header/sidebar only on authenticated pages
    // The previous App.jsx had Routes inside, so we'll wrap the protected routes.

    // Simple check to hide sidebar/bottombar on login
    if (location.pathname === '/login' || location.pathname === '/') {
        return <>{children}</>;
    }

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-white">
            {/* Sidebar - Hidden on mobile, fixed on desktop */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 flex justify-center w-full md:ml-[72px] xl:ml-[245px] pb-16 md:pb-0">
                <div className="w-full max-w-[630px] pt-4 min-h-screen">
                    {children}
                </div>
            </main>

            {/* Bottom Bar - Visible only on mobile */}
            <BottomBar />
        </div>
    );
};

export default Layout;
