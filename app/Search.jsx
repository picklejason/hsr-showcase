'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Search() {
  const [UID, setUID] = useState('');

  return (
    <div className="text-centers flex flex-col items-center gap-3 text-black">
      <label htmlFor="uid" className="sr-only">
        Enter UID
      </label>
      <input
        type="text"
        name="uid"
        onChange={(e) => setUID(e.target.value)}
        value={UID}
        placeholder="Enter UID"
        className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 text-center leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none"
      />
      <div className="focus:shadow-outline w-1/2 rounded bg-purple-600 px-4 py-2 font-bold text-white shadow hover:bg-purple-500 focus:outline-none">
        <Link href={`/u/${UID}`}>Search</Link>
      </div>
    </div>
  );
}
