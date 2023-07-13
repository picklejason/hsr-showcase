import { AiOutlineGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="mx-auto max-w-3xl overflow-hidden px-4 text-neutral-100 sm:px-6 md:max-w-5xl">
      <hr className="mx-auto mt-8 h-0.5 w-full border-0 bg-neutral-200"></hr>
      <div className="mx-auto flex flex-row items-center gap-1 p-4 text-center md:flex-row md:justify-between">
        <span>© 2023 Jason</span>
        <span className="text-sm">
          This site is not affiliated with miHoYo &amp; All game content and assets are trademarks and copyrights of
          miHoYo.
        </span>
        <a href="https://github.com/picklejason/starrail" rel="noreferrer" target="_blank">
          <AiOutlineGithub
            className="cursor-pointer text-neutral-100 transition-transform hover:-translate-y-1"
            size={30}
          />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
