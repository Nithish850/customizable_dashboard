import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import type { ChartConfig } from "../types/chart";

interface ChartConfigDialogProps {
  chart: ChartConfig | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (chart: ChartConfig) => void;
}

export const ChartConfigDialog = ({ chart, open, onOpenChange, onSave }: ChartConfigDialogProps) => {
  const [config, setConfig] = useState<ChartConfig | null>(null);

  useEffect(() => {
    if (chart) {
      setConfig(chart);
    }
  }, [chart]);

  if (!config) return null;

  const handleSave = () => {
    onSave(config);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto background-white dark:background-dark p-6">
        <DialogHeader>
          <DialogTitle>Configure {config.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Chart Title</Label>
            <Input
              id="title"
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Display Options</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="legend">Show Legend</Label>
              <Switch
                id="legend"
                checked={config.showLegend}
                onCheckedChange={(checked) => setConfig({ ...config, showLegend: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="labels">Show Labels</Label>
              <Switch
                id="labels"
                checked={config.showLabels}
                onCheckedChange={(checked) => setConfig({ ...config, showLabels: checked })}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="tooltip">Show Tooltip</Label>
              <Switch
                id="tooltip"
                checked={config.showTooltip}
                onCheckedChange={(checked) => setConfig({ ...config, showTooltip: checked })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Animation Duration: {config.animationDuration}ms</Label>
            <Slider
              value={[config.animationDuration]}
              onValueChange={([value]) => setConfig({ ...config, animationDuration: value })}
              min={0}
              max={2000}
              step={100}
            />
          </div>

          {config.type === "pie" && (
            <div className="space-y-2">
              <Label>Inner Radius: {config.innerRadius || 0}</Label>
              <Slider
                value={[config.innerRadius || 0]}
                onValueChange={([value]) => setConfig({ ...config, innerRadius: value })}
                min={0}
                max={60}
                step={5}
              />
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold">Chart Data</h3>
            <div className="space-y-2">
              {config.data.map((item: { name: string; value: number }, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={item.name}
                    onChange={(e) => {
                      const newData = [...config.data];
                      newData[index].name = e.target.value;
                      setConfig({ ...config, data: newData });
                    }}
                    placeholder="Name"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={item.value}
                    onChange={(e) => {
                      const newData = [...config.data];
                      newData[index].value = Number(e.target.value);
                      setConfig({ ...config, data: newData });
                    }}
                    placeholder="Value"
                    className="w-24"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
