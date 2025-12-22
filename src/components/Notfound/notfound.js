import { Link } from "react-router-dom";
import { ArrowLeft, Home, AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="relative w-full max-w-xl text-center">
        <div className="absolute inset-0 -z-10 blur-3xl">
          <div className="mx-auto h-72 w-72 rounded-full bg-blue-300/30" />
        </div>

        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
          <AlertTriangle className="h-12 w-12 text-blue-600" />
        </div>

        <h1 className="mb-2 text-7xl font-extrabold tracking-tight text-slate-800">
          404
        </h1>

        <h2 className="mb-3 text-2xl font-semibold text-slate-700">
          Page Not Found
        </h2>

        <p className="mx-auto mb-8 max-w-md text-slate-500">
          Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
          Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chính.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/student-management"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Home className="h-4 w-4" />
            Trang chủ
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </button>
        </div>
      </div>

      <div className="mt-12 text-xs text-slate-400">
        © {new Date().getFullYear()} Student Management System
      </div>
    </div>
  );
}
