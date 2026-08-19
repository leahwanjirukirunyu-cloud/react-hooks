import { useEffect, useMemo, useState } from "react";

function App() {
  // useState
  const [count, setCount] = useState(0);

  // useState for number
  const [number, setNumber] = useState(1);

  // useEffect
  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  // useMemo
  const doubledNumber = useMemo(() => {
    return number * 2;
  }, [number]);

  return (
    <div>
      <h1>React Hooks</h1>

      {/* useState + useEffect */}
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increase Count
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrease Count
      </button>

      <hr />

      {/* useMemo */}
      <h2>Number: {number}</h2>
      <h2>Doubled: {doubledNumber}</h2>

      <button onClick={() => setNumber(number + 1)}>
        Increase Number
      </button>
    </div>
  );
}

export default App;