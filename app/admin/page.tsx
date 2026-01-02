"use client";
import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="icon-box icon-purple">
           <i className="fas fa-chalkboard-teacher"></i>
        </div>
        <div className="stat-info">
          <span>Total Teachers</span>
          <h3>12</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-box icon-blue">
           <i className="fas fa-images"></i>
        </div>
        <div className="stat-info">
          <span>Gallery Images</span>
          <h3>48</h3>
        </div>
      </div>

      <div className="stat-card">
        <div className="icon-box icon-green">
           <i className="fas fa-bullhorn"></i>
        </div>
        <div className="stat-info">
          <span>Active Notice</span>
          <h3>Enabled</h3>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <p>No recent activity.</p>
      </div>

      <style jsx>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 24px;
        }

        .stat-card {
          background: #fff;
          padding: 24px;
          border-radius: 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0,0,0,0.02);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0px 20px 40px rgba(112, 144, 176, 0.12);
        }

        .icon-box {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          transition: all 0.3s ease;
        }

        .stat-card:hover .icon-box {
          transform: scale(1.1);
        }

        .icon-purple { background: #f5f5f5; color: #000000; }
        .icon-blue { background: #f5f5f5; color: #000000; }
        .icon-green { background: #f5f5f5; color: #000000; }

        .stat-info span {
          color: #A3AED0;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 5px;
          display: block;
        }

        .stat-info h3 {
          margin: 0;
          color: #2B3674;
          font-size: 32px;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .recent-activity {
          grid-column: 1 / -1;
          background: white;
          padding: 32px;
          border-radius: 24px;
          margin-top: 10px;
          box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.02);
          border: 1px solid rgba(0,0,0,0.02);
        }
        
        .recent-activity h3 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #2B3674;
          font-size: 20px;
          font-weight: 700;
        }

        .recent-activity p {
          color: #A3AED0;
        }
      `}</style>
    </div>
  );
}
