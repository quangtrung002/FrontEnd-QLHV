import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentGrowthChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="mb-4 font-semibold">Tăng trưởng học viên</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line dataKey="official" stroke="#2563eb" />
          <Line dataKey="trial" stroke="#f59e0b" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
