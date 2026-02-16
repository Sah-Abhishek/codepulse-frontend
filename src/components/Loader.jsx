export default function Loader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
      </div>
    </div>
  );
}
