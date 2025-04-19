import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import StatCard from './components/StatCard';
import ActivityChart from './components/ActivityChart';
import RecentActivity from './components/RecentActivity';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);

  // Redirect to permissions page if on the dashboard root
  useEffect(() => {
    if (location.pathname === '/dasboard') {
      navigate('/dasboard/permissions');
    }
    setMounted(true);
  }, [location.pathname, navigate]);

  if (!mounted) return null;

  return (
    <div className="flex h-screen bg-[#FBFBFB] overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto p-6">
          {/* If we're on a nested route, show that route's component */}
          {location.pathname !== '/dasboard' ? (
            <Outlet />
          ) : (
            /* Dashboard Overview - shown when on the dashboard root */
            <div className="space-y-6">
              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                  title="Total Users" 
                  value="2,543" 
                  change="+12.5%" 
                  icon="users" 
                  color="from-[#9B65FF] to-indigo-400"
                />
                <StatCard 
                  title="Active Sessions" 
                  value="1,873" 
                  change="+8.2%" 
                  icon="activity" 
                  color="from-[#F2613F] to-orange-300"
                />
                <StatCard 
                  title="Completion Rate" 
                  value="92.6%" 
                  change="+3.1%" 
                  icon="pie-chart" 
                  color="from-emerald-500 to-teal-300"
                />
                <StatCard 
                  title="Total Revenue" 
                  value="$12,426" 
                  change="+18.3%" 
                  icon="dollar-sign" 
                  color="from-blue-500 to-cyan-300"
                />
              </div>
              
              {/* Charts and Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Activity Overview</h2>
                  <ActivityChart />
                </div>
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                  <RecentActivity />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
