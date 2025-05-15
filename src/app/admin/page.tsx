"use client";
import * as React from "react";
import Sidebar from "@/app/components/Sidebar";
import Table from "@/app/admin/components/Table";

export default function Admin() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100">
        {/* Konten akan ditempatkan di sini */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800">Judul Konten</h3>
          <p className="text-gray-600 mt-2">
            Ini adalah contoh div putih dengan border dan shadow.
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mt-2">
          <Table />
        </div>
      </div>
    </div>
  );
}
