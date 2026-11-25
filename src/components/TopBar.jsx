export default function TopBar({
  onOpenSidebar,
  onRefresh,
  isLoading,
  totalUsers,
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b border-[#E5E5E5] bg-[#FFFFFF] px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="rounded border border-[#E5E5E5] p-1.5 text-[#222222] hover:bg-[#F7F7F5] lg:hidden"
          aria-label="Open navigation"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h18" />
            <path d="M3 6h18" />
            <path d="M3 18h18" />
          </svg>
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#777777]">Directory</span>
          <span className="text-[#CCCCCC]">/</span>
          <span className="font-medium text-[#222222]">Users</span>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <span className="hidden rounded border border-[#E5E5E5] bg-[#F7F7F5] px-2.5 py-1 text-xs font-medium tabular-nums text-[#777777] sm:inline-block">
          {totalUsers} {totalUsers === 1 ? 'user' : 'users'}
        </span>

        <button
          type="button"
          onClick={onRefresh}
          disabled={isLoading}
          className="inline-flex items-center gap-1.5 rounded border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-1.5 text-xs font-medium text-[#222222] hover:bg-[#F7F7F5] disabled:opacity-50"
        >
          <svg
            className={`h-3.5 w-3.5 text-[#777777] ${
              isLoading ? 'animate-spin' : ''
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
          {isLoading ? 'Syncing' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
