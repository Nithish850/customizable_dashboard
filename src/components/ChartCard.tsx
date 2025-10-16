/* eslint-disable @typescript-eslint/no-explicit-any */
import { Settings, GripVertical } from "lucide-react";
import { PieChart, Pie, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import type { ChartConfig } from "../types/chart";

interface ChartCardProps {
  chart: ChartConfig;
  onEdit: (chart: ChartConfig) => void;
}

const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))", "hsl(var(--chart-4))", "hsl(var(--chart-5))"];

export const ChartCard = ({ chart, onEdit }: ChartCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chart.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderChart = () => {
    const commonProps = {
      data: chart.data,
    };

    switch (chart.type) {
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chart.data.map((entry: any) => ({ ...entry, name: entry.name || '' }))}
                cx="50%"
                cy="50%"
                labelLine={chart.showLabels}
                label={chart.showLabels}
                outerRadius={80}
                innerRadius={chart.innerRadius || 0}
                fill="hsl(var(--chart-1))"
                dataKey="value"
                animationDuration={chart.animationDuration}
              >
                {chart.data.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              {chart.showTooltip && <Tooltip />}
              {chart.showLegend && <Legend />}
            </PieChart>
          </ResponsiveContainer>
        );
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {chart.showTooltip && <Tooltip />}
              {chart.showLegend && <Legend />}
              <Bar dataKey="value" fill="hsl(var(--chart-1))" animationDuration={chart.animationDuration} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              {chart.showTooltip && <Tooltip />}
              {chart.showLegend && <Legend />}
              <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-1))" animationDuration={chart.animationDuration} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
              <GripVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">{chart.title}</h3>
          </div>
          <Button variant="ghost" size="icon" onClick={() => onEdit(chart)}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        {renderChart()}
      </Card>
    </div>
  );
};
