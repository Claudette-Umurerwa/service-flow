
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

function RequestCard({ request }) {
  return (
    <Link to={`/requests/${request.id}`} className="request-card">
      <div className="request-card-top">
        <span className="request-id">REQ-{request.id}</span>
        <ArrowUpRight size={18} />
      </div>

      <h3>{request.title}</h3>
      <p>{request.description}</p>

      <div className="request-card-badges">
        <StatusBadge status={request.status} />
        <PriorityBadge priority={request.priority} />
      </div>

      <div className="request-card-bottom">
        <span>{request.requester}</span>
        <span>{request.department}</span>
      </div>
    </Link>
  );
}

export default RequestCard;
