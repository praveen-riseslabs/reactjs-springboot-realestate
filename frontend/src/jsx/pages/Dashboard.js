import React from 'react';
import Header from '../layouts/nav/Header';
import SideBar from '../layouts/nav/SideBar';
import Home from '../components/Dashboard/Home';
import './Dashboard.scss';

export default function Dashboard() {
  return (
    <div>
      <Header />
      <div className="dashboard-container">
        <div className="sidebar-container">
          <SideBar />
        </div>
        <div className="home-container">
          <Home />
        </div>
      </div>
    </div>
  );
}
