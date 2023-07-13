import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="Blur-BG flex h-full w-full items-center justify-center text-center font-sans font-semibold text-white">
      <div className="flex flex-col gap-5">
        <Image src="/herta-kurukuru.gif" alt="Loading" width={256} height={256} />
        <div>
          <h1 className="text-4xl">Kuru kuru ~ 404!</h1>
          <div>
            <a href="/">
              <div className="mt-2 cursor-pointer items-center space-x-1 rounded-full bg-stone-800 px-3 py-1 text-xl shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none">
                Home
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
