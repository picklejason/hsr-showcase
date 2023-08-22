'use client';

import { AiOutlineGithub } from 'react-icons/ai';
import Script from 'next/script';

const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl overflow-hidden px-4 sm:px-6 md:max-w-5xl">
      <Script
        src="https://storage.ko-fi.com/cdn/scripts/overlay-widget.js"
        onLoad={() =>
          kofiWidgetOverlay.draw('picklejason', {
            type: 'floating-chat',
            'floating-chat.donateButton.text': 'Support me',
            'floating-chat.donateButton.background-color': '#292524',
            'floating-chat.donateButton.text-color': '#fff',
          })
        }
      />
      <hr className="mx-auto mt-8 h-0.5 w-full border-0 bg-white"></hr>
      <div className="mx-auto flex flex-row items-center gap-1 p-4 text-center md:flex-row md:justify-between">
        <span>© 2023 Jason</span>

        <span className="text-sm">
          This site is not affiliated with miHoYo &amp; All game content and assets are trademarks and copyrights of
          miHoYo.
        </span>
        <a href="https://github.com/picklejason/starrail" aria-label="GitHub" rel="noreferrer" target="_blank">
          <AiOutlineGithub className="cursor-pointer transition-transform hover:-translate-y-1" size={30} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
