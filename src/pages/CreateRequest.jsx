
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import RequestForm from "../components/RequestForm";

function CreateRequest({ addRequest }) {
  const navigate = useNavigate();

  function handleCreate(newRequest) {
    const requestWithUnreadStatus = {
      ...newRequest,
      read: false,
    };

    addRequest(requestWithUnreadStatus);
    navigate("/requests");
  }

  return (
    <div className="page-content">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={17} /> Back
      </button>

      <div className="page-heading">
        <div>
          <p className="eyebrow">NEW ENTRY</p>
          <h1>Create a Request</h1>
          <p>Provide the details of the service you need.</p>
        </div>
      </div>

      <div className="form-container">
        <RequestForm onSubmit={handleCreate} />
      </div>
    </div>
  );
}

export default CreateRequest;
