import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function LeaveChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="mb-4 font-semibold">Nghỉ học theo ngày</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
