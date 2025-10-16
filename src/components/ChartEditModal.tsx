import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import type { ChartConfig } from "../types/chart";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { generateMockData } from "../utils/mockData";

interface ChartEditModalProps {
  chart: ChartConfig | null;
  onClose: () => void;
  onSave: (chart: ChartConfig) => void;
}

export const ChartEditModal = ({
  chart,
  onClose,
  onSave,
}: ChartEditModalProps) => {
  const [editedChart, setEditedChart] = useState<ChartConfig | null>(null);

  useEffect(() => {
    setEditedChart(chart);
  }, [chart]);

  if (!editedChart) return null;

  // This is a placeholder for the actual data properties.
  // In a real application, this would come from the chart's data.
  const dataProperties = generateMockData().map((d: { name: string }) => d.name);

  const handleSave = () => {
    if (editedChart) {
      onSave(editedChart);
    }
  };

  const handlePropertyToggle = (property: string) => {
    if (!editedChart) return;
    const hiddenProperties = editedChart.hiddenProperties || [];
    const newHiddenProperties = hiddenProperties.includes(property)
      ? hiddenProperties.filter((p) => p !== property)
      : [...hiddenProperties, property];
    setEditedChart({ ...editedChart, hiddenProperties: newHiddenProperties });
  };

  return (
    <Dialog open={!!chart} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {editedChart.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-semibold mb-2">Data Properties</h4>
          <div className="space-y-2">
            {dataProperties.map((prop: string) => (
              <div key={prop} className="flex items-center space-x-2">
                <Checkbox
                  id={prop}
                  checked={!editedChart.hiddenProperties?.includes(prop)}
                  onCheckedChange={() => handlePropertyToggle(prop)}
                />
                <Label htmlFor={prop}>{prop}</Label>
              </div>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};