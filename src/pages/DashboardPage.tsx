import { useState } from "react";
import { Plus, PieChart as PieChartIcon, BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { ChartConfigDialog } from "../components/ChartConfigDialog";
import { ChartCard } from "../components/ChartCard";
import type { ChartConfig, ChartType } from "../types/chart";

const DashboardPage = () => {
  const [charts, setCharts] = useState<ChartConfig[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingChart, setEditingChart] = useState<ChartConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const chartTypes = [
    { name: "Pie Chart", icon: PieChartIcon, type: "pie" as ChartType },
    { name: "Bar Chart", icon: BarChart3, type: "bar" as ChartType },
    { name: "Line Chart", icon: LineChartIcon, type: "line" as ChartType },
    { name: "Area Chart", icon: AreaChartIcon, type: "area" as ChartType },
  ];

  const handleAddChart = (type: ChartType) => {
    const newChart: ChartConfig = {
      id: `chart-${Date.now()}`,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      data: [
        { name: "Item 1", value: 400 },
        { name: "Item 2", value: 300 },
        { name: "Item 3", value: 300 },
        { name: "Item 4", value: 200 },
      ],
      showLegend: true,
      showLabels: true,
      showTooltip: true,
      animationDuration: 800,
      innerRadius: type === "pie" ? 0 : undefined,
      swapAxes: false,
      x: 0,
      y: 0,
      w: 6,
      h: 2,
    };
    setCharts([...charts, newChart]);
    setIsOpen(false);
    toast.success(`${newChart.title} added to dashboard`);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCharts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
      toast.success("Chart position updated");
    }
  };

  const handleEditChart = (chart: ChartConfig) => {
    setEditingChart(chart);
    setDialogOpen(true);
  };

  const handleSaveChart = (updatedChart: ChartConfig) => {
    setCharts(charts.map((c) => (c.id === updatedChart.id ? updatedChart : c)));
    toast.success("Chart configuration saved");
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Drag and drop to rearrange your charts</p>
        </header>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={charts.map(c => c.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {charts.map((chart) => (
                <ChartCard key={chart.id} chart={chart} onEdit={handleEditChart} />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        {charts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No charts yet. Click the + button to add your first chart.</p>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-8 right-8">
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                size="lg"
                className="h-16 w-16 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110"
              >
                <Plus className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-popover">
              <div className="p-2">
                <p className="text-xs text-muted-foreground mb-2 px-2">Select chart type</p>
                {chartTypes.map((chart) => {
                  const Icon = chart.icon;
                  return (
                    <DropdownMenuItem
                      key={chart.name}
                      onClick={() => handleAddChart(chart.type)}
                      className="cursor-pointer py-3 px-2 hover:bg-accent/50 rounded-md transition-colors"
                    >
                      <Icon className="h-4 w-4 mr-3 text-primary" />
                      <span className="font-medium">{chart.name}</span>
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <ChartConfigDialog
          chart={editingChart}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSave={handleSaveChart}
        />
      </div>
    </div>
  );
};

export default DashboardPage;
