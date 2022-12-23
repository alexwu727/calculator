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
    sign: "",
    num: 0,
    res: 0,
  });
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  }
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: calc.num ? -calc.num : 0,
      res: calc.res ? -calc.res : 0
    });
  }
  const percentClickHandler = () => {

  }
  const equalsClickHandler = () => {

  }
  const opClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  }
  const dotClickHandler = () => {

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
        res: !calc.sign ? 0 : calc.res,
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
