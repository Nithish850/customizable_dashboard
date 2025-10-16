import type { ChartConfig, DataPoint } from "../types/chart";

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

export const mockCharts: ChartConfig[] = [
  {
    id: "chart-1",
    type: "pie",
    title: "Sales Distribution",
    data: [
      { name: "Product A", value: 400 },
      { name: "Product B", value: 300 },
      { name: "Product C", value: 300 },
      { name: "Product D", value: 200 },
    ],
    showLegend: true,
    showLabels: true,
    showTooltip: true,
    animationDuration: 800,
    innerRadius: 0,
  },
  {
    id: "chart-2",
    type: "bar",
    title: "Monthly Revenue",
    data: [
      { name: "Jan", value: 4000 },
      { name: "Feb", value: 3000 },
      { name: "Mar", value: 5000 },
      { name: "Apr", value: 4500 },
      { name: "May", value: 6000 },
      { name: "Jun", value: 5500 },
    ],
    showLegend: true,
    showLabels: false,
    showTooltip: true,
    animationDuration: 800,
  },
];

