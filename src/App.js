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
      op: "",
      num: calc.num ? -calc.num : 0,
      res: calc.res ? -calc.res : 0
    });
  }
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  }
  const equalsClickHandler = () => {
    if (calc.op && calc.num) {
      const math = (a, b, op) => {
        console.log(a, b)
        return (
          op === "+"
            ? a + b
            : op === "-"
              ? a - b
              : op === "X"
                ? a * b
                : a / b)
      }
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.op === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.op),
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
      op: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
    // if (calc.op) {
    //   equalsClickHandler()
    // }

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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
