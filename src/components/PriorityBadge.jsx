
function PriorityBadge({ priority }) {
  return (
    <span className={`priority-badge ${priority.toLowerCase()}`}>
      {priority} Priority
    </span>
  );
}

export default PriorityBadge;
