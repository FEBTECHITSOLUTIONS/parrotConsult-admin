import React, { useState } from "react";

const Settings = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: true,
    emailNotifications: true,
    smsNotifications: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, checked } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add save logic here, e.g. API call
    alert("Settings saved!");
  };

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Profile Info */}
        <section>
          <h2 className="text-xl mb-4 font-semibold border-b border-gray-600 pb-2">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <label className="flex flex-col">
              Full Name
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
                className="mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="Your full name"
                required
              />
            </label>
            <label className="flex flex-col">
              Email Address
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="flex flex-col">
              Phone Number
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                className="mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="+91 12345 67890"
              />
            </label>
            <label className="flex flex-col">
              Location
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleProfileChange}
                className="mt-1 p-2 rounded bg-gray-700 border border-gray-600 text-white"
                placeholder="City, Country"
              />
            </label>
          </div>
        </section>

        {/* Preferences Section */}
        <section>
          <h2 className="text-xl mb-4 font-semibold border-b border-gray-600 pb-2">Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferenceChange}
                className="rounded border-gray-600 bg-gray-700 checked:bg-green-500"
              />
              Enable Dark Mode
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange}
                className="rounded border-gray-600 bg-gray-700 checked:bg-green-500"
              />
              Email Notifications
            </label>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={preferences.smsNotifications}
                onChange={handlePreferenceChange}
                className="rounded border-gray-600 bg-gray-700 checked:bg-green-500"
              />
              SMS Notifications
            </label>
          </div>
        </section>

        {/* Save Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 transition text-white px-8 py-3 rounded shadow-lg font-semibold"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
