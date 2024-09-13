import React, { useState, useEffect } from "react";
import axios from "axios";
import './KanbanBoard.css';
import KanbanCard from "./KanbanCard";

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState("status");
  const [sortBy, setSortBy] = useState("priority");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.quicksell.co/v1/internal/frontend-assignment");
        setTickets(response.data.tickets);
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const sortedTickets = tickets.sort((a, b) => {
    if (sortBy === "priority") {
      return b.priority - a.priority; // Sort by descending priority
    }
    return a.title.localeCompare(b.title); // Sort alphabetically by title
  });

  // Define all possible group keys based on groupBy selection
  let allGroups;
  if (groupBy === "status") {
    allGroups = ["Backlog", "Todo", "In progress", "Done", "Cancel"];
  } else if (groupBy === "priority") {
    allGroups = [4, 3, 2, 1, 0];
  } else if (groupBy === "user") {
    allGroups = users.map(user => user.name); // Use all user names
  }

  const groupedTickets = sortedTickets.reduce((groups, ticket) => {
    let key;
    switch (groupBy) {
      case "user":
        key = users.find(user => user.id === ticket.userId)?.name || "Unknown User";
        break;
      case "status":
        key = ticket.status;
        break;
      case "priority":
      default:
        key = ticket.priority;
        break;
    }
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(ticket);
    return groups;
  }, {});

  const groupNames = {
    4: "Urgent",
    3: "High",
    2: "Medium",
    1: "Low",
    0: "No Priority",
    "Backlog": "Backlog",
    "To-Do": "To-Do",
    "In Progress": "In Progress",
    "Done": "Done",
    "Cancel": "Cancel",
  };

  return (
    <div className="kanban-board">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div className="controls" style={{ display: "flex", flexDirection: "column" }}>
          <label>
            Group by:
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)}>
              <option value="status">Status</option>
              <option value="priority">Priority</option>
              <option value="user">User</option>
            </select>
          </label>
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </label>
        </div>
      </div>

      <div className="kanban-columns">
        {/* Loop through all possible groups */}
        {allGroups.map((group) => (
          <div key={group} className="kanban-column">
            <h2>{groupNames[group] || group}</h2>
            {/* Display the tickets for this group, if any, or a "No tickets" message */}
            {groupedTickets[group] && groupedTickets[group].length > 0 ? (
              groupedTickets[group].map((ticket) => (
                <KanbanCard key={ticket.id} ticket={ticket} users={users} />
              ))
            ) : (
              <div className="empty-state">No tickets</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
