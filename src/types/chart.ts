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
  swapAxes: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  hiddenProperties?: string[];
}
