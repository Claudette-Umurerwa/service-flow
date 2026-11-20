
import { Link } from "react-router-dom";
import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import RequestCard from "../components/RequestCard";

function Dashboard({ requests }) {
  const total = requests.length;
  const open = requests.filter((item) => item.status === "Open").length;
  const inProgress = requests.filter(
    (item) => item.status === "In Progress"
  ).length;
  const resolved = requests.filter(
    (item) => item.status === "Resolved"
  ).length;

  const stats = [
    { title: "Total Requests", value: total, icon: ClipboardList },
    { title: "Open Requests", value: open, icon: Clock3 },
    { title: "In Progress", value: inProgress, icon: LoaderCircle },
    { title: "Resolved", value: resolved, icon: CheckCircle2 },
  ];

  const recentRequests = [...requests]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3);

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Dashboard</h1>
          <p>Welcome to your business service management workspace.</p>
        </div>

        <Link to="/create" className="primary-button">
          + Create Request
        </Link>
      </div>

      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div className="stat-card" key={stat.title}>
              <div className="stat-icon">
                <Icon size={22} />
              </div>
              <p>{stat.title}</p>
              <h2>{stat.value}</h2>
            </div>
          );
        })}
      </div>

      <div className="section-heading">
        <div>
          <h2>Recent Requests</h2>
          <p>Keep track of the latest service requests.</p>
        </div>

        <Link to="/requests" className="text-link">
          View all <ArrowRight size={16} />
        </Link>
      </div>

      {recentRequests.length > 0 ? (
        <div className="request-grid">
          {recentRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="empty-state">No requests available yet.</div>
      )}
    </div>
  );
}

export default Dashboard;
