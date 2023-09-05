import Image from 'next/image';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Image src="/herta-kurukuru.gif" alt="Loading" width={256} height={256} priority={true} />
        <p className="text-4xl">Loading...</p>
      </div>
    </div>
  );
}
