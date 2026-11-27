import { LiaBarsSolid, LiaSyncAltSolid } from 'react-icons/lia';

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
          <LiaBarsSolid className="h-4 w-4" aria-hidden="true" />
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
          <LiaSyncAltSolid
            className={`h-3.5 w-3.5 text-[#777777] ${
              isLoading ? 'animate-spin' : ''
            }`}
            aria-hidden="true"
          />
          {isLoading ? 'Syncing' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
