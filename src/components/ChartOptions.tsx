import React from "react";
import type { ChartConfig } from "../types/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";

interface ChartOptionsProps {
  config: ChartConfig;
  onUpdate: (id: string, updates: Partial<ChartConfig>) => void;
}

const ChartOptions: React.FC<ChartOptionsProps> = ({ config, onUpdate }) => {
  const dataKeys = ["name", "value", "category"]; // Mock data keys

  const handleXAxisMultiSelectChange = (key: string) => {
    const currentXAxis = Array.isArray(config.xAxis) ? config.xAxis : [];
    const newXAxis = currentXAxis.includes(key)
      ? currentXAxis.filter((item) => item !== key)
      : [...currentXAxis, key];
    onUpdate(config.id, { xAxis: newXAxis });
  };

  const handleYAxisMultiSelectChange = (key: string) => {
    const currentYAxis = Array.isArray(config.yAxis) ? config.yAxis : [];
    const newYAxis = currentYAxis.includes(key)
      ? currentYAxis.filter((item) => item !== key)
      : [...currentYAxis, key];
    onUpdate(config.id, { yAxis: newYAxis });
  };

  const renderOptions = () => {
    switch (config.type) {
      case "bar":
        return (
          <div className="space-y-4">
            <div>
              <Label>X-Axis (Multi-Select)</Label>
              <div className="space-y-2">
                {dataKeys.map((key) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`x-${key}`}
                      checked={(config.xAxis as string[])?.includes(key)}
                      onCheckedChange={() => handleXAxisMultiSelectChange(key)}
                      disabled={(config.yAxis as string[])?.includes(key)}
                    />
                    <Label htmlFor={`x-${key}`}>{key}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label>Y-Axis (Multi-Select)</Label>
              <div className="space-y-2">
                {dataKeys.map((key) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`y-${key}`}
                      checked={(config.yAxis as string[])?.includes(key)}
                      onCheckedChange={() => handleYAxisMultiSelectChange(key)}
                      disabled={(config.xAxis as string[])?.includes(key)}
                    />
                    <Label htmlFor={`y-${key}`}>{key}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "line":
        return (
          <div className="space-y-4">
            <div>
              <Label>X-Axis</Label>
              <Select onValueChange={(value) => onUpdate(config.id, { xAxis: value })} value={config.xAxis as string}>
                <SelectTrigger>
                  <SelectValue placeholder="Select X-Axis" />
                </SelectTrigger>
                <SelectContent>
                  {dataKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Y-Axis</Label>
              <Select onValueChange={(value) => onUpdate(config.id, { yAxis: value })} value={config.yAxis as string}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Y-Axis" />
                </SelectTrigger>
                <SelectContent>
                  {dataKeys.map((key) => (
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                onUpdate(config.id, {
                  xAxis: config.yAxis as string,
                  yAxis: config.xAxis,
                })
              }
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        );
      case "pie":
        return (
          <div>
            <Label>Columns</Label>
            <div className="space-y-2">
              {dataKeys.map((key) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={config.columns?.includes(key)}
                    onCheckedChange={() => {
                      const currentColumns = config.columns || [];
                      const newColumns = currentColumns.includes(key)
                        ? currentColumns.filter((item) => item !== key)
                        : [...currentColumns, key];
                      onUpdate(config.id, { columns: newColumns });
                    }}
                  />
                  <Label htmlFor={key}>{key}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className="p-4">{renderOptions()}</div>;
};

export default ChartOptions;
