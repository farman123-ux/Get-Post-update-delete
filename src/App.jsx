import { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Sidebar from './components/Sidebar';
import Toast from './components/Toast';
import TopBar from './components/TopBar';
import UserFormModal from './components/UserFormModal';
import UserTable from './components/UserTable';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

function formatUser(user) {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    company: user.company?.name || user.company || '',
    city: user.address?.city || user.city || '',
  };
}

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await axios.get(API_URL);
        setUsers(res.data.map(formatUser));
      } catch {
        setError('Failed to load users. Please check your connection.');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  useEffect(() => {
    if (!toast || toast.type !== 'success') return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleRefresh() {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data.map(formatUser));
      setToast({ type: 'success', message: 'User list refreshed.' });
    } catch {
      const msg = 'Failed to load users. Please check your connection.';
      setError(msg);
      setToast({ type: 'error', message: msg });
    } finally {
      setLoading(false);
    }
  }

  function openAddModal() {
    setEditingUser(null);
    setIsFormOpen(true);
  }

  function openEditModal(user) {
    setEditingUser(user);
    setIsFormOpen(true);
  }

  function closeFormModal() {
    setIsFormOpen(false);
    setEditingUser(null);
  }

  async function handleSaveUser(formData) {
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: { name: formData.company.trim() },
      address: { city: formData.city.trim() },
    };

    if (editingUser) {
      const res = await axios.patch(`${API_URL}/${editingUser.id}`, payload);
      const updatedUser = formatUser({
        ...payload,
        ...res.data,
        id: editingUser.id,
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === editingUser.id ? updatedUser : u))
      );
      closeFormModal();
      setToast({
        type: 'success',
        message: `${updatedUser.name} has been updated.`,
      });
      return;
    }

    const res = await axios.post(API_URL, payload);
    const createdUser = formatUser({ ...payload, ...res.data });

    // JSONPlaceholder always returns id 11 on POST, so ensure a unique ID in local state.
    const idExists = users.some((u) => u.id === createdUser.id);
    const nextId = idExists
      ? Math.max(0, ...users.map((u) => Number(u.id) || 0)) + 1
      : createdUser.id;

    setUsers((prev) => [...prev, { ...createdUser, id: nextId }]);
    closeFormModal();
    setToast({
      type: 'success',
      message: `${createdUser.name} has been added.`,
    });
  }

  async function handleDeleteUser(user) {
    await axios.delete(`${API_URL}/${user.id}`);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setDeletingUser(null);
    setToast({ type: 'success', message: `${user.name} has been deleted.` });
  }

  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;
    return (
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#FFFFFF] text-[#222222]">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onResetView={() => setSearch('')}
        onOpenAddModal={openAddModal}
        userCount={users.length}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar
          onOpenSidebar={() => setSidebarOpen(true)}
          onRefresh={handleRefresh}
          isLoading={loading}
          totalUsers={users.length}
        />

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-7 sm:px-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-[#222222]">
                User Management
              </h1>
              <p className="mt-1 text-sm text-[#777777]">
                Manage your users and their information.
              </p>
            </div>

            <button
              type="button"
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-1.5 self-start rounded bg-[#222222] px-4 py-2 text-xs font-medium text-[#FFFFFF] hover:bg-[#333333] sm:self-auto"
            >
              + Add User
            </button>
          </div>

          <Toast notification={toast} onDismiss={() => setToast(null)} />

          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                aria-label="Search users by name or email"
                className="w-full rounded border border-[#E5E5E5] bg-[#FFFFFF] py-2 pr-8 pl-3 text-sm text-[#222222] placeholder:text-[#999999] focus:border-[#222222] focus:outline-none"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 text-xs text-[#777777] hover:text-[#222222]"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {search.trim() && (
              <p className="text-xs text-[#777777]">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            )}
          </div>

          <UserTable
            users={filteredUsers}
            isLoading={loading}
            error={error}
            searchQuery={search}
            onRetry={handleRefresh}
            onClearSearch={() => setSearch('')}
            onAddUser={openAddModal}
            onEditUser={openEditModal}
            onDeleteUser={(user) => setDeletingUser(user)}
          />
        </main>
      </div>

      {isFormOpen && (
        <UserFormModal
          editingUser={editingUser}
          onClose={closeFormModal}
          onSave={handleSaveUser}
        />
      )}

      {deletingUser && (
        <DeleteConfirmModal
          user={deletingUser}
          onCancel={() => setDeletingUser(null)}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
}
