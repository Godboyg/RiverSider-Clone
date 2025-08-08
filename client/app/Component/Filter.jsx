import { useState } from "react";
import { UserIcon, DocumentTextIcon } from "@heroicons/react/24/outline";

const tabs = ["Recordings", "Projects", "Edits", "Exports"];

const recordings = [
  { id: 1, title: "Kushal", date: "Jun 29", participants: "Kushal Singh", duration: "00:03", thumbnail: "/thumb1.png" },
  { id: 2, title: "Welcome To Riverside!", date: "Jun 27", participants: "Bridget, Stephen", duration: "01:16", thumbnail: "/thumb2.png" },
];

const projects = [
  { id: 1, title: "AI Video Matching App", date: "Jun 15", contributors: "Kushal, Riya", estimatedTime: "3 weeks", thumbnail: "/project1.png" },
  { id: 2, title: "Weather Travel Planner", date: "Jun 10", contributors: "Amit, Zoya", estimatedTime: "2 weeks", thumbnail: "/project2.png" },
];

const edits = [
  { id: 1, title: "Trimmed Intro for AI App", date: "Jul 1", editedBy: "Kushal", duration: "00:45", thumbnail: "/edit1.png" },
  { id: 2, title: "Removed Dead Space", date: "Jun 30", editedBy: "Zoya", duration: "01:02", thumbnail: "/edit2.png" },
];

const exportsData = [
  { id: 1, title: "Podcast Full Export", date: "Jun 29", format: "MP4", size: "45 MB", thumbnail: "/export1.png" },
  { id: 2, title: "Audio Only", date: "Jun 28", format: "MP3", size: "6 MB", thumbnail: "/export2.png" },
];

export default function RecordingDashboard() {
  const [activeTab, setActiveTab] = useState("Recordings");

  const getData = () => {
    switch (activeTab) {
      case "Recordings": return recordings;
      case "Projects": return projects;
      case "Edits": return edits;
      case "Exports": return exportsData;
      default: return [];
    }
  };

  const data = getData();

  return (
    <div className="bg-[#1e1e1e] text-white min-h-screen">
      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full hover:cursor-pointer text-sm font-medium ${
              activeTab === tab ? "bg-purple-950 text-purple-400" : "bg-[#2a2a2a] text-gray-300 hover:bg-[#3a3a3a]"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id} className="flex gap-4 items-start">
            <div className="relative w-[120px] h-[66px] bg-black rounded-md overflow-hidden">
              <img src={item.thumbnail} alt={item.title} className="object-cover w-full h-full" />
              <div className="absolute bottom-1 right-1 bg-black bg-opacity-60 text-white text-xs px-1.5 py-0.5 rounded">
                {item.duration || item.estimatedTime || item.size}
              </div>
            </div>
            <div className="flex gap-3 flex-col justify-center">
              <div className="text-sm font-semibold text-white">
                {item.title} <span className="text-gray-400 font-normal">{item.date}</span>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                {activeTab === "Recordings" && (
                  <>
                    <UserIcon className="w-4 h-4" />
                    {item.participants}
                  </>
                )}
                {activeTab === "Projects" && (
                  <>
                    <UserIcon className="w-4 h-4" />
                    {item.contributors}
                  </>
                )}
                {activeTab === "Edits" && (
                  <>
                    <UserIcon className="w-4 h-4" />
                    Edited by {item.editedBy}
                  </>
                )}
                {activeTab === "Exports" && (
                  <>
                    <DocumentTextIcon className="w-4 h-4" />
                    {item.format}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}