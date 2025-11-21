import Navbar from "./components/Navbar/navbar";
import { Routes, Route } from "react-router-dom";

import StudentManager from "./components/StudentManager/studentManager";
import OfficialStudents from "./components/OfficialStudents/officialStudent";
import TrialStudents from "./components/TrialStudents/trialStudents";
import TeacherAttendance from "./components/TeacherAttendance/teacherAttendance";
import LeaveTracking from "./components/LeaveTracking/leaveTracking";
import StudentScores from "./components/StudentScores/studentScores";

export default function App() {
  return (
    <div className="flex">
      <Navbar />
      <main className="ml-[20%] w-[80%] p-6">
        <Routes>
          <Route path="/student-management" element={<StudentManager />} />
          <Route path="/official-students" element={<OfficialStudents />} />
          <Route path="/trial-students" element={<TrialStudents />} />
          <Route path="/teacher-attendance" element={<TeacherAttendance />} />
          <Route path="/leave-tracking" element={<LeaveTracking />} />
          <Route path="/student-scores" element={<StudentScores />} />
        </Routes>
      </main>
    </div>
  );
}
