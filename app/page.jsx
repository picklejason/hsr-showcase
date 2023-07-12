import Search from "./Search";
import Image from "next/image"

export default function Home() {
  return (
      <div className="flex Blur-BG w-full h-full flex-col text-center justify-center items-center space-y-2 p-12 gap-3 font-sans text-white font-semibold">
        <span className="text-6xl">Trailblazer Profile</span>
        <Search />
        <div className="cursor-pointer items-center space-x-1 rounded-full bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none">
          <a href="/u/600516595" className="flex gap-2">
            <Image
              src="https://raw.githubusercontent.com/Mar-7th/StarRailRes/master/icon/sign/SettingsAccount.png"
              alt="Example Icon"
              width={24}
              height={24}
            />
            <span> Example </span>
          </a>
        </div>
      </div>
  );
}
