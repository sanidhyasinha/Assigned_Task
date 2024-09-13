import React, { useState, useEffect } from "react";
import KanbanBoard from "./components/KanbanBoard";
import DisplayOptions from "./components/DisplayOptions";
import './components/KanbanBoard.css';
import "./App.css";

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupOption, setGroupOption] = useState("status"); // default grouping by status
  const [sortOption, setSortOption] = useState("priority"); // default sorting by priority

  useEffect(() => {
    // Fetch data from API
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => res.json())
      .then((data) => {
        setTickets(data.tickets); // assuming the data comes as tickets array
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Save display options in localStorage
  useEffect(() => {
    const savedGroupOption = localStorage.getItem("groupOption");
    if (savedGroupOption) setGroupOption(savedGroupOption);

    const savedSortOption = localStorage.getItem("sortOption");
    if (savedSortOption) setSortOption(savedSortOption);
  }, []);

  const handleGroupChange = (option) => {
    setGroupOption(option);
    localStorage.setItem("groupOption", option); // Persist in localStorage
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    localStorage.setItem("sortOption", option); // Persist in localStorage
  };

  return (
    <div className="App">
      {/* <h1>Kanban Board</h1> */}
      {/* <DisplayOptions onGroupChange={handleGroupChange} onSortChange={handleSortChange} /> */}
      <KanbanBoard tickets={tickets} groupOption={groupOption} sortOption={sortOption} />
    </div>
  );
};

export default App;
