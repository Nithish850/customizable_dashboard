export type WidgetType = "pie" | "line" | "bar";

export type Widget = {
  id: string;
  name: string;
  type: WidgetType;
  xAxis?: string;
  yAxis?: string;
};
