import {
  LiaCheckSolid,
  LiaExclamationCircleSolid,
  LiaTimesSolid,
} from 'react-icons/lia';

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
          <LiaExclamationCircleSolid className="h-4 w-4 shrink-0" aria-hidden="true" />
        ) : (
          <LiaCheckSolid className="h-4 w-4 shrink-0" aria-hidden="true" />
        )}
        <span>{notification.message}</span>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        className="rounded p-1 opacity-75 hover:opacity-100"
        aria-label="Dismiss message"
      >
        <LiaTimesSolid className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
    </div>
  );
}
