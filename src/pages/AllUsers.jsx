import React, { useState, useEffect } from "react";
import { getAllUser } from "../api/AdminApis.js"; 
import { FaRegCircleUser } from "react-icons/fa6";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const data = await getAllUser('user');
        if (Array.isArray(data)) {
          const filtered = data.filter((user) => user.role === "user");
          setUsers(filtered);
        } else {
          setUsers([]);
          console.error("Invalid users data:", data);
        }
      } catch (error) {
        setUsers([]);
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Users</h1>
        {loading ? (
          <p className="text-lg">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-lg">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const UserCard = ({ user }) => {
  const photoUrl = user.profileImage;

  return (
    <div className="bg-white/20 backdrop-blur-3xl rounded-xl p-4 flex flex-wrap items-center gap-4 shadow-md shadow-white/20 border border-white">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={`${user.fullName}'s profile`}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
        />
      ) : (
        <FaRegCircleUser className="w-12 h-12 sm:w-16 sm:h-16 text-white flex-shrink-0" />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <h2 className="text-base sm:text-lg font-semibold truncate">{user.fullName}</h2>
         <a href={`mailto:${user.email || ''}`} className="">{user.email || 'Not Available'}</a>
        <a href={`tel:${user.phone}`} className="">{user.phone}</a>
        <p className="text-xs sm:text-sm truncate">Location: {user.location || "Not Available"}</p>
      </div>
    </div>
  );
};

export default AllUsers;
