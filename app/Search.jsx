'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Search() {
  const [UID, setUID] = useState('');
  const [savedUID, setSavedUID] = useState('');

  useEffect(() => {
    if (UID.length === 9) {
      localStorage.setItem('uid', UID);
    }
  }, [UID]);

  useEffect(() => {
    setSavedUID(localStorage.getItem('uid'));
  }, []);

  return (
    <div className="text-centers flex flex-col items-center gap-3">
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
      {savedUID && (
        <div className="flex cursor-pointer flex-row items-center space-x-1 rounded-full bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none">
          <a href={`/u/${savedUID}`} className="flex gap-2">
            <Image
              src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/sign/SettingsAccount.png"
              alt="Example Icon"
              width={24}
              height={24}
            />
            <span>Linked Profile: {localStorage.getItem('uid')}</span>
          </a>
        </div>
      )}
    </div>
  );
}
