import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Widget } from "../../types/widget";

interface WidgetState {
  widgets: Widget[];
}

const initialState: WidgetState = {
  widgets: [],
};

const widgetSlice = createSlice({
  name: "widgets",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.push(action.payload);
    },
    updateWidget: (state, action: PayloadAction<Widget>) => {
      const index = state.widgets.findIndex(
        (widget) => widget.id === action.payload.id
      );
      if (index !== -1) {
        state.widgets[index] = action.payload;
      }
    },
    deleteWidget: (state, action: PayloadAction<string>) => {
      state.widgets = state.widgets.filter(
        (widget) => widget.id !== action.payload
      );
    },
  },
});

export const { addWidget, updateWidget, deleteWidget } = widgetSlice.actions;

export default widgetSlice.reducer;
