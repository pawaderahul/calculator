import { useDispatch, useSelector } from "react-redux";
import {
  numberHandler,
  basicOperationHandler,
  calculateExp,
  percentHandler,
  invertHandler,
  clear,
} from "./features/calculatorSlice";
import Button from "./components/button";
import { btnValues } from "./data/data";

function App() {
  const { expression } = useSelector((state) => state.calculator);
  const dispatch = useDispatch();

  const valueHandler = (value) => {
    switch (value) {
      case "AC":
        dispatch(clear());
        break;
      case "+/-":
        dispatch(invertHandler());
        break;
      case "%":
        dispatch(percentHandler());
        break;
      case "+":
      case "-":
      case "x":
      case "÷":
        dispatch(basicOperationHandler(value));
        break;
      case "=":
        dispatch(calculateExp());
        break;
      default:
        dispatch(numberHandler(value));
        break;
    }
  };

  return (
    <>
      <section className="calculator">
        <section className="display-container">
          <p className="value">{expression}</p>
        </section>
        <section className="action-container">
          {btnValues.map((value, index) => {
            return (
              <Button
                key={index}
                className={value === "=" ? "equals" : ""}
                value={value}
                onClick={() => valueHandler(value)}
              />
            );
          })}
        </section>
      </section>
    </>
  );
}

export default App;
