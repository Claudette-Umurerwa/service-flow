
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import StatusBadge from "../components/StatusBadge";
import PriorityBadge from "../components/PriorityBadge";
import { useEffect } from "react";

function RequestDetails({ requests, updateRequest, deleteRequest }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const request = requests.find((item) => item.id === Number(id));

  useEffect(() => {
  if (request && request.read === false) {
    updateRequest(request.id, {
      read: true,
    });
  }
}, [request?.id, request?.read, updateRequest]);

  if (!request) {
    return (
      <div className="page-content">
        <h1>Request not found</h1>
        <button className="primary-button" onClick={() => navigate("/requests")}>
          Back to Requests
        </button>
      </div>
    );
  }

  function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request?"
    );

    if (confirmed) {
      deleteRequest(request.id);
      navigate("/requests");
    }
  }

  return (
    <div className="page-content">
      <button className="back-button" onClick={() => navigate("/requests")}>
        <ArrowLeft size={17} /> Back to Requests
      </button>

      <div className="page-heading">
        <div>
          <p className="eyebrow">REQUEST DETAILS · REQ-{request.id}</p>
          <h1>{request.title}</h1>
          <p>Review and manage this service request.</p>
        </div>

        <button className="delete-button" onClick={handleDelete}>
          <Trash2 size={17} /> Delete Request
        </button>
      </div>

      <div className="details-layout">
        <section className="details-card">
          <h2>Request Information</h2>

          <div className="detail-item">
            <span>Description</span>
            <p>{request.description}</p>
          </div>

          <div className="detail-columns">
            <div className="detail-item">
              <span>Requester</span>
              <p>{request.requester}</p>
            </div>

            <div className="detail-item">
              <span>Department</span>
              <p>{request.department}</p>
            </div>

            <div className="detail-item">
              <span>Category</span>
              <p>{request.category}</p>
            </div>

            <div className="detail-item">
              <span>Date Created</span>
              <p>{request.createdAt}</p>
            </div>
          </div>

          <div className="detail-item">
            <span>Priority</span>
            <PriorityBadge priority={request.priority} />
          </div>

          <div className="detail-item">
            <span>Current Status</span>
            <StatusBadge status={request.status} />
          </div>
        </section>

        <section className="details-card management-card">
          <h2>Manage Request</h2>

          <div className="form-group">
            <label>Update Status</label>
            <select
              value={request.status}
              onChange={(event) =>
                updateRequest(request.id, { status: event.target.value })
              }
            >
              <option>Open</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>
          </div>

          <div className="form-group">
            <label>Assign Staff Member</label>
            <select
              value={request.assignedTo}
              onChange={(event) =>
                updateRequest(request.id, { assignedTo: event.target.value })
              }
            >
              <option>Not assigned</option>
              <option>Eric Niyonzima</option>
              <option>Diane Uwera</option>
              <option>Samuel Mugisha</option>
              <option>Beatrice Uwimana</option>
            </select>
          </div>

          <p className="management-note">
          .
          </p>
        </section>
      </div>
    </div>
  );
}

export default RequestDetails;
