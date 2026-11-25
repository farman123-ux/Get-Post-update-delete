export default function UserTable({
  users,
  isLoading,
  error,
  searchQuery,
  onRetry,
  onClearSearch,
  onAddUser,
  onEditUser,
  onDeleteUser,
}) {
  if (isLoading && users.length === 0) {
    return (
      <div className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-14 text-center">
        <div className="mx-auto mb-3 h-5 w-5 animate-spin rounded-full border-2 border-[#E5E5E5] border-t-[#222222]" />
        <p className="text-sm text-[#777777]">Loading users...</p>
      </div>
    );
  }

  if (error && users.length === 0) {
    return (
      <div className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-12 text-center">
        <p className="text-sm font-medium text-[#222222]">
          Unable to load users
        </p>
        <p className="mt-1 text-sm text-[#777777]">{error}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center rounded bg-[#222222] px-3.5 py-2 text-xs font-medium text-[#FFFFFF] hover:bg-[#333333]"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (users.length === 0) {
    const hasSearch = searchQuery.trim().length > 0;

    return (
      <div className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-6 py-12 text-center">
        <p className="text-sm font-medium text-[#222222]">
          {hasSearch ? 'No matching users' : 'No users available'}
        </p>
        <p className="mt-1 text-sm text-[#777777]">
          {hasSearch
            ? `No records matched "${searchQuery.trim()}".`
            : 'Add a user to start building your directory.'}
        </p>
        {hasSearch ? (
          <button
            type="button"
            onClick={onClearSearch}
            className="mt-4 inline-flex items-center rounded border border-[#E5E5E5] bg-[#FFFFFF] px-3.5 py-2 text-xs font-medium text-[#222222] hover:bg-[#F7F7F5]"
          >
            Clear search
          </button>
        ) : (
          <button
            type="button"
            onClick={onAddUser}
            className="mt-4 inline-flex items-center rounded bg-[#222222] px-3.5 py-2 text-xs font-medium text-[#FFFFFF] hover:bg-[#333333]"
          >
            Add User
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded border border-[#E5E5E5] bg-[#FFFFFF]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E5E5E5] bg-[#F7F7F5]">
              <th className="w-16 px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                ID
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                Name
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                Email
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                Phone
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                Company
              </th>
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-[#777777]">
                City
              </th>
              <th className="w-36 px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-[#777777]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#E5E5E5] text-sm">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-[#FAFAF9]">
                <td className="px-4 py-3 tabular-nums text-[#777777]">
                  {user.id}
                </td>
                <td className="px-4 py-3 font-medium text-[#222222]">
                  {user.name}
                </td>
                <td className="px-4 py-3 text-[#555555]">{user.email}</td>
                <td className="whitespace-nowrap px-4 py-3 tabular-nums text-[#777777]">
                  {user.phone}
                </td>
                <td className="px-4 py-3 text-[#222222]">{user.company}</td>
                <td className="px-4 py-3 text-[#777777]">{user.city}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEditUser(user)}
                      className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-1 text-xs font-medium text-[#222222] hover:bg-[#F7F7F5]"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDeleteUser(user)}
                      className="rounded border border-[#E5E5E5] bg-[#FFFFFF] px-2.5 py-1 text-xs font-medium text-[#9E2F2F] hover:border-[#E7CACA] hover:bg-[#FBF1F1]"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
