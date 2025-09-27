import React from "react";

const Card = ({ label, icon, path, value, onClick }) => (
  <div
    onClick={() => onClick(path)}
    className="cursor-pointer bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900 border border-white/30 text-white rounded-xl shadow-lg shadow-white/50 flex flex-col items-center justify-center py-8 px-6 lg:hover:scale-105 transition-transform duration-150 min-h-40"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <div className="font-bold text-lg">{label}</div>
    <div className="mt-4 text-2xl font-semibold">{value}</div>
  </div>
);

export default Card;
