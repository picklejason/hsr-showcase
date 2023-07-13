import Search from './Search';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 space-y-2 p-12 text-center">
      <span className="text-6xl">Trailblazer Profile</span>
      <Search />
      <div className="flex cursor-pointer flex-row items-center space-x-1 rounded-full bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none">
        <a href="/u/600516595" className="flex gap-2">
          <Image
            src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/sign/SettingsAccount.png"
            alt="Example Icon"
            width={24}
            height={24}
          />
          <span>Example</span>
        </a>
      </div>
    </div>
  );
}
