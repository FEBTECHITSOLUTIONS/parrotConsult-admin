import React, { useState, useRef, useEffect } from "react";

const ConsultantCard = ({
  consultant,
  onApprove,
  onReject,
  loading,
  isOpen,
  onToggle,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
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

  return (
    <>
      {/* Main Card */}
      <div className="relative w-[60%] bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 rounded-lg shadow-lg shadow-white/30 border border-white/70 transition-transform hover:scale-[1.02] duration-150 ">
        <div className="p-4 sm:p-5 flex items-center justify-between">
          {/* Info Column */}
          <div className="flex-1 min-w-0 text-white">
            <h3 className="text-base sm:text-lg font-semibold truncate capitalize">
              {consultant?.fullName}
            </h3>
            <div className="text-sm text-gray-200 mt-1 truncate">
              📧 {consultant?.email}
            </div>
            <div className="text-sm text-gray-200 truncate">
              📱 {consultant?.phone}
            </div>
            <div className="mt-1 flex gap-2 text-[10px] sm:text-xs">
              <span className="bg-white/20 rounded px-2 py-0.5 truncate">
                {consultant?.consultantRequest?.consultantProfile?.yearsOfExperience} yrs exp
              </span>
              <span className="bg-white/10 rounded px-2 py-0.5 truncate">
                Applied: {new Date(consultant?.consultantRequest?.requestedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* 3-dot Menu */}
          <div className="relative ml-4" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="Actions menu"
              className="p-2 rounded-full hover:bg-white/20 transition text-white focus:outline-none"
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

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute overflow-visible right-0 mt-2 w-44 rounded-lg shadow-lg bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 border border-white/30 text-white z-50">
                <button
                  onClick={() => {
                    onToggle();
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-white/20 transition"
                  type="button"
                >
                  View Details
                </button>
                <button
                  onClick={() => {
                    onApprove(consultant?._id);
                    setDropdownOpen(false);
                  }}
                  disabled={loading}
                  className="w-full text-left px-4 py-2 hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  Approve
                </button>
                <button
                  onClick={() => {
                    onReject(consultant?._id);
                    setDropdownOpen(false);
                  }}
                  disabled={loading}
                  className="w-full text-left px-4 py-2 hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  type="button"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Details for ${consultant?.fullName}`}
        >
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto focus:outline-none">
            {/* Modal Header */}
            <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white flex justify-between items-center rounded-t-xl">
              <h3 className="text-2xl font-bold truncate">{consultant?.fullName}</h3>
              <button
                onClick={onToggle}
                aria-label="Close details"
                className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                type="button"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 text-gray-900 grid grid-cols-1 md:grid-cols-2 gap-8">
              <DetailSection title="Basic Information">
                <Detail label="Address" value={consultant?.location} />
                <Detail
                  label="Category"
                  value={consultant?.consultantRequest?.consultantProfile?.category}
                />
                <Detail
                  label="Session Fee"
                  value={`₹${consultant?.consultantRequest?.consultantProfile?.sessionFee}`}
                />
                <Detail
                  label="Resume"
                  value={
                    <ExternalLink
                      href={consultant?.consultantRequest?.documents?.resume}
                      label="View Resume"
                    />
                  }
                />
                <Detail
                  label="Aadhar Card"
                  value={
                    <ExternalLink
                      href={consultant?.kycVerify?.aadharURL}
                      label="View Aadhar"
                    />
                  }
                />
                <Detail
                  label="Pan Card"
                  value={
                    <ExternalLink
                      href={consultant?.kycVerify?.panURL}
                      label="View Pan"
                    />
                  }
                />
              </DetailSection>

              <DetailSection title="Professional Details">
                <Detail
                  label="Years of Experience"
                  value={`${consultant?.consultantRequest?.consultantProfile?.yearsOfExperience} years`}
                />
                <Detail
                  label="Highest Qualification"
                  value={consultant?.consultantRequest?.consultantProfile?.qualification}
                />
                <Detail
                  label="Field Of Study"
                  value={consultant?.consultantRequest?.consultantProfile?.fieldOfStudy}
                />
                <Detail label="Languages" value={consultant?.consultantRequest?.consultantProfile?.languages?.join(", ")} />
                <Detail
                  label="Weekly Availability"
                  value={`${consultant?.consultantRequest?.consultantProfile?.daysPerWeek} days`}
                />
                <Detail
                  label="Applied Date"
                  value={new Date(consultant?.consultantRequest?.requestedAt).toLocaleDateString()}
                />
              </DetailSection>

              {consultant?.certificates?.length > 0 && (
                <DetailSection full title="Certificates">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {consultant?.certificates.map((cert, i) => (
                      <a
                        key={i}
                        href={cert.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 hover:border-blue-500 transition text-blue-600 hover:text-blue-800 font-semibold"
                      >
                        {cert.name}
                      </a>
                    ))}
                  </div>
                </DetailSection>
              )}

              {consultant?.education?.length > 0 && (
                <DetailSection full title="Education">
                  <div className="space-y-4">
                    {consultant?.education.map((edu, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-4 rounded-lg border shadow-sm"
                      >
                        <p className="font-semibold text-gray-900 truncate">
                          {edu?.qualification}
                        </p>
                        <p className="text-gray-700 font-medium truncate">
                          {edu?.fieldOfStudy}
                        </p>
                        <p className="text-sm text-gray-600 truncate">
                          {edu?.university}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          Graduated {edu?.graduationYear}
                        </p>
                      </div>
                    ))}
                  </div>
                </DetailSection>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end gap-4 rounded-b-xl">
              <button
                onClick={onToggle}
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-lg font-semibold transition"
                type="button"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onApprove(consultant._id);
                  onToggle();
                }}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
                type="button"
              >
                Approve
              </button>
              <button
                onClick={() => {
                  onReject(consultant._id);
                  onToggle();
                }}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition"
                type="button"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* Small reusable components */

const DetailSection = ({ title, children, full }) => (
  <div className={`${full ? "md:col-span-2" : ""} space-y-4`}>
    <h4 className="text-xl font-bold text-gray-800 border-b border-gray-300 pb-2">{title}</h4>
    {children}
  </div>
);

const Detail = ({ label, value }) => (
  <div className="mb-3">
    <h5 className="font-semibold text-gray-700 text-sm mb-1 truncate">{label}</h5>
    <div className="text-gray-900 truncate">{value ?? "—"}</div>
  </div>
);

const ExternalLink = ({ href, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:text-blue-800 font-medium underline"
  >
    {label}
  </a>
);

export default ConsultantCard;
