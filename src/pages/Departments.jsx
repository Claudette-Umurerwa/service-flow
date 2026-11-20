
import { Building2 } from "lucide-react";

function Departments({ requests }) {
  const departments = [
    "Finance",
    "Administration",
    "Human Resources",
    "Operations",
    "Information Technology",
  ];

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">ORGANIZATION</p>
          <h1>Departments</h1>
          <p>Overview of service requests across departments.</p>
        </div>
      </div>

      <div className="department-grid">
        {departments.map((department) => {
          const departmentRequests = requests.filter(
            (request) => request.department === department
          );

          const resolved = departmentRequests.filter(
            (request) => request.status === "Resolved"
          ).length;

          return (
            <div className="department-card" key={department}>
              <div className="department-icon">
                <Building2 size={23} />
              </div>

              <h3>{department}</h3>
              <p>{departmentRequests.length} total requests</p>

              <div className="department-footer">
                <span>Resolved</span>
                <strong>{resolved}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Departments;
