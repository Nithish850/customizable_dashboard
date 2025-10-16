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
import type { RootState } from "../store";
import { addWidget, deleteWidget, updateWidget } from "../store/widgetSlice";
import type { Widget } from "../types/widget";
import { Link } from "react-router-dom";

function Edit() {
  const [open, setOpen] = React.useState(false);
  const { widgets } = useSelector((state: RootState) => state.widgets);
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] = React.useState<
    Widget | undefined
  >(undefined);

  const handleDelete = (id: string) => {
    dispatch(deleteWidget(id));
  };

  return (
    <div className="">
      <header className="mb-6 flex items-center justify-between bg-[#3b2647] p-6 text-white">
        <h1 className="text-2xl font-semibold text-pretty">Widgets</h1>
        <div className="flex gap-2">
          <Link to="/dashboard">
            <Button className="bg-[#ff00c8] text-white">
              Back to Dashboard
            </Button>
          </Link>
          <Button
            className="bg-[#2d9662] text-white"
            onClick={() => setOpen(true)}
          >
            Create Widget
          </Button>
        </div>
      </header>

      <div className="p-6">
        {widgets.length === 0 ? (
          <section className="rounded-lg border p-6">
            <p className="text-muted-foreground">
              No widgets yet. Click “Add Widget” to create your first one.
            </p>
          </section>
        ) : (
          <section className="grid grid-cols-3 gap-4 ">
            {widgets.map((w) => (
              <Card key={w.id} className="bg-white shadow-xl border-none">
                <div className="p-4 flex justify-around items-center">
                  <div>
                    <CardTitle className="text-pretty">{w.name}</CardTitle>
                    <CardDescription className="capitalize">
                      {w.type} chart
                    </CardDescription>
                  </div>
                  <div>
                    {w.type === "bar" ||
                    w.type === "line" ||
                    w.type === "pie" ? (
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
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => {
                        setSelectedWidget(w);
                        setOpen(true);
                      }}
                      className="bg-[#2188ff] text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={() => handleDelete(w.id)}
                      className="bg-[#ff4b4b] text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </section>
        )}
      </div>

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
