import { createSlice } from "@reduxjs/toolkit";

export const calculate = (expression, operation) => {
  const splitExp = expression.split(operation);
  let firstValue = parseFloat(splitExp[0]);
  let secondValue = parseFloat(splitExp[1]);

  switch (operation) {
    case "+":
      return firstValue + secondValue;
    case "-":
      return firstValue - secondValue;
    case "÷":
      return firstValue / secondValue;
    case "x":
      return firstValue * secondValue;
    default:
      return expression;
  }
};

export const invertvalue = (value) => {
  return value.startsWith("-") ? value.slice(1) : "-".concat(value);
};

export const calculatorSlice = createSlice({
  name: "calculator",
  initialState: {
    operation: "",
    expression: "0",
  },
  reducers: {
    clear: (state) => {
      state.expression = "0";
      state.operation = "";
    },
    numberHandler: (state, action) => {
      const expression = state.expression === "0" ? "" : state.expression;
      state.expression = expression.concat(action.payload);
    },
    basicOperationHandler: (state, action) => {
      if (state.expression === "0") return;
      if (state.operation) {
        const result = calculate(state.expression, state.operation);

        state.operation = action.payload;
        state.expression = result.toString().concat(action.payload);
        return;
      } else {
        state.operation = action.payload;
        state.expression = state.expression.concat(action.payload);
      }
    },
    percentHandler: (state) => {
      if (state.expression === "0") return;
      if (!state.operation) state.expression = "0";
      else {
        let splitExp = state.expression.split(state.operation);
        let secondValue = splitExp[1]
          ? (splitExp[0] * splitExp[1]) / 100
          : (splitExp[0] * splitExp[0]) / 100;
        state.expression = splitExp[0] + state.operation + secondValue;
      }
    },
    invertHandler: (state) => {
      if (state.expression === "0") return;
      if (!state.operation) state.expression = invertvalue(state.expression);
      else {
        let splitExp = state.expression.split(state.operation);
        splitExp[1] = splitExp[1]
          ? invertvalue(splitExp[1])
          : invertvalue(splitExp[0]);
        state.expression = splitExp.join(state.operation);
      }
    },
    calculateExp: (state) => {
      const result = calculate(state.expression, state.operation);

      state.expression = result.toString();
      state.operation = "";
    },
  },
});

export const {
  clear,
  numberHandler,
  basicOperationHandler,
  percentHandler,
  invertHandler,
  calculateExp,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
