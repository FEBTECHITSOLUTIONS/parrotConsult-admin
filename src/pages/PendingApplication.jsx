import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiRefreshCcw,
  FiSearch,
  FiFilter,
  FiX,
} from "react-icons/fi";
import ConsultantCard from "../components/pendingConsultant/ConsultantCard";
import {
  adminapproveconsultant,
  adminrejectconsultant,
  getallunapprovedconsultants,
} from "../api/AdminApis.js";

const PendingApplications = () => {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openCardId, setOpenCardId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  const fetchConsultants = async () => {
    setLoading(true);
    try {
      const data = await getallunapprovedconsultants();
      const consultantList = Array.isArray(data) ? data : data.consultants || [];
      setConsultants(consultantList);
      setOpenCardId(null);
    } catch (error) {
      alert("Failed to fetch consultants");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConsultants();
  }, []);

  const categories = [
    ...new Set(
      consultants
        .filter((c) => c.consultantRequest?.status === "pending")
        .map((c) => c.consultantRequest?.consultantProfile?.category)
        .filter(Boolean)
    ),
  ];

  const filteredConsultants = consultants
    .filter((c) => c.consultantRequest?.status === "pending")
    .filter((consultant) => {
      const matchesSearch =
        searchTerm === "" ||
        consultant.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultant.consultantRequest?.consultantProfile?.category
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        filterCategory === "" ||
        consultant.consultantRequest?.consultantProfile?.category === filterCategory;
      return matchesSearch && matchesCategory;
    });

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("");
    setShowSearch(false);
    setShowFilter(false);
  };

  const handleApprove = async (consultantId) => {
    try {
      setLoading(true);
      const response = await adminapproveconsultant(consultantId);
      setConsultants((prev) => prev.filter((c) => c._id !== consultantId));
      showNotification(response.message || "Consultant approved successfully");
    } catch (error) {
      console.error("Error approving consultant:", error);
      showNotification(error.message || "Failed to approve consultant", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (consultantId) => {
    try {
      setLoading(true);
      const response = await adminrejectconsultant(consultantId);
      setConsultants((prev) => prev.filter((c) => c._id !== consultantId));
      showNotification(response.message || "Consultant rejected successfully");
    } catch (error) {
      console.error("Error rejecting consultant:", error);
      showNotification(error.message || "Failed to reject consultant", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full rounded-2xl bg-gradient-to-br from-black via-gray-900 to-slate-900 p-6 shadow-xl shadow-black/70 ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
                <FiUsers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Pending Applications</h1>
                <p className="text-green-400 text-sm font-medium">
                  {filteredConsultants.length} of {consultants.filter(c => c.consultantRequest?.status === "pending").length} applications
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setShowSearch(!showSearch);
                  if (!showSearch) setShowFilter(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showSearch ? 'bg-blue-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <FiSearch className="w-4 h-4" />
                Search
              </button>
              <button
                onClick={() => {
                  setShowFilter(!showFilter);
                  if (!showFilter) setShowSearch(false);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showFilter ? 'bg-purple-600 text-white' : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <FiFilter className="w-4 h-4" />
                Filter
              </button>
              {(searchTerm || filterCategory) && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                >
                  <FiX className="w-4 h-4" />
                  Clear
                </button>
              )}
              <button
                onClick={fetchConsultants}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-blue-700 font-medium text-white hover:from-green-700 hover:to-blue-800 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <FiRefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? 'Loading...' : 'Refresh'}
              </button>
            </div>
          </div>
          {showSearch && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="max-w-md">
                <input
                  type="text"
                  placeholder="Search by name, email, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:bg-white/30 focus:border-white/50 focus:outline-none transition-colors"
                  autoFocus
                />
              </div>
            </div>
          )}
          {showFilter && (
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="max-w-md">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white focus:bg-white/30 focus:border-white/50 focus:outline-none transition-colors"
                >
                  <option value="" className="bg-gray-800 text-white">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category} className="bg-gray-800 text-white">{category}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
        {(searchTerm || filterCategory) && (
          <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-3">
            <p className="text-blue-200 text-sm">
              {filteredConsultants.length === 0
                ? 'No results found'
                : `Showing ${filteredConsultants.length} result${filteredConsultants.length !== 1 ? 's' : ''}`}
              {searchTerm && ` for "${searchTerm}"`}
              {filterCategory && ` in "${filterCategory}"`}
            </p>
          </div>
        )}
        <div>
          {filteredConsultants.length === 0 ? (
            <div className="text-center text-gray-300 bg-white/10 p-8 rounded-xl">
              <FiUsers className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-lg font-medium">
                {(searchTerm || filterCategory) ? 'No applications match your criteria' : 'No pending applications available'}
              </p>
              {(searchTerm || filterCategory) && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-blue-400 hover:text-blue-300 font-medium"
                >
                  Clear filters to see all applications
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {filteredConsultants.map((consultant) => (
                <ConsultantCard
                  key={consultant._id}
                  consultant={consultant}
                  onApprove={handleApprove}
                  onReject={handleReject}
                  loading={loading}
                  isOpen={openCardId === consultant._id}
                  onToggle={() => setOpenCardId(openCardId === consultant._id ? null : consultant._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PendingApplications;
