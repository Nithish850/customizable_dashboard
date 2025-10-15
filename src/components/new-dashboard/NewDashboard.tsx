import { useState } from "react";
import type { ChartConfig } from "../../types/chart";
import { MetricCard } from "../cards/MetricCard";
import { Plus, User } from "lucide-react";
import { Button } from "../ui/button";
import { ChartPanel } from "../ChartPanel";
import { Responsive, WidthProvider, type Layout } from "react-grid-layout";
import { toast } from "sonner";

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
];
const ResponsiveGridLayout = WidthProvider(Responsive);

const NewDashboard = () => {
  const [charts, setCharts] = useState<ChartConfig[]>(defaultCharts);

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
    <div className={`min-h-screen flex bg-[#f3f3f3]`}>
      <main className="flex-1 bg-background">
        <header className="border-b bg-[#c2c2c2] px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              10/15/2025, 4:08:02 AM
            </span>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="text-sm">admin@example.com</span>
            </div>
          </div>
        </header>

        <div className="p-6 space-y-6">
          <section className="bg-black rounded-2xl p-5">
            <h2 className="text-lg text-white font-semibold text-primary mb-2">
              Overview
            </h2>
            <p className="text-sm text-white text-muted-foreground mb-4">
              09/15/2025 - 10/15/2025
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <MetricCard
                title="Direct Sale"
                value="323"
                percentage="97.1%"
                icon="shopping-bag"
                color="pink"
              />
              <MetricCard
                title="Initial Subscription"
                value="72"
                percentage="61.0%"
                icon="gift"
                color="purple"
              />
              <MetricCard
                title="Recurring Subscription"
                value="1"
                percentage="100%"
                icon="repeat"
                color="cyan"
              />
              <MetricCard
                title="Subscription Salvage"
                value="23"
                percentage="39.0%"
                icon="shield"
                color="blue"
              />
              <MetricCard
                title="Upsell"
                value="203"
                percentage="91.0%"
                icon="trending-up"
                color="orange"
              />
              <MetricCard
                title="Subscription to Bill"
                value="44"
                icon="receipt"
                color="violet"
              />
            </div>
          </section>
        </div>
        <div className="p-6 space-y-6 ">
          <div className="rounded-2xl p-5 bg-black">
            <Button onClick={handleAddChart} className="gap-2 bg-white">
              <Plus className="h-4 w-4" />
              Add Chart
            </Button>
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewDashboard;
