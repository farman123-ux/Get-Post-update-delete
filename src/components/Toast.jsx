export default function Toast({ notification, onDismiss }) {
  if (!notification) {
    return null;
  }

  const isError = notification.type === 'error';

  return (
    <div
      role={isError ? 'alert' : 'status'}
      className={`mb-5 flex items-center justify-between gap-3 rounded border px-3.5 py-2.5 text-sm ${
        isError
          ? 'border-[#E7CACA] bg-[#FBF1F1] text-[#8F2D2D]'
          : 'border-[#CFE2D5] bg-[#EEF5F0] text-[#265C36]'
      }`}
    >
      <div className="flex items-center gap-2.5">
        {isError ? (
          <svg
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        ) : (
          <svg
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        )}
        <span>{notification.message}</span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="rounded p-1 opacity-75 hover:opacity-100"
        aria-label="Dismiss message"
      >
        <svg
          className="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
  );
}
