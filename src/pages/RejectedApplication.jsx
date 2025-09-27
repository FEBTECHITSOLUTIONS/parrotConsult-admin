import React, { useEffect, useState, useRef } from "react";
import { FaFilePdf, FaRegCircleUser } from "react-icons/fa6";
import { adminapproveconsultant, rejectedConsultants } from "../api/AdminApis";
import { FaIdCard } from "react-icons/fa6";
const RejectedApplication = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRejected() {
      setLoading(true);
      try {
        const data = await rejectedConsultants();
        
        setConsultants(Array.isArray(data) ? data : []);
      } catch (error) {
        setConsultants([]);
        console.error("Failed to fetch rejected consultants:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRejected();
  }, []);

  // Stub: Implement these handlers as needed
  const handleApprove = async(consultantId) => {
     try {
          setLoading(true);
          const response = await adminapproveconsultant(consultantId);
          setConsultants((prev) => prev.filter((c) => c._id !== consultantId));
          showNotification(response.message || "Consultant approved successfully");
        } catch (error) {
          console.error("Error approving consultant:", error);
          showNotification(
            error.message || "Failed to approve consultant",
            "error"
          );
        } finally {
          setLoading(false);
        }
  };
  const handleDelete = (id) => {
    console.log("Delete consultant", id);
  };

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Rejected Consultant Applications</h1>
        {loading ? (
          <p className="text-lg">Loading rejected consultants...</p>
        ) : consultants.length === 0 ? (
          <p className="text-lg">No rejected consultants found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {consultants.map((consultant) => (
              <ConsultantCard
                key={consultant._id}
                consultant={consultant}
                onApprove={handleApprove}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ConsultantCard = ({ consultant, onApprove, onDelete }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const dropdownRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const photoUrl = consultant.profileImage;

  return (
    <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 backdrop-blur-3xl rounded-xl p-4 flex flex-col gap-4 shadow-xl shadow-black border border-white relative">
      <div className="flex items-center gap-4">
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

        {/* 3 dots menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="p-2 rounded-full hover:bg-white/20 transition text-white focus:outline-none"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
            aria-label="Options menu"
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <circle cx="10" cy="3" r="2" />
              <circle cx="10" cy="10" r="2" />
              <circle cx="10" cy="17" r="2" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-lg shadow-lg bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 border border-white/30 text-white z-50">
              <button
                onClick={() => {
                  setDetailsOpen(!detailsOpen);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-white/20 transition"
              >
                {detailsOpen ? "Hide Details" : "View Details"}
              </button>
              <button
                onClick={() => {
                  onApprove(consultant._id);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-green-700 transition"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  onDelete(consultant._id);
                  setDropdownOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Details section */}
      {detailsOpen && (
        <div className="bg-white bg-opacity-10 p-4 rounded-lg text-black text-sm space-y-1">
          <div><strong>Address:</strong> {consultant.location || "-"}</div>
          <div><strong>Primary Category:</strong> {consultant.consultantRequest?.consultantProfile?.category || "-"}</div>
          <div><strong>Session Fee:</strong> ₹{consultant.consultantRequest?.consultantProfile?.sessionFee || "-"}</div>
          <div><strong>Years of Experience:</strong> {consultant.consultantRequest?.consultantProfile?.yearsOfExperience || "-"}</div>
          <div><strong>Highest Qualification:</strong> {consultant.consultantRequest?.consultantProfile?.qualification || "-"}</div>
          <div><strong>Field of Study:</strong> {consultant.consultantRequest?.consultantProfile?.fieldOfStudy || "-"}</div>
          <div><strong>Languages:</strong> {(consultant.consultantRequest?.consultantProfile?.languages || consultant.languageProficiency || []).join(", ") || "-"}</div>
          <div><strong>Weekly Availability:</strong> {consultant.consultantRequest?.consultantProfile?.daysPerWeek || "-"}</div>
          <div className="flex items-center gap-2"><strong>Aadhar Card:</strong><a target="_blanck" href={consultant?.kycVerify?.aadharURL}><FaIdCard className=" text-2xl text-green-800"/></a></div>
          <div className="flex items-center gap-2"><strong>Pan Card:</strong><a target="_blanck" href={consultant?.kycVerify?.aadharURL}><FaIdCard className=" text-2xl text-green-800"/></a></div>
          <div className="flex items-center gap-2"><strong>Resume:</strong><a target="_blanck" href={consultant?.consultantRequest?.documents?.resume}><FaFilePdf className=" text-2xl text-green-800"/></a></div>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default RejectedApplication;
