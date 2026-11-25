import { useState } from 'react';

export default function UserFormModal({ editingUser, onClose, onSave }) {
  const isEditing = Boolean(editingUser);

  const [form, setForm] = useState({
    name: editingUser?.name || '',
    email: editingUser?.email || '',
    phone: editingUser?.phone || '',
    company: editingUser?.company || '',
    city: editingUser?.city || '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function validate() {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Full name is required.';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!form.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    }

    if (!form.company.trim()) {
      nextErrors.company = 'Company is required.';
    }

    if (!form.city.trim()) {
      nextErrors.city = 'City is required.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setApiError('');

    try {
      await onSave(form);
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md rounded border border-[#E5E5E5] bg-[#FFFFFF] shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E5E5] px-5 py-4">
          <h2 className="text-base font-semibold text-[#222222]">
            {isEditing ? 'Edit User' : 'Add User'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded p-1 text-[#777777] hover:bg-[#F7F7F5] hover:text-[#222222] disabled:opacity-50"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-3.5 p-5">
          {apiError && (
            <div className="rounded border border-[#E7CACA] bg-[#FBF1F1] px-3 py-2 text-xs text-[#8F2D2D]">
              {apiError}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-xs font-medium text-[#222222]"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              disabled={submitting}
              placeholder="e.g. Hannah Brooks"
              className={`w-full rounded border px-3 py-2 text-sm text-[#222222] focus:outline-none ${
                errors.name
                  ? 'border-[#C96A6A]'
                  : 'border-[#E5E5E5] focus:border-[#222222]'
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[#9E2F2F]">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-medium text-[#222222]"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              disabled={submitting}
              placeholder="e.g. hannah@company.com"
              className={`w-full rounded border px-3 py-2 text-sm text-[#222222] focus:outline-none ${
                errors.email
                  ? 'border-[#C96A6A]'
                  : 'border-[#E5E5E5] focus:border-[#222222]'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-[#9E2F2F]">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-xs font-medium text-[#222222]"
            >
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              disabled={submitting}
              placeholder="e.g. 555-014-8920"
              className={`w-full rounded border px-3 py-2 text-sm text-[#222222] focus:outline-none ${
                errors.phone
                  ? 'border-[#C96A6A]'
                  : 'border-[#E5E5E5] focus:border-[#222222]'
              }`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-[#9E2F2F]">{errors.phone}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company"
              className="mb-1 block text-xs font-medium text-[#222222]"
            >
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              value={form.company}
              onChange={handleChange}
              disabled={submitting}
              placeholder="e.g. Northwind Trading"
              className={`w-full rounded border px-3 py-2 text-sm text-[#222222] focus:outline-none ${
                errors.company
                  ? 'border-[#C96A6A]'
                  : 'border-[#E5E5E5] focus:border-[#222222]'
              }`}
            />
            {errors.company && (
              <p className="mt-1 text-xs text-[#9E2F2F]">{errors.company}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="city"
              className="mb-1 block text-xs font-medium text-[#222222]"
            >
              City
            </label>
            <input
              id="city"
              name="city"
              type="text"
              value={form.city}
              onChange={handleChange}
              disabled={submitting}
              placeholder="e.g. Chicago"
              className={`w-full rounded border px-3 py-2 text-sm text-[#222222] focus:outline-none ${
                errors.city
                  ? 'border-[#C96A6A]'
                  : 'border-[#E5E5E5] focus:border-[#222222]'
              }`}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-[#9E2F2F]">{errors.city}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 border-t border-[#E5E5E5] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium text-[#222222] hover:bg-[#F7F7F5] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded bg-[#222222] px-4 py-2 text-xs font-medium text-[#FFFFFF] hover:bg-[#333333] disabled:opacity-50"
            >
              {submitting
                ? 'Saving...'
                : isEditing
                  ? 'Save Changes'
                  : 'Add User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
