import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ChartPanel } from "../components/ChartPanel";
import type { ChartConfig } from "../types/chart";
import { Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { ChartEditModal } from "../components/ChartEditModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import type { ChartType } from "../types/chart";

const ResponsiveGridLayout = WidthProvider(Responsive);

const STORAGE_KEY = "dashboard-charts";

const defaultCharts: ChartConfig[] = [
  {
    id: "chart-1",
    type: "bar",
    title: "Sales Overview",
    swapAxes: false,
    x: 0,
    y: 0,
    w: 6,
    h: 2,
    data: [],
    showLegend: true,
    showLabels: true,
    showTooltip: true,
    animationDuration: 500,
  },
  {
    id: "chart-2",
    type: "line",
    title: "Revenue Trends",
    swapAxes: false,
    x: 6,
    y: 0,
    w: 6,
    h: 2,
    data: [],
    showLegend: true,
    showLabels: true,
    showTooltip: true,
    animationDuration: 500,
  },
];

const Dashboard = () => {
  const [charts, setCharts] = useState<ChartConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCharts;
  });
  const [editingChart, setEditingChart] = useState<ChartConfig | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(charts));
  }, [charts]);

  const handleLayoutChange = (layout: Layout[]) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) => {
        const layoutItem = layout.find((l) => l.i === chart.id);
        if (layoutItem) {
          return {
            ...chart,
            x: layoutItem.x,
            y: layoutItem.y,
            w: layoutItem.w,
            h: layoutItem.h,
          };
        }
        return chart;
      })
    );
  };

  const handleChartUpdate = (id: string, updates: Partial<ChartConfig>) => {
    setCharts((prevCharts) =>
      prevCharts.map((chart) =>
        chart.id === id ? { ...chart, ...updates } : chart
      )
    );
  };

  const handleRemoveChart = (id: string) => {
    setCharts((prevCharts) => prevCharts.filter((chart) => chart.id !== id));
    toast.success("Chart removed");
  };

  const handleEditChart = (chart: ChartConfig) => {
    setEditingChart(chart);
  };

  const handleCloseModal = () => {
    setEditingChart(null);
  };

  const handleSaveChart = (updatedChart: ChartConfig) => {
    handleChartUpdate(updatedChart.id, updatedChart);
    setEditingChart(null);
    toast.success("Chart updated");
  };

  const handleAddChart = (type: ChartType) => {
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      type: type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      swapAxes: false,
      x: 0,
      y: Infinity,
      w: 6,
      h: 2,
      data: [],
      showLegend: true,
      showLabels: true,
      showTooltip: true,
      animationDuration: 500,
    };
    setCharts((prevCharts) => [...prevCharts, newChart]);
    toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} chart added`);
  };

  const handleResetLayout = () => {
    setCharts(defaultCharts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultCharts));
    toast.success("Layout reset to default");
  };

  const layout: Layout[] = charts.map((chart) => ({
    i: chart.id,
    x: chart.x,
    y: chart.y,
    w: chart.w,
    h: chart.h,
    minW: 3,
    minH: 1,
  }));

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Analytics Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Drag, resize, and customize your charts
            </p>
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Chart
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handleAddChart("bar")}>
                  Bar Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddChart("line")}>
                  Line Chart
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleAddChart("pie")}>
                  Pie Chart
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleResetLayout}
              variant="outline"
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset Layout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        {charts.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <p className="mb-4 text-lg text-muted-foreground">
                No charts yet
              </p>
              <Button onClick={() => handleAddChart("bar")} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Your First Chart
              </Button>
            </div>
          </div>
        ) : (
          <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={150}
            onLayoutChange={handleLayoutChange}
            draggableHandle=".drag-handle"
            isResizable={true}
            isDraggable={true}
          >
            {charts.map((chart) => (
              <div key={chart.id} className="drag-handle relative group">
                <ChartPanel
                  config={chart}
                  onUpdate={handleChartUpdate}
                  onRemove={handleRemoveChart}
                />
                <Button
                  onClick={() => handleEditChart(chart)}
                  className="absolute top-2 right-12 opacity-0 group-hover:opacity-100 transition-opacity"
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </main>
      <ChartEditModal
        chart={editingChart}
        onClose={handleCloseModal}
        onSave={handleSaveChart}
      />
    </div>
  );
};

export default Dashboard;
