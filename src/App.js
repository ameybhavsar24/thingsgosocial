import "./styles.css";
import { useReducer, useEffect, useRef } from "react";

const initState = {
  countA: 0,
  countB: 0,
  countC: 0,
  countD: 0
};
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        countA: state.countA + 1,
        countB: state.countB + 1,
        countC: state.countC + 1,
        countD: state.countD + 1
      };
    default:
      throw new Error("Invalid reducer action");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initState);
  return (
    <div className="App">
      <A dispatch={dispatch} />
      <B state={state} dispatch={dispatch} />
    </div>
  );
}
const A = ({ dispatch }) => {
  useInterval(() => dispatch({ type: "increment" }), 1);
  return <></>;
};
const B = ({ state, dispatch }) => {
  return (
    <>
      <p>Count A : {state.countA}</p>
      <p>Count B : {state.countB}</p>
      <p>Count C : {state.countC}</p>
      <p>Count D : {state.countD}</p>
    </>
  );
};

// custom hook from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
