import Image from 'next/image';

export default function Loading() {
  return (
    <div className="Blur-BG flex min-h-screen w-screen items-center justify-center">
      <div className="flex">
        <Image src="/herta-kurukuru.gif" alt="Loading" width={256} height={256} />
      </div>
    </div>
  );
}
