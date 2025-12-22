import {
  stats,
  studentGrowth,
  studentsByGrade,
  studentStatus,
  leaveStats,
  teacherWorkload
} from "./dashboardData";

import StatCard from "./components/StatCard";
import StudentGrowthChart from "./components/StudentGrowthChart";
import StudentByGradeChart from "./components/StudentByGradeChart";
import StudentStatusChart from "./components/StudentStatusChart";
import LeaveChart from "./components/LeaveChart";
import TeacherWorkloadChart from "./components/TeacherWorkloadChart";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Trang chủ</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
        <StatCard title="Tổng học viên" value={stats.totalStudents} />
        <StatCard title="Chính thức" value={stats.officialStudents} />
        <StatCard title="Học thử" value={stats.trialStudents} />
        <StatCard title="Nghỉ hôm nay" value={stats.leaveToday} />
        <StatCard title="Giáo viên dạy hôm nay" value={stats.teachersToday} />
      </div>

      <StudentGrowthChart data={studentGrowth} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StudentByGradeChart data={studentsByGrade} />
        <StudentStatusChart data={studentStatus} />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <LeaveChart data={leaveStats} />
        <TeacherWorkloadChart data={teacherWorkload} />
      </div>
    </div>
  );
}
