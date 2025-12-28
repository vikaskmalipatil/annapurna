import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg flex items-center gap-2 ${
      isActive
        ? "text-white bg-emerald-800/50 shadow-sm"
        : "text-emerald-100/90 hover:text-white hover:bg-emerald-800/30"
    }`;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white shadow-lg border-b border-emerald-700/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between py-3.5">
          
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-white to-emerald-50 text-emerald-900 font-black px-3 py-1.5 rounded-lg text-xs shadow-md">
              A-PDS
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
              Annapurna
            </span>
          </div>

          {/* Desktop Navigation (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-2">
            <NavLink to="/dashboard" className={linkClass}>
              <DashboardIcon /> Dashboard
            </NavLink>
            <NavLink to="/transactions" className={linkClass}>
              <TransactionIcon /> Transactions
            </NavLink>
            <NavLink to="/complaints" className={linkClass}>
              <ComplaintIcon /> Complaints
            </NavLink>
            <NavLink to="/qrverify" className={linkClass}>
              <QRIcon /> QR Verify
            </NavLink>
            <NavLink to="/face-capture" className={linkClass}>
              <FaceIcon /> Face Capture
            </NavLink>
          </div>

          {/* Desktop Right Section (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-3 bg-emerald-950/40 px-4 py-1.5 rounded-full border border-emerald-700/50">
            <NavLink to="/user-login" className={linkClass}>
              <UserIcon /> User Login
            </NavLink>
            <div className="h-5 w-[1px] bg-emerald-700/50"></div>
            <NavLink to="/adminlogin" className="bg-white text-emerald-900 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-emerald-50 transition-colors">
              Admin
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button onClick={toggleMenu} className="text-emerald-100 hover:text-white focus:outline-none">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[500px] pb-4" : "max-h-0"}`}>
          <div className="flex flex-col gap-2 border-t border-emerald-700/50 pt-4">
            <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
              <DashboardIcon /> Dashboard
            </NavLink>
            <NavLink to="/transactions" className={linkClass} onClick={() => setIsOpen(false)}>
              <TransactionIcon /> Transactions
            </NavLink>
            <NavLink to="/complaints" className={linkClass} onClick={() => setIsOpen(false)}>
              <ComplaintIcon /> Complaints
            </NavLink>
            <NavLink to="/qrverify" className={linkClass} onClick={() => setIsOpen(false)}>
              <QRIcon /> QR Verify
            </NavLink>
            <NavLink to="/face-capture" className={linkClass} onClick={() => setIsOpen(false)}>
              <FaceIcon /> Face Capture
            </NavLink>
            <hr className="border-emerald-700/50 my-2" />
            <NavLink to="/user-login" className={linkClass} onClick={() => setIsOpen(false)}>
              <UserIcon /> User Login
            </NavLink>
            <NavLink to="/adminlogin" className="bg-white text-emerald-900 text-center py-2.5 rounded-lg font-bold" onClick={() => setIsOpen(false)}>
              Admin Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* Icon Components to keep code clean */
const DashboardIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const TransactionIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>;
const ComplaintIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const QRIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>;
const FaceIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const UserIcon = () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;