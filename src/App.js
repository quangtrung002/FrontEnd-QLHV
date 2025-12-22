import { Routes, Route } from "react-router-dom";
import StudentManager from "./components/StudentManager/studentManager";
import TeacherAttendance from "./components/TeacherAttendance/teacherAttendance";
import LeaveTracking from "./components/LeaveTracking/leaveTracking";
import StudentScores from "./components/StudentScores/studentScores";
import NotFound from "components/Notfound/notfound";
import Dashboard from "components/DashBoard/dashboard";
import Feedback from "components/Feedback/feedback";
import TrialManager from "components/TrialManager/TrialManager";
import { AuthProvider } from "context/AuthContext";
import MainLayout from "components/layout";
import LoginPage from "components/Login/login";
import ProtectedRoute from "context/ProtectedRoute";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/student-management" element={<StudentManager />} />
            <Route path="/teacher-attendance" element={<TeacherAttendance />} />
            <Route path="/leave-tracking" element={<LeaveTracking />} />
            <Route path="/trial-management" element={<TrialManager />} />
            <Route path="/student-scores" element={<StudentScores />} />
            <Route path="/feedback" element={<Feedback />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </AuthProvider>
  );
}