import { LiaPlusSolid, LiaTimesSolid, LiaUsersSolid } from 'react-icons/lia';

export default function Sidebar({
  isOpen,
  onClose,
  onResetView,
  onOpenAddModal,
  userCount,
}) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/25 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-56 flex-col border-r border-[#E5E5E5] bg-[#F7F7F5] transition-transform duration-150 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 items-center justify-between border-b border-[#E5E5E5] px-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#222222] text-xs font-semibold text-[#FFFFFF]">
              U
            </span>
            <span className="text-sm font-semibold tracking-tight text-[#222222]">
              User Admin
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-[#777777] hover:bg-[#EAEAE6] hover:text-[#222222] lg:hidden"
            aria-label="Close navigation"
          >
            <LiaTimesSolid className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Sidebar">
          <p className="px-2 pb-1.5 text-[11px] font-medium uppercase tracking-wider text-[#777777]">
            Directory
          </p>

          <button
            type="button"
            onClick={() => {
              onResetView();
              onClose();
            }}
            className="flex w-full items-center justify-between rounded border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-2 text-left text-sm font-medium text-[#222222]"
          >
            <span className="flex items-center gap-2">
              <LiaUsersSolid className="h-4 w-4 text-[#222222]" aria-hidden="true" />
              Users
            </span>
            <span className="text-xs font-normal tabular-nums text-[#777777]">
              {userCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => {
              onOpenAddModal();
              onClose();
            }}
            className="flex w-full items-center gap-2 rounded px-2.5 py-2 text-left text-sm text-[#555555] hover:bg-[#EFEFEC] hover:text-[#222222]"
          >
            <LiaPlusSolid className="h-4 w-4" aria-hidden="true" />
            New User
          </button>
        </nav>

        <div className="border-t border-[#E5E5E5] px-4 py-3">
          <p className="text-xs leading-relaxed text-[#777777]">
            Session updates are kept in local state after API responses.
          </p>
        </div>
      </aside>
    </>
  );
}
