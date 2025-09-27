import React, { useEffect, useState } from "react";
import { getAllsuccessfulPaymentRecords } from "../api/AdminApis"; // Adjust import as needed
import RevenueChart from "../components/revenue/RevenueChart";

const Revenue = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPaymentRecords() {
      setLoading(true);
      try {
        const data = await getAllsuccessfulPaymentRecords();
        setPayments(Array.isArray(data) ? data : []);
      } catch (error) {
        setPayments([]);
        console.error("Failed to fetch payment records:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaymentRecords();
  }, []);

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white flex flex-col gap-14">
      <div className="max-w-full">
        <h1 className="text-3xl font-bold mb-8">Revenue</h1>
        {loading ? (
          <p className="text-lg">Loading revenue records...</p>
        ) : payments.length === 0 ? (
          <p className="text-lg">No records found.</p>
        ) : (
          <div className="overflow-x-auto max-h-[30vh] overflow-y-auto rounded-l-2xl rounded-r-sm px-5 shadow-lg shadow-black/20 border">
            <table className="min-w-full text-sm ">
              <thead>
                <tr className=" backdrop-blur-2xl sticky top-0">
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">Txn. ID</th>
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">Amount</th>
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">Date</th>
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">Method</th>
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">Consultant</th>
                  <th className="px-2 py-2 text-left font-semibold border-b border-white/20">User</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((rec) => (
                  <tr
                    key={rec._id}
                    className="border-b border-white/20 last:border-none hover:bg-white/5 transition"
                  >
                    <td className="px-2 py-2">{rec.transactionId || "-"}</td>
                    <td className="px-2 py-2 font-bold">
                      ₹{rec.amount} <span className="text-xs">{rec.currency}</span>
                    </td>
                    <td className="px-2 py-2">{rec.createdAt ? new Date(rec.createdAt).toLocaleString() : "-"}</td>
                    <td className="px-2 py-2">{rec.method || "-"}</td>
                    <td className="px-2 py-2">
                      <div>
                        <div className="font-semibold">{rec.consultant?.fullName || "-"}</div>
                        <div className="text-xs">{rec.consultant?.email || ""}</div>
                        <div className="text-xs">{rec.consultant?.phone || ""}</div>
                        <div className="text-xs">{rec.consultant?.location || ""}</div>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <div>
                        <div className="font-semibold">{rec.user?.fullName || "-"}</div>
                        <div className="text-xs">{rec.user?.email || ""}</div>
                        <div className="text-xs">{rec.user?.phone || ""}</div>
                        <div className="text-xs">{rec.user?.location || ""}</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <RevenueChart />
    </div>
  );
};

export default Revenue;
