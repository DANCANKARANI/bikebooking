"use client";
import React, { useState } from "react";

const Reports = () => {
  const [reportData, setReportData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Function to fetch all bikes
  const fetchAllBikes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://tysonbikes.onrender.com/api/v1/bikes/all",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-token", // Include the authorization header if required
          },
        }
      );
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error("Error fetching bikes data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch all users
  const fetchAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const response = await fetch(
        "https://tysonbikes.onrender.com/api/v1/user/all/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer your-token", // Include the authorization header if required
          },
        }
      );
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error fetching users data:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Function to print the report
  const printReport = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Bike and User Reports</h1>
      
      {/* Grid layout for reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Users Section */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">All Users Report</h2>
          <button 
            onClick={fetchAllUsers} 
            className="bg-purple-500 text-white px-6 py-2 rounded hover:bg-purple-600 mb-4"
          >
            Get All Users Who Booked Rides
          </button>
          {loadingUsers && <p className="text-gray-500">Loading users...</p>}
          {userData && (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(userData, null, 2)}
            </pre>
          )}
          <button 
            onClick={printReport} 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Print Report
          </button>
        </div>
        
        {/* Bikes Section */}
        <div className="bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-semibold mb-4">All Bikes Report</h2>
          <button 
            onClick={fetchAllBikes} 
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mb-4"
          >
            Get All Bikes Booked
          </button>
          {loading && <p className="text-gray-500">Loading bikes...</p>}
          {reportData && (
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto">
              {JSON.stringify(reportData, null, 2)}
            </pre>
          )}
          <button 
            onClick={printReport} 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Print Report
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;
