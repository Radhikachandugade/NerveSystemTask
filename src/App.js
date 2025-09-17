import "./App.css";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
const dateArray = [
  "24 Apr 2024",
  "02 May 2024",
  "09 May 2024",
  "31 May 2024",
  "21 Jun 2024",
];

const strategyArray = [
  {
    View: "Bullish",
    Value: {
      "24 Apr 2024": [
        "Bull Call Spread",
        "Bull Put Spread",
        "Bull Put Spread",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Bull Call Spread",
      ],
      "02 May 2024": [
        "Bull Call Spread",
        "Bull Call Spread",
        "Bull Put Spread",
        "Long Call",
        "Long Call",
        "Long Call",
        "Bull Put Spread",
        "Bull Call Spread",
        "Strategy1",
        "Bull Call Spread",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Bull Call Spread",
      ],
      "09 May 2024": [
        "Strategy Put",
        "Strategy Call",
        "Strategy Call",
        "Strategy Call",
        "Strategy Put",
      ],
    },
  },
  {
    View: "Bearish",
    Value: {
      "24 Apr 2024": [
        "Bear Call Spread",
        "Bear Call Spread",
        "Bear Call Spread",
        "Long Put",
        "Long Put",
        "Long Put",
        "Bear Call Spread",
      ],
      "31 May 2024": [
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
        "Long Put",
      ],
      "21 Jun 2024": [
        "Strategy3",
        "Strategy3",
        "Bear Put Spread",
        "Strategy3",
        "Long Put",
        "Long Put",
      ],
    },
  },
  {
    View: "RangeBound",
    Value: {
      "24 Apr 2024": [
        "Short Straddle",
        "Short Strangle",
        "Short Strangle",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy1",
        "Strategy1",
        "SpreadStrategy",
        "Short Straddle",
      ],
      "02 May 2024": [
        "Short Straddle",
        "Short Straddle",
        "Short Strangle",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Short Strangle",
        "Short Straddle",
        "Strategy1",
        "Short Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Short Straddle",
      ],
      "21 Jun 2024": [
        "Iron Condor",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Butterfly",
        "Iron Condor",
      ],
    },
  },
  {
    View: "Volatile",
    Value: {
      "02 May 2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy1",
        "Strategy1",
        "Spread-Strategy",
        "Long Straddle",
      ],
      "09 May 2024": [
        "Long Straddle",
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
        "Strategy1",
        "Long Straddle",
        "Strategy2",
        "Strategy1",
        "Strategy2",
        "Long Straddle",
      ],
      "31 May 2024": [
        "Long Straddle",
        "Long Strangle",
        "Long Strangle",
        "Long Strangle",
        "Long Straddle",
      ],
    },
  },
];
export default function App() {
  const [selectedView, setSelectedView] = useState("Bullish");
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [open, setOpen] = useState(false);

  // Find strategies for selected view + date
  const currentView = strategyArray.find((v) => v.View === selectedView);
  const strategies = currentView?.Value[selectedDate] || [];

  // Count occurrences
  const strategyCount = strategies.reduce((acc, s) => {
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="container">
      {/* Toggle Views */}
      <div className="toggle">
        {["Bullish", "Bearish", "RangeBound", "Volatile"].map((view) => (
          <button
            key={view}
            className={selectedView === view ? "active" : ""}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>

      {/* Date Dropdown */}
      <div className="date-dropdown">
        <div className="date-dropdown-selected" onClick={() => setOpen(!open)}>
          {selectedDate}
          <span className="material-symbols-outlined">
            {open ? (
              <IoIosArrowUp color="#004cff" size="20px" />
            ) : (
              <IoIosArrowDown color="#004cff" size="20px" />
            )}
          </span>
        </div>

        {open && (
          <div className="date-dropdown-list">
            {dateArray.map((date) => (
              <div
                key={date}
                className={`date-dropdown-item ${
                  selectedDate === date ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedDate(date);
                  setOpen(false);
                }}
              >
                {date}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Strategy Cards */}
      <div className="cards">
        {strategies.length > 0 ? (
          Object.entries(strategyCount).map(([name, count]) => (
            <div key={name} className="card">
              <h3>{name}</h3>
              <p>
                <span className="dot">•</span>
                {count} {count > 1 ? "Strategies" : "Strategy"}
              </p>
            </div>
          ))
        ) : (
          <div className="empty">
            No strategies available for <br />
            <b>{selectedDate}</b>
          </div>
        )}
      </div>
    </div>
  );
}
