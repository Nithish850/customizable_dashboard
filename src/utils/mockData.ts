import type { DataPoint } from "../types/chart";

export const generateMockData = (): DataPoint[] => {
  return [
    { name: "Jan", value: 4000, category: "Sales" },
    { name: "Feb", value: 3000, category: "Sales" },
    { name: "Mar", value: 5000, category: "Sales" },
    { name: "Apr", value: 4500, category: "Sales" },
    { name: "May", value: 6000, category: "Sales" },
    { name: "Jun", value: 5500, category: "Sales" },
  ];
};

export const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];
