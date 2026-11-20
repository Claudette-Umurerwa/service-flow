
import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import useDebounce from "../hooks/useDebounce";
import RequestCard from "../components/RequestCard";

function Requests({ requests }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [searchParams] = useSearchParams();

  // Check whether the user clicked the notification bell
  const showUnreadOnly = searchParams.get("filter") === "unread";

  const debouncedSearch = useDebounce(search, 500);

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      request.requester.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      request.department.toLowerCase().includes(debouncedSearch.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || request.status === statusFilter;

    const matchesUnread =
      !showUnreadOnly || request.read === false;

    return matchesSearch && matchesStatus && matchesUnread;
  });

  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGEMENT</p>

          <h1>
            {showUnreadOnly ? "Unread Requests" : "All Requests"}
          </h1>

          <p>
            {showUnreadOnly
              ? "Review your new and unread service requests."
              : "Search, filter and manage business service requests."}
          </p>
        </div>

        <Link to="/create" className="primary-button">
          <Plus size={18} /> New Request
        </Link>
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search requests, names or departments..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
        >
          <option>All</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      <p className="results-count">
        Showing {filteredRequests.length} request(s)
      </p>

      {filteredRequests.length > 0 ? (
        <div className="request-grid">
          {filteredRequests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          {showUnreadOnly
            ? "You have no unread requests."
            : "No requests match your search."}
        </div>
      )}
    </div>
  );
}

export default Requests;

