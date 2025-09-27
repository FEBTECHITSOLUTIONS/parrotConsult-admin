import React, { useEffect, useState } from "react";
import { getAllsuccessfulPaymentRecords } from "../../api/AdminApis"; // adjust import
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const RevenueChart = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearlyRevenue, setYearlyRevenue] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true);
      try {
        const data = await getAllsuccessfulPaymentRecords();
        setPayments(Array.isArray(data) ? data : []);
      } catch (e) {
        setPayments([]);
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchPayments();
  }, []);

  // Aggregate payments by year and month
  useEffect(() => {
    const aggregate = {};
    payments.forEach(({ createdAt, amount }) => {
      const dt = new Date(createdAt);
      const y = dt.getFullYear();
      const m = dt.getMonth(); // 0-based
      if (!aggregate[y]) aggregate[y] = Array(12).fill(0);
      aggregate[y][m] += amount;
    });
    setYearlyRevenue(aggregate);
    if (!selectedYear && Object.keys(aggregate).length > 0) {
      setSelectedYear(Number(Object.keys(aggregate)[0]));
    }
  }, [payments, selectedYear]);

  const data = selectedYear && yearlyRevenue[selectedYear]
    ? yearlyRevenue[selectedYear].map((amt, idx) => ({ month: months[idx], amount: amt }))
    : [];

  return (
    <div className="min-h-full rounded-2xl shadow-lg shadow-black bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 p-6 text-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Revenue Chart</h1>

        {loading ? (
          <p>Loading payment records...</p>
        ) : (
          <>
            <div>
              <label className="mr-4 font-semibold">Select Year:</label>
              <select
                className="bg-slate-800 text-white rounded px-3 py-1"
                value={selectedYear || ""}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
              >
                {Object.keys(yearlyRevenue).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#cccccc" />
                <XAxis dataKey="month" stroke="#ffffff" />
                <YAxis stroke="#ffffff" />
                <Tooltip formatter={(value) => `₹${value}`} />
                <Line type="monotone" dataKey="amount" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              </LineChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  );
};

export default RevenueChart;
