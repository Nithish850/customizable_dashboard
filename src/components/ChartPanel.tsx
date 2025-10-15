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
import { X } from "lucide-react";

interface ChartPanelProps {
  config: ChartConfig;
  onUpdate: (id: string, updates: Partial<ChartConfig>) => void;
  onRemove: (id: string) => void;
}

export const ChartPanel = ({ config, onUpdate, onRemove }: ChartPanelProps) => {
  const data = generateMockData();

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
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                fill="hsl(var(--chart-1))"
                radius={[8, 8, 0, 0]}
              />
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
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
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
                dataKey="value"
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
                dataKey="value"
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

      <div className="flex-1 p-4">{renderChart()}</div>
    </div>
  );
};
