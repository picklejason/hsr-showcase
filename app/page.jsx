import Search from './Search';

export default function Home() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 space-y-2 p-12 text-center">
      <span className="text-6xl">Trailblazer Profile</span>
      <Search />
    </div>
  );
}
