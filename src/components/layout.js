import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar/navbar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Navbar />
      <main className="ml-[20%] w-[80%] p-6">
        <Outlet />
      </main>
    </div>
  );
}
