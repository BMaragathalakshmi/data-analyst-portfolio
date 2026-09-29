import React from "react";
import { cn } from "@/lib/utils/cn";

interface DataTableProps {
  columns: string[];
  rows: (string | number)[][];
  totalCount?: number;
  className?: string;
  emptyMessage?: string;
}

export const DataTable: React.FC<DataTableProps> = ({
  columns,
  rows,
  totalCount,
  className,
  emptyMessage = "No records found.",
}) => {
  return (
    <div 
      className={cn("w-full overflow-hidden rounded-xl border backdrop-blur-md shadow-sm", className)}
      style={{
        backgroundColor: "var(--bg-surface)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="overflow-x-auto max-h-[380px] scrollbar-thin">
        <table className="w-full text-left text-xs font-mono border-collapse">
          <thead>
            <tr 
              className="border-b uppercase tracking-wider sticky top-0 z-10"
              style={{
                backgroundColor: "var(--bg-subtle)",
                borderColor: "var(--border-color)",
                color: "var(--text-primary)",
              }}
            >
              <th className="py-3 px-4 font-semibold w-12 text-center" style={{ color: "var(--text-muted)" }}>#</th>
              {columns.map((col, idx) => (
                <th key={idx} className="py-3 px-4 font-semibold" style={{ color: "var(--accent-primary)" }}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={{ borderColor: "var(--border-color)" }}>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="py-8 text-center" style={{ color: "var(--text-muted)" }}>
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className="transition-colors duration-150 border-b"
                  style={{
                    backgroundColor: rowIdx % 2 === 0 ? "var(--bg-surface)" : "var(--bg-subtle)",
                    borderColor: "var(--border-color)",
                  }}
                >
                  <td className="py-2.5 px-4 text-center select-none" style={{ color: "var(--text-muted)" }}>
                    {rowIdx + 1}
                  </td>
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="py-2.5 px-4 whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                      {typeof cell === "number" && !Number.isInteger(cell)
                        ? cell.toFixed(2)
                        : cell}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {totalCount !== undefined && (
        <div 
          className="px-4 py-2 border-t text-[11px] flex justify-between items-center font-mono"
          style={{
            backgroundColor: "var(--bg-subtle)",
            borderColor: "var(--border-color)",
            color: "var(--text-secondary)",
          }}
        >
          <span>Showing {rows.length} records</span>
          <span>Total Database Rows: {totalCount}</span>
        </div>
      )}
    </div>
  );
};
