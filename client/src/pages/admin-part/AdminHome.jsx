import React, { useState, useEffect } from 'react';
import NavBar from '../admin-part/SideBar';
import { Outlet } from 'react-router-dom';

const AdminHome = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading content (e.g., fetching data from API)
    setTimeout(() => {
      setLoading(false); // Stop loading after 2 seconds
    }, 2000);
  }, []);

  return (
    <div className="container-fluid">
      {/* NavBar */}
      <NavBar />

      <div className="row mt-4">
        {/* Main Content */}
        <div className="col-12">
          <div className="">
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
                <div className="spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
