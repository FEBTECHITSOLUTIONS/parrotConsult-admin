import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiList,
  FiXCircle,
  FiBookOpen,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Card from "../components/dashboard/Card"; // adjust the import path as needed
import { getDashboardStatsData } from "../api/AdminApis"; // Adjust import path

const initialCardData = [
  { label: "Pending Application", icon: <FiList />, path: "/pending-applications", value: 0 },
  { label: "Rejected Application", icon: <FiXCircle />, path: "/rejected-applications", value: 0 },
  { label: "All Booking", icon: <FiBookOpen />, path: "/all-booking", value: 0 },
  { label: "All Consultants", icon: <FiUserCheck />, path: "/all-consultants", value: 0 },
  { label: "All Users", icon: <FiUsers />, path: "/all-users", value: 0 },
];

const Dashboard = () => {
  const [cardData, setCardData] = useState(initialCardData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      try {
        const data = await getDashboardStatsData();
        // Map response data to cardData values
        setCardData((cards) =>
          cards.map((card) => {
            let val = 0;
            switch (card.label) {
              case "Pending Application":
                val = data.PendingApplication || 0;
                break;
              case "Rejected Application":
                val = data.RejectedApplication || 0;
                break;
              case "All Booking":
                val = data.AllBooking || 0;
                break;
              case "All Consultants":
                val = data.AllConsultants || 0;
                break;
              case "All Users":
                val = data.AllUser || 0;
                break;
            }
            return { ...card, value: val };
          })
        );
      } catch (e) {
        console.error("Failed to fetch dashboard stats:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  const handleCardClick = (path) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 py-10 px-4 rounded-2xl shadow-xl shadow-black/70">
      <h1 className="text-3xl font-bold text-center text-white mb-10">Admin Dashboard</h1>
      {loading ? (
        <p className="text-white text-center text-lg">Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardData.map((card) => (
            <Card key={card.label} {...card} onClick={handleCardClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
