
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import RequestDetails from "./pages/RequestDetails";
import Departments from "./pages/Departments";

import useRequests from "./hooks/useRequests";
import useWindowWidth from "./hooks/useWindowWidth";
import Footer from "./components/Footer";

function App() {
  const {
    requests,
    addRequest,
    updateRequest,
    deleteRequest,
  } = useRequests();


  const windowWidth = useWindowWidth();
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate unread requests
  const unreadCount = requests.filter(
    request => request.read === false
  ).length;
 

  useEffect(() => {
    if (windowWidth > 760) {
      setMenuOpen(false);
    }
  }, [windowWidth]);

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar
          menuOpen={menuOpen}
          closeMenu={() => setMenuOpen(false)}
        />

        <div className="main-area">
          <Navbar
            openMenu={() => setMenuOpen(true)}
            notificationCount={unreadCount}
          />

          <main>
            <Routes>
              <Route
                path="/"
                element={<Dashboard requests={requests} />}
              />

              <Route
                path="/requests"
                element={<Requests requests={requests} />}
              />

              <Route
                path="/create"
                element={<CreateRequest addRequest={addRequest} />}
              />

              <Route
                path="/requests/:id"
                element={
                  <RequestDetails
                    requests={requests}
                    updateRequest={updateRequest}
                    deleteRequest={deleteRequest}
                  />
                }
              />

              <Route
                path="/departments"
                element={<Departments requests={requests} />}
              />

              <Route
                path="*"
                element={<Dashboard requests={requests} />}
              />
            </Routes>

            <Footer />

          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

