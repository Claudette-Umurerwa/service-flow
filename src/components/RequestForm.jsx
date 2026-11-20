
import { useState } from "react";

function RequestForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requester: "",
    department: "",
    category: "",
    priority: "Medium",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newRequest = {
      ...formData,
      id: Date.now(),
      status: "Open",
      assignedTo: "Not assigned",
      createdAt: new Date().toISOString().split("T")[0],
    };

    onSubmit(newRequest);
  }

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Request Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter request title"
          required
        />
      </div>

      <div className="form-group">
        <label>Requester Name</label>
        <input
          name="requester"
          value={formData.requester}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select department</option>
            <option>Finance</option>
            <option>Administration</option>
            <option>Human Resources</option>
            <option>Operations</option>
            <option>Information Technology</option>
          </select>
        </div>

        <div className="form-group">
          <label>Request Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select category</option>
            <option>IT Support</option>
            <option>Office Supplies</option>
            <option>HR Services</option>
            <option>Maintenance</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Priority</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Explain what assistance you need..."
          rows="5"
          required
        />
      </div>

      <button type="submit" className="primary-button">
        Submit Request
      </button>
    </form>
  );
}

export default RequestForm;
