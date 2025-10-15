import React from "react";
import { Button } from "../components/ui/button";
import { AddWidgetDialog } from "../components/new-dashboard/add-widget-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

function Edit() {
  const [open, setOpen] = React.useState(false);
  type WidgetType = "pie" | "line" | "bar";
  type Widget = {
    id: string;
    name: string;
    type: WidgetType;
    xAxis?: string;
    yAxis?: string;
  };
  const [widgets, setWidgets] = React.useState<Widget[]>([]);

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pretty">Widgets</h1>
        <Button className="bg-black text-white" onClick={() => setOpen(true)}>
          Add Widget
        </Button>
      </header>

      {widgets.length === 0 ? (
        <section className="rounded-lg border p-6">
          <p className="text-muted-foreground">
            No widgets yet. Click “Add Widget” to create your first one.
          </p>
        </section>
      ) : (
        <section className="grid grid-cols-1 gap-4">
          {widgets.map((w) => (
            <Card key={w.id}>
              <CardHeader>
                <CardTitle className="text-pretty">{w.name}</CardTitle>
                <CardDescription className="capitalize">
                  {w.type} chart
                </CardDescription>
              </CardHeader>
              <CardContent>
                {w.type === "bar" ? (
                  <div className="text-sm text-muted-foreground">
                    X axis:{" "}
                    <span className="font-medium text-foreground">
                      {w.xAxis}
                    </span>
                    , Y axis:{" "}
                    <span className="font-medium text-foreground">
                      {w.yAxis}
                    </span>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No additional configuration
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </section>
      )}

      <AddWidgetDialog
        open={open}
        onOpenChange={setOpen}
        onSubmit={(data) => {
          // Replace this with your own persistence or state management.
          const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

          setWidgets((prev) => [...prev, { id, ...data }]);
          console.log("[v0] Widget to create:", data);
        }}
      />
    </div>
  );
}

export default Edit;
