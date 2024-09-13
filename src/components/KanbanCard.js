import React from "react";
import "./KanbanCard.css";
import img from "../images/leetcodee.png";
import featureImg from "../images/Done.svg"; // Add an image for the tags if needed

const KanbanCard = ({ ticket, users, groupBy }) => {
  const priorityLabels = ["No Priority", "Low", "Medium", "High", "Urgent"];
  const user = users.find(user => user.id === ticket.userId);
  const truncateTitle = (title) => {
    const words = title.split(" ");
    if (words.length > 8) {
      return words.slice(0, 8).join(" ") + "...";
    }
    return title;
  };
  return (
    <div className="kanban-card">
      {groupBy === "user" ? (
        <>
          <div className="kanban-card-header">
            <h3>{ticket.id}</h3>
          </div>
          <div className="kanban-card-title">
             <h3>{truncateTitle(ticket.title)}</h3>
          </div>
          <div className="kanban-card-body">
            <img src={featureImg} alt="Ticket" className="kanban-card-image" />
            <div className="kanban-card-details">
            
             <img src={featureImg} alt="Tag" className="kanban-card-tag-image" />
              <p>{ticket.tag.join(", ")}</p>            </div>
          </div>
        </>
      ) : (
        <>
          <div className="kanban-card-header">
            <h3>{ticket.id}</h3>
            <img src={featureImg} alt="Ticket" />
          </div>
          <div className="kanban-card-body">
            <h3>{ticket.title}</h3>
            {/* <p>User: {user ? user.name : "Unknown User"}</p> */}
            <p>Status: {ticket.status}</p>
            <p>Priority: {priorityLabels[ticket.priority]}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default KanbanCard;
