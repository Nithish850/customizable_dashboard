import React from "react";
import { Button } from "../components/ui/button";
import { AddWidgetDialog } from "../components/new-dashboard/add-widget-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  addWidget,
  deleteWidget,
  updateWidget,
} from "../store/widgetSlice";
import { Widget } from "../types/widget";

function Edit() {
  const [open, setOpen] = React.useState(false);
  const { widgets } = useSelector((state: RootState) => state.widgets);
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] = React.useState<Widget | undefined>(
    undefined
  );

  const handleDelete = (id: string) => {
    dispatch(deleteWidget(id));
  };

  return (
    <div>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-pretty">Widgets</h1>
        <Button className="bg-black text-white" onClick={() => setOpen(true)}>
          Create Widget
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
                {w.type === "bar" || w.type === "line" || w.type === "pie" ? (
                  <div className="text-sm text-muted-foreground">
                    {w.type === "pie" ? "Column 1" : "X axis"}:{" "}
                    <span className="font-medium text-foreground">
                      {w.xAxis}
                    </span>
                    , {w.type === "pie" ? "Column 2" : "Y axis"}:{" "}
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
              <CardFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedWidget(w);
                    setOpen(true);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(w.id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      )}

      <AddWidgetDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setSelectedWidget(undefined);
          }
          setOpen(isOpen);
        }}
        onSubmit={(data) => {
          if (selectedWidget) {
            dispatch(
              updateWidget({
                id: selectedWidget.id,
                name: data.name,
                type: data.type,
                xAxis: data.xAxis,
                yAxis: data.yAxis,
              })
            );
          } else {
            const id = `${Date.now()}-${Math.random()
              .toString(36)
              .slice(2, 8)}`;
            dispatch(addWidget({ id, ...data }));
          }
        }}
        widget={selectedWidget}
        widgets={widgets}
      />
    </div>
  );
}

export default Edit;
