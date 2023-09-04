'use client';

import { AiOutlineGithub } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';
import { SiKofi } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl overflow-hidden px-4 sm:px-6 md:max-w-5xl">
      <hr className="mx-auto mt-8 h-0.5 w-full border-0 bg-white"></hr>
      <div className="mx-auto flex flex-col items-center gap-1 p-4 text-center md:flex-row md:justify-between">
        <span>© 2023 Jason</span>
        <span className="text-sm">
          This site is not affiliated with miHoYo &amp; All game content and assets are trademarks and copyrights of
          miHoYo.
        </span>
        <div className="mb-1 flex flex-row items-center justify-center space-x-2">
          <a href="https://discord.gg/XZxuYuhDTa" aria-label="Discord" rel="noreferrer" target="_blank">
            <BsDiscord className="cursor-pointer transition-transform hover:-translate-y-1" size={30} />
          </a>
          <a href="https://github.com/picklejason/starrail" aria-label="GitHub" rel="noreferrer" target="_blank">
            <AiOutlineGithub className="cursor-pointer transition-transform hover:-translate-y-1" size={30} />
          </a>
          <a href="https://ko-fi.com/picklejason" aria-label="Kofi" rel="noreferrer" target="_blank">
            <SiKofi className="cursor-pointer transition-transform hover:-translate-y-1" size={30} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
