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

export interface AddWidgetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    name: string;
    type: WidgetType;
    xAxis?: string;
    yAxis?: string;
  }) => void;
}

export function AddWidgetDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddWidgetDialogProps) {
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState<WidgetType>("bar");
  const [xAxis, setXAxis] = React.useState<string>("");
  const [yAxis, setYAxis] = React.useState<string>("");
  const [error, setError] = React.useState<string | null>(null);
  const [swapped, setSwapped] = React.useState(false);

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
    if (type === "bar") {
      if (!xAxis || !yAxis) {
        setError("Please choose both X axis and Y axis columns.");
        return;
      }
    }

    const base = { name: name.trim(), type } as const;
    const payload = type === "bar" ? { ...base, xAxis, yAxis } : base;

    onSubmit?.(payload);
    console.log("[v0] AddWidget submitted:", payload);

    // Reset and close
    setName("");
    setType("pie");
    setXAxis("");
    setYAxis("");
    setError(null);
    onOpenChange(false);
    setSwapped(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-pretty">Add Widget</DialogTitle>
          <DialogDescription className="text-pretty">
            Enter a name and choose a widget type to add it to your dashboard.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="widget-name">Widget Name</Label>
            <Input
              id="widget-name"
              placeholder="e.g. Sales Overview"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="widget-type">Widget Type</Label>
            <Select
              value={type}
              onValueChange={(v: WidgetType) => {
                setType(v);
                if (v !== "bar") {
                  setXAxis("");
                  setYAxis("");
                  setError(null);
                  setSwapped(false);
                }
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

          {type === "bar" && (
            <div className="flex items-end justify-center  gap-4 ">
              <div className="grid gap-2">
                <Label htmlFor="x-axis">X Axis Column</Label>
                <Select value={xAxis} onValueChange={setXAxis}>
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
              <div className="">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Swap X and Y axis"
                  onClick={() => {
                    const prevX = xAxis;
                    const prevY = yAxis;
                    setXAxis(prevY);
                    setYAxis(prevX);
                    setSwapped((s) => !s);
                    setError(null);
                  }}
                >
                  Swap axes
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="y-axis">Y Axis Column</Label>
                <Select value={yAxis} onValueChange={setYAxis}>
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
          {type === "line" && (
            <div className="flex items-end justify-center  gap-4 ">
              <div className="grid gap-2">
                <Label htmlFor="x-axis">X Axis Column</Label>
                <Select value={xAxis} onValueChange={setXAxis}>
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
              <div className="">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  aria-label="Swap X and Y axis"
                  onClick={() => {
                    const prevX = xAxis;
                    const prevY = yAxis;
                    setXAxis(prevY);
                    setYAxis(prevX);
                    setSwapped((s) => !s);
                    setError(null);
                  }}
                >
                  Swap axes
                </Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="y-axis">Y Axis Column</Label>
                <Select value={yAxis} onValueChange={setYAxis}>
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

          <DialogFooter className="mt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Widget</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
