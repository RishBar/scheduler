import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // transition to next mode and set history
  const transition = function(next, replace = false) {
    if (replace) {
      history.pop();
    }
    setHistory([...history, next])
    setMode(next)
  }
  // setMode to last mode in history
  const back = function() {
    if (history.length <= 1) {
      return;
    }
    history.pop();
    setMode(history[history.length - 1])
  }
  return { mode, transition, back };
}