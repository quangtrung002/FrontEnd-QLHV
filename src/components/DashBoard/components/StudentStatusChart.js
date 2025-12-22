import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";

export default function StudentStatusChart({ data }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow">
      <h3 className="mb-4 font-semibold">Tỷ lệ học viên</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={100} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
