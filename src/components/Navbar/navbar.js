import React from "react";
import { NavLink } from "react-router-dom";

const LOGO_URL =
  "https://res.cloudinary.com/dyjrpauvp/image/upload/v1763438525/my-profile/logo-gita-remove-background_zumb4y.png";

const navItems = [
  { label: "Trang chủ", path: "/" },
  { label: "QLHV", path: "/student-management" },
  { label: "Kết quả học tập", path: "/feedback" },
  { label: "Học sinh trải nghiệm", path: "/trial-management" },
  { label: "Điểm danh giáo viên", path: "/teacher-attendance" },
  { label: "Chấm nghỉ", path: "/leave-tracking" },
  { label: "Điểm học viên", path: "/student-scores" },
  { label: "Cài đặt", path: "/setting" },
];

const navIcons = {
  "/": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10.5Z" />
    </svg>
  ),
  "/student-management": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4Z" />
    </svg>
  ),
  "/feedback": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3h16a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H7l-5 3V5a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  "/trial-management": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2 1 7l11 5 9-4.09V17h2V7L12 2Z" />
    </svg>
  ),
  "/teacher-attendance": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 4h18v2H3Zm0 6h18v2H3Zm0 6h18v2H3Z" />
    </svg>
  ),
  "/leave-tracking": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
    </svg>
  ),
  "/student-scores": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h18v2H3Zm2 4h14v14H5Z" />
    </svg>
  ),
  "/setting": (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14 12.94a7.49 7.49 0 0 0 .05-.94 7.49 7.49 0 0 0-.05-.94l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.13 7.13 0 0 0-1.63-.94l-.36-2.54a.5.5 0 0 0-.5-.42h-3.84a.5.5 0 0 0-.5.42l-.36 2.54a7.13 7.13 0 0 0-1.63.94l-2.39-.96a.5.5 0 0 0-.6.22L2.71 8.84a.5.5 0 0 0 .12.64l2.03 1.58a7.49 7.49 0 0 0-.05.94c0 .32.02.63.05.94L2.83 14.52a.5.5 0 0 0-.12.64l1.92 3.32a.5.5 0 0 0 .6.22l2.39-.96c.5.38 1.05.7 1.63.94l.36 2.54a.5.5 0 0 0 .5.42h3.84a.5.5 0 0 0 .5-.42l.36-2.54c.58-.24 1.13-.56 1.63-.94l2.39.96a.5.5 0 0 0 .6-.22l1.92-3.32a.5.5 0 0 0-.12-.64ZM12 15.5A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5Z" />
    </svg>
  ),
};

export default function Navbar() {
  const baseClass = "block w-full px-4 py-2 rounded-lg text-sm font-medium";

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
                ? `${baseClass} bg-sky-300 text-slate-900 flex items-center gap-2`
                : `${baseClass} text-slate-700 hover:bg-sky-200 flex items-center gap-2`
            }
          >
            <span className="text-slate-600">{navIcons[item.path]}</span>
            <span>{item.label}</span>
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
