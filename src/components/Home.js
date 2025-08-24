import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center">
            <h1 className="display-4 mb-4">Welcome to EDI Student Track</h1>
            <p className="lead text-muted">
              A comprehensive student tracking and management system for educational institutions.
            </p>
          </div>
          
          <div className="row mt-5">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Student Management</h5>
                  <p className="card-text">
                    Track student progress, attendance, and academic performance.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Course Tracking</h5>
                  <p className="card-text">
                    Monitor course enrollment, completion rates, and outcomes.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body text-center">
                  <h5 className="card-title">Analytics</h5>
                  <p className="card-text">
                    Generate reports and insights from student data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
