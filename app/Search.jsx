"use client";

import Link from "next/link";
import { useState } from "react";

export default function Search() {
  const [UID, setUID] = useState("");

  return (
    <div className="flex flex-col items-center gap-3 text-black text-centers">
      <label htmlFor="uid" className="sr-only">Enter UID</label>
      <input
        type="text"
        name="uid"
        onChange={(e) => setUID(e.target.value)}
        value={UID}
        placeholder="Enter UID"
        className="text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
      />
      <div className="shadow bg-purple-600 hover:bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded w-1/2">
        <Link href={`/u/${UID}`}>Search</Link>
      </div>
    </div>
  );
}
