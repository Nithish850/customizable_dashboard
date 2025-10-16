import type { ChartConfig, ChartType } from "../types/chart";
import { generateMockData, CHART_COLORS } from "../utils/mockData";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Pencil, X } from "lucide-react";
import ChartOptions from "./ChartOptions";
import { useState } from "react";
import { AddWidgetDialog } from "./new-dashboard/add-widget-dialog";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface ChartPanelProps {
  config: ChartConfig;
  onUpdate: (id: string, updates: Partial<ChartConfig>) => void;
  onRemove: (id: string) => void;
}

export const ChartPanel = ({ config, onUpdate, onRemove }: ChartPanelProps) => {
  const data = generateMockData();
  const [open, setOpen] = useState(false);
  const { widgets } = useSelector((state: RootState) => state.widgets);

  const handleTypeChange = (type: ChartType) => {
    onUpdate(config.id, { type });
  };

  const renderChart = () => {
    const chartData = config.swapAxes
      ? data.map((d) => ({
          name: d.value.toString(),
          value: parseInt(d.name) || 0,
        }))
      : data;

    switch (config.type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey={config.xAxis || "name"}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              {(Array.isArray(config.yAxis)
                ? config.yAxis
                : [config.yAxis || "value"]
              ).map((yAxis, index) => (
                <Bar
                  key={yAxis}
                  dataKey={yAxis}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey={config.xAxis || "name"}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={(config.yAxis as string) || "value"}
                stroke="hsl(var(--chart-2))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-2))", r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="hsl(var(--chart-1))"
                dataKey={config.columns?.[0] || "value"}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <>
      <div className="flex h-full rounded-lg flex-col overflow-hidden bg-white shadow-xl">
        <div className="flex items-center justify-between gap-2  bg-muted/50 p-3">
          <h3 className="flex-1 truncate font-semibold text-card-foreground">
            {config.title}
          </h3>

          <div className="flex items-center gap-2">
            <Select value={config.type} onValueChange={handleTypeChange}>
              <SelectTrigger className="h-8 w-24 bg-card">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-black text-white">
                <SelectItem value="bar">Bar</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="pie">Pie</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setOpen(true)}
              title="Edit Chart"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="h-8 w-8"
              onClick={() => onRemove(config.id)}
              title="Remove Chart"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <ChartOptions config={config} onUpdate={onUpdate} />
        <div className="flex-1 p-4">{renderChart()}</div>
      </div>
      <AddWidgetDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          onUpdate(config.id, {
            title: data.name,
            type: data.type,
            xAxis: data.xAxis,
            yAxis: data.yAxis,
          });
        }}
        widget={{
          id: config.id,
          name: config.title,
          type: config.type,
          xAxis: config.xAxis,
          yAxis: Array.isArray(config.yAxis)
            ? config.yAxis.join(",")
            : config.yAxis,
        }}
        widgets={widgets}
      />
    </>
  );
};
