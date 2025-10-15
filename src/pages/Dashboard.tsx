import { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import type { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { ChartPanel } from "../components/ChartPanel";
import type { ChartConfig } from "../types/chart";
import { Button } from "../components/ui/button";
import { Plus, RotateCcw } from "lucide-react";
import { toast } from "sonner";

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
  },
];

const Dashboard = () => {
  const [charts, setCharts] = useState<ChartConfig[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCharts;
  });

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

  const handleAddChart = () => {
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      type: "bar",
      title: `New Chart ${charts.length + 1}`,
      swapAxes: false,
      x: 0,
      y: Infinity,
      w: 6,
      h: 2,
    };
    setCharts((prevCharts) => [...prevCharts, newChart]);
    toast.success("Chart added");
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
            <Button onClick={handleAddChart} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Chart
            </Button>
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
              <Button onClick={handleAddChart} className="gap-2">
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
              <div key={chart.id} className="drag-handle">
                <ChartPanel
                  config={chart}
                  onUpdate={handleChartUpdate}
                  onRemove={handleRemoveChart}
                />
              </div>
            ))}
          </ResponsiveGridLayout>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
