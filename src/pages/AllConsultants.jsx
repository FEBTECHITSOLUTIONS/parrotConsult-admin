import React, { useState, useEffect } from "react";
import { getAllUser } from "../api/AdminApis"; // Adjust import path
import { FaRegCircleUser } from "react-icons/fa6";

const AllConsultants = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch consultants on mount
  useEffect(() => {
    async function fetchConsultants() {
      setLoading(true);
      try {
        const data = await getAllUser("consultant");
        if (Array.isArray(data)) {
          setConsultants(data);
        } else {
          setConsultants([]);
          console.error("Invalid consultants data:", data);
        }
      } catch (error) {
        setConsultants([]);
        console.error("Failed to fetch consultants:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchConsultants();
  }, []);

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white">
      <div className="max-w-7xl mx-auto ">
        <h1 className="text-3xl font-bold mb-8">All Consultants</h1>

        {loading ? (
          <p className="text-lg">Loading consultants...</p>
        ) : consultants.length === 0 ? (
          <p className="text-lg">No consultants found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {consultants.map((consultant) => (
              <ConsultantCard key={consultant._id} consultant={consultant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ConsultantCard = ({ consultant }) => {
  const photoUrl = consultant.profileImage;

  return (
    <div className="bg-white/20 backdrop-blur-3xl rounded-xl p-4 flex flex-wrap items-center gap-4 shadow-md shadow-white/20 border border-white">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${consultant.fullName}'s profile`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <FaRegCircleUser className="w-12 h-12 sm:w-16 sm:h-16 text-white flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <h2 className="text-base sm:text-lg font-semibold truncate">{consultant.fullName}</h2>
        <p className="text-xs sm:text-sm truncate">{consultant.email || "Not Available"}</p>
        <p className="text-xs sm:text-sm font-mono">{consultant.phone}</p>
        <p className="text-xs sm:text-sm truncate">{consultant.location || "Not Available"}</p>
      </div>
    </div>
  );
};

export default AllConsultants;
