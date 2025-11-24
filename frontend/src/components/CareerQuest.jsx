import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import { useEffect, useState } from "react";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Rocket } from "lucide-react";

const CareerQuest = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [sortBy, setSortBy] = useState("Sort by");

  useEffect(() => {
    return () => dispatch(setSearchedQuery(""));
  }, [dispatch]);

  useEffect(() => {
    if (!user || !user._id) navigate("/login");
  }, [user, navigate]);

  const filteredJobs = allJobs
    .filter((job) => {
      const matchesSearch = job?.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "All" ||
        job?.jobType?.toLowerCase() === filterType.toLowerCase();
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);

      if (sortBy === "Newest") {
        return dateB - dateA; // Latest Jobs time
      }
      if (sortBy === "Oldest") {
        return dateA - dateB; // condition for the old job post
      }
      return 0;
    });

  return (
    <div className="bg-gradient-to-b from-blue-50 via-white to-violet-50 min-h-screen">
      <Navbar />

      {/* 🔹 Header Section */}
      <div className="text-center mt-10 space-y-2">
        <h1 className="text-4xl  flex justify-center items-center gap-2">
          {/* Gradient careerQuest text */}
          <span className="bg-gradient-to-r from-[#F83002] via-[#6D28D9] to-[#2563EB] bg-clip-text text-transparent font-extrabold">
            CareerQuest
          </span>

          {/* Rocket */}
          <span className="text-[#F83002]">🚀</span>
        </h1>

        <p className="text-[#F83002] text-lg">
          Find your dream role —
          <span className="text-[#6D28D9]"> tailored just for you</span>
        </p>
      </div>

      {/* 🔹 Filter Bar */}
      <div className="flex flex-wrap  sm:flex-row items-center justify-center gap-4 mt-8">
        <div className="flex items-center border border-violet-500 rounded-2xl overflow-hidden bg-white shadow-md px-3 py-1.5">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className=" py-1 px-4  shadow-sm bg-white text-gray-700 focus:outline-none "
          >
            <option>Sort by</option>
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center border border-[#6D28D9] p-2 gap-4 rounded-2xl">
          {["All", "Full Time", "Part Time"].map((type, index) => (
            <div key={type} className="flex items-center">
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  filterType === type
                    ? "bg-gradient-to-r from-[#F83002] to-[#6D28D9] text-white shadow-md"
                    : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {type}
              </button>
              {index < 2 && (
                <span className="text-gray-400 mx-2 font-semibold">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Search Input */}
      <div className="max-w-md mx-auto mt-8 px-4 relative">
        <Search className="absolute left-6 top-3 text-gray-500" size={25} />
        <input
          type="text"
          placeholder="Search roles, companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-full border border-violet-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6D28D9]"
        />
      </div>

      {/* 🔹 Job Results Section */}
      <div className="relative max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-center text-[#F83002] font-semibold text-2xl mb-6">
          Explore Opportunities ({filteredJobs.length})
        </h2>

        {filteredJobs.length > 0 ? (
          <motion.div
            layout
            className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6  "
          >
            {filteredJobs.map((job, index) => (
              <motion.div
                key={job._id || index}
                whileHover={{ scale: 1.07 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative p-5 rounded-2xl shadow-md border border-blue-100 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50"
              >
                {/* Badge */}
                {index % 2 === 0 && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-[#F83002] to-[#6D28D9] text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    🔥 Hot
                  </span>
                )}

                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="flex items-center justify-center h-[50vh]">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-xl text-[#F83002] font-semibold"
            >
              No opportunities found 😞 — try changing filters!
            </motion.span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerQuest;
