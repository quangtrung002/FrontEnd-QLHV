import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentByGradeChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="mb-4 font-semibold">Học viên theo khối</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="grade" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
