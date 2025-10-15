export type ChartType = "bar" | "line" | "pie";

export interface ChartConfig {
  id: string;
  type: ChartType;
  title: string;
  swapAxes: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  xAxis?: string;
  yAxis?: string | string[];
  columns?: string[];
}

export interface DataPoint {
  name: string;
  value: number;
  category?: string;
}
