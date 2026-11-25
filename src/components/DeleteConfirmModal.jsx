import { useState } from 'react';

export default function DeleteConfirmModal({ user, onCancel, onConfirm }) {
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  async function handleConfirm() {
    setDeleting(true);
    setError('');

    try {
      await onConfirm(user);
    } catch (err) {
      setError(err.message || 'Failed to delete user.');
      setDeleting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded border border-[#E5E5E5] bg-[#FFFFFF] shadow-sm">
        <div className="border-b border-[#E5E5E5] px-5 py-4">
          <h2 className="text-base font-semibold text-[#222222]">Delete User</h2>
        </div>

        <div className="p-5">
          <p className="text-sm leading-relaxed text-[#555555]">
            Are you sure you want to delete{' '}
            <span className="font-medium text-[#222222]">{user.name}</span>?
          </p>

          {error && (
            <div className="mt-3 rounded border border-[#E7CACA] bg-[#FBF1F1] px-3 py-2 text-xs text-[#8F2D2D]">
              {error}
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onCancel}
              disabled={deleting}
              className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium text-[#222222] hover:bg-[#F7F7F5] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              disabled={deleting}
              className="rounded bg-[#9E2F2F] px-3.5 py-2 text-xs font-medium text-[#FFFFFF] hover:bg-[#862626] disabled:opacity-50"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
