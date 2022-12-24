import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  const [calc, setCalc] = useState({
    op: "",
    num: 0,
    res: 0,
  });
  const calculate = (a = Number(calc.res), b = Number(calc.num), op = calc.op) => {
    if (b === 0 && op === "/") {
      return "Can't divide with 0"
    }
    return (
      op === "+"
        ? a + b
        : op === "-"
          ? a - b
          : op === "X"
            ? a * b
            : a / b)
  }
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      op: "",
      num: 0,
      res: 0,
    });
  }
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? -calc.num : 0
    });
  }
  const percentClickHandler = () => {
    if (!calc.num) {
      return
    }
    let num = parseFloat(calc.num) / Math.pow(100, 1)
    setCalc({
      ...calc,
      num: 0,
      res: calc.op ? calculate(calc.res, num) : num,
      op: "",
    });
  }

  const equalsClickHandler = () => {
    if (calc.op && calc.num) {
      setCalc({
        ...calc,
        res: calculate(),
        op: "",
        num: 0,
      });
    }
  }
  const opClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      res: calc.op ? calculate() : calc.num ? calc.num : calc.res,
      op: value,
      num: 0,
    });

  }
  const dotClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  }
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (calc.num.toString().length < 16) {
      const newNum = removeSpaces(calc.num) % 1 === 0 && !calc.num.toString().includes(".")
        ? toLocaleString(Number(removeSpaces(calc.num + value)))
        : toLocaleString(calc.num + value);
      setCalc({
        ...calc,
        num: newNum,
        res: !calc.op ? 0 : calc.res,
      });
    }
  };
  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res} />
      <ButtonBox>
        {
          btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                      ? invertClickHandler
                      : btn === "%"
                        ? percentClickHandler
                        : btn === "="
                          ? equalsClickHandler
                          : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                            ? opClickHandler
                            : btn === "."
                              ? dotClickHandler
                              : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};

export default App;
