import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ShieldAdminIcon,
  UsersGroupIcon,
  SearchIcon,
  PlusIcon,
  EditIcon,
  TrashIcon,
  RefreshIcon,
  UserIcon,
  HeartIcon,
  CheckCircleIcon,
  XIcon
} from './Icons';

export const AdminDashboard = ({ showToast }) => {
  const { fetchUsers, updateUser, removeUser, adminCreateUser } = useAuth();
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  // Modals state
  const [editModalUser, setEditModalUser] = useState(null);
  const [deleteModalUser, setDeleteModalUser] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add user form state
  const [addForm, setAddForm] = useState({
    name: '',
    email: '',
    password: 'password123',
    confirmPassword: 'password123',
    role: 'user'
  });

  // Edit user form state
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    role: 'user'
  });

  const loadData = async () => {
    setLoading(true);
    const res = await fetchUsers();
    setLoading(false);
    if (res.success) {
      setUsers(res.users || []);
    } else {
      showToast(res.message || 'Failed to load users', 'error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEdit = (userItem) => {
    setEditModalUser(userItem);
    setEditForm({
      name: userItem.name,
      email: userItem.email,
      role: userItem.role || 'user'
    });
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editModalUser) return;
    const res = await updateUser(editModalUser.id, editForm);
    if (res.success) {
      showToast('User updated successfully!', 'success');
      setEditModalUser(null);
      loadData();
    } else {
      showToast(res.message || 'Update failed', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteModalUser) return;
    const res = await removeUser(deleteModalUser.id);
    if (res.success) {
      showToast('User removed from system', 'success');
      setDeleteModalUser(null);
      loadData();
    } else {
      showToast(res.message || 'Deletion failed', 'error');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!addForm.name || !addForm.email) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    const res = await adminCreateUser(addForm);
    if (res.success) {
      showToast(`Created new user (${addForm.role.toUpperCase()})`, 'success');
      setIsAddModalOpen(false);
      setAddForm({ name: '', email: '', password: 'password123', confirmPassword: 'password123', role: 'user' });
      loadData();
    } else {
      showToast(res.message || 'Creation failed', 'error');
    }
  };

  // Filter users by query & role
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole =
      roleFilter === 'ALL' || u.role?.toLowerCase() === roleFilter.toLowerCase();
    return matchesSearch && matchesRole;
  });

  const totalUsersCount = users.length;
  const adminCount = users.filter((u) => u.role?.toLowerCase() === 'admin').length;
  const donorCount = users.filter((u) => u.role?.toLowerCase() === 'donor').length;
  const userCount = users.filter((u) => !u.role || u.role?.toLowerCase() === 'user').length;

  const getRoleBadge = (role) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#002b49] text-white">
            <ShieldAdminIcon className="w-3 h-3 text-[#007eb4]" />
            ADMIN
          </span>
        );
      case 'donor':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 border border-emerald-300">
            <HeartIcon className="w-3 h-3 text-emerald-600" />
            DONOR
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-[#007eb4] border border-blue-200">
            <UserIcon className="w-3 h-3 text-[#007eb4]" />
            USER
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-16">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-[#002b49] text-white p-8 border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#007eb4] text-white text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldAdminIcon className="w-3.5 h-3.5" />
            Admin Master Control Panel
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            User Directory & Access Control
          </h1>
          <p className="text-slate-200 text-xs mt-1">
            Audit user accounts, assign roles, manage system privileges, and control access permissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white font-bold text-xs shadow-sm transition flex items-center gap-2"
          >
            <PlusIcon className="w-4 h-4" />
            Add User / Admin
          </button>
          <button
            onClick={loadData}
            className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
            title="Refresh Directory"
          >
            <RefreshIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <UsersGroupIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Total Accounts</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">{totalUsersCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <HeartIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Active Donors</p>
            <p className="text-xl font-extrabold text-emerald-600 mt-0.5">{donorCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#007eb4] flex items-center justify-center font-bold">
            <ShieldAdminIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Administrators</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">{adminCount}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center font-bold">
            <UserIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Standard Users</p>
            <p className="text-xl font-extrabold text-[#002b49] mt-0.5">{userCount}</p>
          </div>
        </div>

      </div>

      {/* Toolbar Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
          />
        </div>

        {/* Role filters */}
        <div className="flex items-center gap-2">
          {['ALL', 'USER', 'DONOR', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                roleFilter === r
                  ? 'bg-[#002b49] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

      </div>

      {/* User Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-100 text-[11px] font-bold text-[#002b49] uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="px-6 py-3.5">ID</th>
                <th className="px-6 py-3.5">User</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Created Date</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500">
                    <span className="inline-block w-5 h-5 border-2 border-[#007eb4] border-t-transparent rounded-full animate-spin mb-2"></span>
                    <p className="text-xs font-bold">Loading directory...</p>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-slate-500 text-xs">
                    No users matching search criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-slate-500 font-bold">
                      #{u.id}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#002b49] text-white font-bold text-xs flex items-center justify-center">
                          {u.name ? u.name.charAt(0).toUpperCase() : 'U'}
                        </div>
                        <span className="font-bold text-slate-900">{u.name}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-slate-700 font-medium">
                      {u.email}
                    </td>

                    <td className="px-6 py-4">
                      {getRoleBadge(u.role)}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString()
                        : 'N/A'}
                    </td>

                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(u)}
                          className="p-1.5 rounded-lg bg-blue-50 text-[#007eb4] hover:bg-blue-100 transition border border-blue-200"
                          title="Edit User"
                        >
                          <EditIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteModalUser(u)}
                          className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition border border-rose-200"
                          title="Delete User"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit User Modal */}
      {editModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#002b49] flex items-center gap-2">
                <EditIcon className="w-4 h-4 text-[#007eb4]" />
                Edit User Details
              </h3>
              <button onClick={() => setEditModalUser(null)} className="text-slate-400 hover:text-slate-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Assign Role</label>
                <select
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="user">User</option>
                  <option value="donor">Donor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditModalUser(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold shadow-sm transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deleteModalUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-sm shadow-2xl relative text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <TrashIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#002b49] mb-1">Delete User Account?</h3>
            <p className="text-slate-600 text-xs mb-6">
              Are you sure you want to remove <span className="font-bold text-slate-900">{deleteModalUser.email}</span>?
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteModalUser(null)}
                className="w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="w-full py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New User Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#002b49] flex items-center gap-2">
                <PlusIcon className="w-4 h-4 text-[#007eb4]" />
                Create User / Admin Account
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Role</label>
                <select
                  value={addForm.role}
                  onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                >
                  <option value="user">User</option>
                  <option value="donor">Donor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={addForm.name}
                  onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
                  required
                  placeholder="e.g. Alex Mercer"
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email</label>
                <input
                  type="email"
                  value={addForm.email}
                  onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
                  required
                  placeholder="alex@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Initial Password</label>
                <input
                  type="password"
                  value={addForm.password}
                  onChange={(e) => setAddForm({ ...addForm, password: e.target.value, confirmPassword: e.target.value })}
                  required
                  className="w-full px-4 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#007eb4]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#007eb4] hover:bg-[#005f88] text-white text-xs font-bold shadow-sm transition"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
