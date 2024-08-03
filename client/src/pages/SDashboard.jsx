import React from "react";
import { Search } from "lucide-react";

// Sample data for recent borrowings

const recentBorrowings = [
  {
    title: "The Great Gatsby",
    borrowedOn: "2023-04-15",
    dueDate: "2023-05-15",
  },
  {
    title: "To Kill a Mockingbird",
    borrowedOn: "2023-06-01",
    dueDate: "2023-06-30",
  },
  {
    title: "1984",
    borrowedOn: "2023-07-10",
    dueDate: "2023-08-10",
  },
  {
    title: "Pride and Prejudice",
    borrowedOn: "2023-08-20",
    dueDate: "2023-09-20",
  },
  // Add more items as needed
];
const fines = [
  {
    title: "To Kill a Mockingbird",
    borrowedOn: "2023-06-01",
    dueDate: "2023-06-30",
  },
  {
    title: "1984",
    borrowedOn: "2023-07-10",
    dueDate: "2023-08-10",
  },
  {
    title: "Pride and Prejudice",
    borrowedOn: "2023-08-20",
    dueDate: "2023-09-20",
  },
  // Add more items as needed
];
const SDashboard = () => {
  return (
    <div className="flex flex-col items-center gap-10 justify-center  h-full mt-10">
      <div className="flex gap-1 items-center border border-slate-300 bg-zinc-50 px-3 w-[50%] rounded-xl">
        <Search className="size-5" />
        <input
          type="text"
          className="pr-8 pl-2 w-full font-popp py-3 bg-zinc-50 rounded-r-3xl overflow-hidden focus:outline-none"
          placeholder="Search for books..."
        />
      </div>
      <div className="w-full gap-10 px-10 flex">
        <div className="border flex flex-col gap-5 px-4 py-2 rounded-xl w-full h-full">
          <h1 className="text-2xl font-bold text-black mt-4">
            Recent Borrowings
          </h1>
          <div className="space-y-4 py-2">
            {recentBorrowings.map((borrowing, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h4 className="  font-semibold">{borrowing.title}</h4>
                  <p className="text-sm  text-gray-500">
                    Borrowed on {borrowing.borrowedOn}
                  </p>
                </div>
                <div className="text-sm  font-semibold text-gray-500">
                  Due: {borrowing.dueDate}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border flex flex-col gap-5 px-4 py-2 rounded-xl w-full h-full">
          <h1 className="text-2xl font-bold text-black mt-4">
            Recent Fines
          </h1>
          <div className="space-y-4 py-2">
            {fines.map((borrowing, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <h4 className="  font-semibold">{borrowing.title}</h4>
                  <p className="text-sm  text-gray-500">
                    Overdue fine: $5.00
                  </p>
                </div>
                <div className="text-sm  bg-red-400 rounded-lg px-2 py-1 font-semibold text-gray-800">
                  Pending
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDashboard;
