import React from "react";
import { NavLink } from "react-router-dom";

const LOGO_URL =
  "https://res.cloudinary.com/dyjrpauvp/image/upload/v1763438525/my-profile/logo-gita-remove-background_zumb4y.png";

const navItems = [
  { label: "QLHV", path: "/student-management" },
  { label: "Học viên chính thức", path: "/official-students" },
  { label: "Học viên trải nghiệm", path: "/trial-students" },
  { label: "Điểm danh giáo viên", path: "/teacher-attendance" },
  { label: "Chấm nghỉ", path: "/leave-tracking" },
  { label: "Điểm học viên", path: "/student-scores" },
];

export default function Navbar() {
  const baseClass =
    "block w-full text-left px-4 py-2 rounded-lg text-sm font-medium";

  return (
    <nav className="fixed left-0 top-0 h-screen w-[20%] bg-sky-100 border-r border-sky-200 flex flex-col">
      <div className="px-6 pt-4 pb-2 flex items-center justify-center">
        <img
          src={LOGO_URL}
          alt="GITA logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      <div className="flex-1 px-4 pt-2 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${baseClass} bg-sky-300 text-slate-900`
                : `${baseClass} text-slate-700 hover:bg-sky-200`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="px-4 pb-5">
        <NavLink
          to="/login"
          className="flex items-center gap-2 text-sm text-slate-700 px-3 py-2 rounded-full hover:bg-sky-200"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-sky-300 text-white">
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 3h7a1 1 0 0 1 1 1v4h-2V5H6v14h5v-3h2v4a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" />
              <path d="M14.293 8.293 15.707 9.707 13.414 12H22v2h-8.586l2.293 2.293-1.414 1.414L10.586 13l3.707-3.707Z" />
            </svg>
          </span>
          <span>Đăng xuất</span>
        </NavLink>
      </div>
    </nav>
  );
}
