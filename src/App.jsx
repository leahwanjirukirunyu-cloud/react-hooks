import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import "./index.css";

// ============================================================
// CONTEXT
// ============================================================

const ThemeContext = createContext("dark");

// Component that consumes the ThemeContext
function ThemeDisplay() {
  const theme = useContext(ThemeContext);

  return (
    <div
      style={{
        padding: "15px",
        borderRadius: "8px",
        background:
          theme === "dark"
            ? "rgba(0, 0, 0, 0.3)"
            : "rgba(255, 255, 255, 0.8)",
        color: theme === "dark" ? "#fff" : "#000",
        marginBottom: "15px",
        transition: "all 0.3s ease",
        fontWeight: "600",
      }}
    >
      Current Theme from Context: {theme}
    </div>
  );
}

// ============================================================
// REDUCER
// ============================================================

const initialState = {
  count: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1,
      };

    case "decrement":
      return {
        count: state.count - 1,
      };

    default:
      throw new Error("Unknown action");
  }
}

// ============================================================
// APP COMPONENT
// ============================================================

function App() {
  // ==========================================================
  // useState
  // ==========================================================

  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(1);
  const [themeValue, setThemeValue] = useState("dark");

  // ==========================================================
  // useEffect
  // ==========================================================

  useEffect(() => {
    document.title = `Hooks | Count: ${count}`;
  }, [count]);

  // ==========================================================
  // useMemo
  // ==========================================================

  const doubledNumber = useMemo(() => {
    return number * 2;
  }, [number]);

  // ==========================================================
  // useRef
  // ==========================================================

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // ==========================================================
  // useReducer
  // ==========================================================

  const [state, dispatch] = useReducer(reducer, initialState);

  // ==========================================================
  // useCallback
  // ==========================================================

  const handleIncrement = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);

  // ==========================================================
  // RETURN / UI
  // ==========================================================

  return (
    <ThemeContext.Provider value={themeValue}>
      <div className="app-container">
        <h1>React Hooks Explorer</h1>

        <div className="grid-container">

          {/* ==================================================
              useState + useEffect
              ================================================== */}

          <div className="hook-card">
            <h2>useState & useEffect</h2>

            <p>
              Count:{" "}
              <strong style={{ color: "#fff" }}>
                {count}
              </strong>
            </p>

            <div>
              <button onClick={handleIncrement}>
                Increase Count
              </button>

              <button onClick={() => setCount(count - 1)}>
                Decrease Count
              </button>
            </div>
          </div>

          {/* ==================================================
              useMemo
              ================================================== */}

          <div className="hook-card">
            <h2>useMemo</h2>

            <p>
              Number:{" "}
              <strong style={{ color: "#fff" }}>
                {number}
              </strong>{" "}
              | Doubled:{" "}
              <strong style={{ color: "#fff" }}>
                {doubledNumber}
              </strong>
            </p>

            <div>
              <button onClick={() => setNumber(number + 1)}>
                Increase Number
              </button>
            </div>
          </div>

          {/* ==================================================
              useRef
              ================================================== */}

          <div className="hook-card">
            <h2>useRef</h2>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Focus me programmatically!"
              />

              <button
                onClick={focusInput}
                style={{ alignSelf: "flex-start" }}
              >
                Focus Input
              </button>
            </div>
          </div>

          {/* ==================================================
              useContext
              ================================================== */}

          <div className="hook-card">
            <h2>useContext</h2>

            <ThemeDisplay />

            <div>
              <button
                onClick={() =>
                  setThemeValue(
                    themeValue === "dark" ? "light" : "dark"
                  )
                }
              >
                Toggle Theme
              </button>
            </div>
          </div>

          {/* ==================================================
              useReducer
              ================================================== */}

          <div className="hook-card">
            <h2>useReducer</h2>

            <p>
              Reducer Count:{" "}
              <strong style={{ color: "#fff" }}>
                {state.count}
              </strong>
            </p>

            <div>
              <button
                onClick={() =>
                  dispatch({ type: "increment" })
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  dispatch({ type: "decrement" })
                }
              >
                -
              </button>
            </div>
          </div>

        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;