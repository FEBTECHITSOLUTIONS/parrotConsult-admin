import React, { useState } from "react";

const SendNotification = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);
    setError(null);
    try {
      // TODO: Replace with actual API call to send notification
      console.log("Sending notification:", { title, message });
      await new Promise((r) => setTimeout(r, 1500)); // Simulate async
      setSuccess("Notification sent successfully");
      setTitle("");
      setMessage("");
    } catch (err) {
      setError("Failed to send notification");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 max-w-3xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Send Notification</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <label className="flex flex-col">
          <span className="mb-2 font-semibold">Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={sending}
            required
            placeholder="Enter notification title"
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-2 font-semibold">Message</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={sending}
            required
            placeholder="Enter your notification message"
            rows={5}
            className="p-3 rounded bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-green-500 resize-none"
          />
        </label>

        <div className="text-center">
          <button
            type="submit"
            disabled={sending}
            className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded font-semibold shadow-md transition disabled:opacity-50"
          >
            {sending ? "Sending..." : "Send Notification"}
          </button>
        </div>
        {success && <p className="text-green-400 mt-4 text-center">{success}</p>}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default SendNotification;
