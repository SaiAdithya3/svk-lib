import React, { useState } from 'react';

const ActivityLog = () => {
  // Example activity logs data
  const [activityLogs, setActivityLogs] = useState([
    {
      id: 1,
      date: '2024-07-22',
      action: 'Borrowed Book',
      details: 'Introduction to Algorithms was borrowed by John Doe.',
    },
    {
      id: 2,
      date: '2024-07-23',
      action: 'Returned Book',
      details: 'Clean Code was returned by Jane Smith.',
    },
    // Add more activity logs as needed
  ]);

  const [searchText, setSearchText] = useState('');
  const filteredLogs = activityLogs.filter(log =>
    log.action.toLowerCase().includes(searchText.toLowerCase()) ||
    log.details.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="w-full py-6 flex flex-col px-6 items-center">
      <h1 className="text-2xl text-start w-full font-bold text-gray-800 mb-4">Activity Log</h1>
      
      <div className="w-full flex mb-4 justify-between">
        <input
          type="text"
          className="px-4 py-2 border border-gray-300 rounded-lg w-1/3"
          placeholder="Search activities"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      
      <div className="w-full overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className='popp'>
              <th className="px-3 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Date</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Action</th>
              <th className="px-4 py-3.5 border-b border-gray-200 bg-gray-100 text-left text-md font-semibold text-gray-600 tracking-wider">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-gray-50 popp">
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{log.date}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{log.action}</td>
                  <td className="px-4 py-4 border-b border-gray-200 text-sm text-gray-700">{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-4 text-center text-gray-700">No activities found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination can be added here if necessary */}
    </div>
  );
};

export default ActivityLog;
