import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TeacherWorkloadChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="mb-4 font-semibold">Ca dạy giáo viên</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="taught" stackId="a" fill="#3b82f6" />
          <Bar dataKey="absent" stackId="a" fill="#f97316" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
