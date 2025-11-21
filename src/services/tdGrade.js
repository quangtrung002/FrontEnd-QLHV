import { cn } from "services/utils";

const gradeColors = [
  { grade: "Lớp 1", color: "bg-red-300" },
  { grade: "Lớp 2", color: "bg-blue-300" },
  { grade: "Lớp 3", color: "bg-pink-300" },
  { grade: "Lớp 4", color: "bg-cyan-300" },
  { grade: "Lớp 5", color: "bg-green-300" },
  { grade: "Lớp 6", color: "bg-yellow-300" },
  { grade: "Lớp 7", color: "bg-purple-300" },
  { grade: "Lớp 8", color: "bg-orange-300" },
  { grade: "Lớp 9", color: "bg-teal-300" },
  { grade: "Lớp 10", color: "bg-indigo-300" },
  { grade: "Lớp 11", color: "bg-lime-300" },
  { grade: "Lớp 12", color: "bg-fuchsia-300" },
];

export default function TdGrade({ str, cssInput = "" }) {
  const item = gradeColors.find(
    (i) => i.grade.toLowerCase() === str?.trim().toLowerCase()
  );

  const color = item ? item.color : "bg-gray-100";
  const displayText = item ? item.grade : str;

  return (
    <td className={cn("border px-3 py-2", cssInput)}>
      <span
        className={cn(
          "border px-2 py-1 rounded-2xl text-sm whitespace-nowrap font-medium",
          color
        )}
      >
        {displayText}
      </span>
    </td>
  );
}
