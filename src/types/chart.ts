// export type ChartType = "bar" | "line" | "pie";

// export interface ChartConfig {
//   id: string;
//   type: ChartType;
//   title: string;
//   swapAxes: boolean;
//   x: number;
//   y: number;
//   w: number;
//   h: number;
// }

export interface DataPoint {
  name: string;
  value: number;
  category?: string;
}

export interface ChartData {
  name: string;
  value: number;
  fill?: string;
}

export type ChartType = "pie" | "bar" | "line" | "area";

export interface ChartConfig {
  id: string;
  type: ChartType;
  title: string;
  data: ChartData[];
  showLegend: boolean;
  showLabels: boolean;
  showTooltip: boolean;
  animationDuration: number;
  innerRadius?: number; // for pie charts
}
