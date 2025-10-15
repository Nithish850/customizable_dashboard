"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type WidgetType = "pie" | "line" | "bar";

interface Widget {
  id: string;
  name: string;
  type: WidgetType;
  xAxis?: string;
  yAxis?: string;
}

export interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: Omit<Widget, "id">) => void;
  widget?: Widget;
  widgets: Widget[];
}

export function AddWidgetDialog({
  open,
  onOpenChange,
  onSubmit,
  widget,
  widgets,
}: AddWidgetDialogProps) {
  const [configuration, setConfiguration] = React.useState({
    name: "",
    type: "bar" as WidgetType,
    columns: {
      xAxis: "",
      yAxis: "",
    },
  });
  const [error, setError] = React.useState<string | null>(null);

  const isEditMode = widget !== undefined;

  React.useEffect(() => {
    if (widget) {
      setConfiguration({
        name: widget.name,
        type: widget.type,
        columns: {
          xAxis: widget.xAxis || "",
          yAxis: widget.yAxis || "",
        },
      });
    } else {
      setConfiguration({
        name: "",
        type: "bar",
        columns: {
          xAxis: "",
          yAxis: "",
        },
      });
    }
  }, [widget]);

  // Mock columns for selection
  const metricColumns = [
    "Sales",
    "Profit",
    "Quantity",
    "Month",
    "Region",
    "Category",
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { name, type, columns } = configuration;

    if (
      !isEditMode &&
      widgets.some(
        (w) => w.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      setError("Widget name already exists.");
      return;
    }

    if (type === "bar" || type === "line" || type === "pie") {
      if (!columns.xAxis || !columns.yAxis) {
        setError("Please choose both columns.");
        return;
      }
    }

    onSubmit?.({
      name,
      type,
      xAxis: columns.xAxis,
      yAxis: columns.yAxis,
    });

    if (!isEditMode) {
      setConfiguration({
        name: "",
        type: "bar",
        columns: {
          xAxis: "",
          yAxis: "",
        },
      });
    }
    setError(null);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-pretty">
            {isEditMode ? "Edit Widget" : "Create Widget"}
          </DialogTitle>
          <DialogDescription className="text-pretty">
            {isEditMode
              ? "Edit the details of your widget."
              : "Enter a name and choose a widget type to add it to your dashboard."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="widget-name">Widget Name</Label>
            <Input
              id="widget-name"
              placeholder="e.g. Sales Overview"
              value={configuration.name}
              onChange={(e) =>
                setConfiguration({ ...configuration, name: e.target.value })
              }
              required
              disabled={isEditMode}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="widget-type">Widget Type</Label>
            <Select
              value={configuration.type}
              onValuechange={(v: WidgetType) => {
                setConfiguration({
                  ...configuration,
                  type: v,
                  columns: {
                    xAxis: "",
                    yAxis: "",
                  },
                });
                setError(null);
              }}
            >
              <SelectTrigger id="widget-type" aria-label="Select widget type">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="pie">Pie</SelectItem>
                <SelectItem value="line">Line</SelectItem>
                <SelectItem value="bar">Bar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(configuration.type === "bar" || configuration.type === "line") && (
            <div className="flex items-end justify-center gap-4">
              <div className="grid gap-2">
                <Label htmlFor="x-axis">X Axis Column</Label>
                <Select
                  value={configuration.columns.xAxis}
                  onValueChange={(v) =>
                    setConfiguration({
                      ...configuration,
                      columns: { ...configuration.columns, xAxis: v },
                    })
                  }
                >
                  <SelectTrigger id="x-axis" aria-label="Select x-axis column">
                    <SelectValue placeholder="Select X axis" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {metricColumns.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Swap X and Y axis"
                  onClick={() => {
                    setConfiguration({
                      ...configuration,
                      columns: {
                        xAxis: configuration.columns.yAxis,
                        yAxis: configuration.columns.xAxis,
                      },
                    });
                    setError(null);
                  }}
                >
                  Swap axes
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="y-axis">Y Axis Column</Label>
                <Select
                  value={configuration.columns.yAxis}
                  onValueChange={(v) =>
                    setConfiguration({
                      ...configuration,
                      columns: { ...configuration.columns, yAxis: v },
                    })
                  }
                >
                  <SelectTrigger id="y-axis" aria-label="Select y-axis column">
                    <SelectValue placeholder="Select Y axis" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {metricColumns.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error && (
                <p className="col-span-full text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>
          )}
          {configuration.type === "pie" && (
            <div className="flex items-end justify-center gap-4">
              <div className="grid gap-2">
                <Label htmlFor="x-axis">Column 1</Label>
                <Select
                  value={configuration.columns.xAxis}
                  onValueChange={(v) =>
                    setConfiguration({
                      ...configuration,
                      columns: { ...configuration.columns, xAxis: v },
                    })
                  }
                >
                  <SelectTrigger id="x-axis" aria-label="Select column 1">
                    <SelectValue placeholder="Select column 1" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {metricColumns.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="y-axis">Column 2</Label>
                <Select
                  value={configuration.columns.yAxis}
                  onValueChange={(v) =>
                    setConfiguration({
                      ...configuration,
                      columns: { ...configuration.columns, yAxis: v },
                    })
                  }
                >
                  <SelectTrigger id="y-axis" aria-label="Select column 2">
                    <SelectValue placeholder="Select column 2" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {metricColumns.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Save Changes" : "Create Widget"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
