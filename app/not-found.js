import Image from "next/image";

export default function NotFound() {
  return (
    <div className="Blur-BG w-full h-full flex justify-center items-center text-center font-sans text-white font-semibold">
      <div className="flex flex-col gap-5">
        <Image
          src="/herta-kurukuru.gif"
          alt="Loading"
          width={256}
          height={256}
        />
        <div>
          <h1 className="text-4xl">Kuru kuru ~ 404!</h1>
          <div>
            <a href="/">
              <div className="cursor-pointer items-center space-x-1 rounded-full bg-stone-800 px-3 py-1 shadow-md shadow-stone-900 hover:brightness-110 active:shadow-none mt-2 text-xl">
                Home
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
