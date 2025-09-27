import React, { useEffect, useState } from "react";
import { adminSeeAllBookings } from "../api/AdminApis"; // Adjust the import path

const AllBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        const data = await adminSeeAllBookings();
        console.log(data);
        
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          setBookings([]);
          console.error("Invalid booking data:", data);
        }
      } catch (error) {
        setBookings([]);
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Bookings</h1>
        {loading ? (
          <p className="text-lg">Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p className="text-lg">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BookingCard = ({ booking }) => {
  // Consultant details
  const consultant = booking.consultant;
  const consultantName = consultant?.fullName || "Unknown";
  const consultantPic = consultant?.profileImage || "/user.png";
  const sessionFee = consultant?.consultantRequest?.consultantProfile?.sessionFee;
  const availableTime = consultant?.consultantRequest?.consultantProfile?.availableTimePerDay;

  // User details
  const user = booking.user;
  const userName = user?.fullName || "Unknown";
  const userEmail = user?.email || "Unknown";
  const userPic = user?.profileImage || "/user.png";

  return (
    <div className="bg-white/20 backdrop-blur-xl rounded-xl p-4 flex flex-col gap-3 shadow-md shadow-white/20 border border-white">
      <div className="flex items-center gap-3 mb-1">
        <img src={consultantPic} alt="Consultant" className="w-10 h-10 rounded-full object-cover" />
        <span className="font-bold text-white truncate">{consultantName}</span>
        <span className="ml-auto text-xs bg-green-600 text-white px-2 py-1 rounded">{sessionFee ? `₹${sessionFee}` : ""}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <img src={userPic} alt="User" className="w-8 h-8 rounded-full object-cover" />
        <span className="font-medium text-white">{userName}</span>
        <span className="text-xs text-gray-200">{userEmail}</span>
      </div>
      <div className="text-sm text-gray-200">
        <b>Detail:</b> {booking.consultationDetail}
      </div>
      <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-200">
        <span>
          <b>Status:</b>
          <span className={`ml-1 px-2 py-1 rounded ${booking.status === 'scheduled' ? "bg-green-500 text-white" : "bg-gray-600 text-white"}`}>
            {booking.status}
          </span>
        </span>
        <span><b>Duration:</b> {booking.duration} min</span>
        <span><b>Time:</b> {availableTime}</span>
        <span><b>Date:</b> {new Date(booking.bookingDateTime).toLocaleDateString()}</span>
      </div>
      <div className="mt-2">
        <a href={booking.meetingLink} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
          Meeting Link
        </a>
      </div>
    </div>
  );
};


export default AllBooking;
