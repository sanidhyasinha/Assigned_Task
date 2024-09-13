import React from "react";

const DisplayOptions = ({ onGroupChange, onSortChange }) => {
  return (
    <div className="display-options">
      <label>Group by:</label>
      <select onChange={(e) => onGroupChange(e.target.value)}>
        <option value="status">Status</option>
        <option value="user">User</option>
        <option value="priority">Priority</option>
      </select>

      <label>Sort by:</label>
      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
};

export default DisplayOptions;
