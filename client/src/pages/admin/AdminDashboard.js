import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { bookingsAPI, authAPI } from '../../utils/api';

/**
 * Admin Dashboard - View, update, delete bookings
 */
const AdminDashboard = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await bookingsAPI.getAll();
      setBookings(data);
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin');
  };

  const handleStatusChange = async (id, newStatus) => {
    setUpdatingId(id);
    setMessage({ type: '', text: '' });

    try {
      await bookingsAPI.update(id, { status: newStatus });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
      setMessage({ type: 'success', text: 'Status updated successfully' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || 'Failed to update status',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;

    setUpdatingId(id);
    setMessage({ type: '', text: '' });

    try {
      await bookingsAPI.delete(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      setMessage({ type: 'success', text: 'Booking deleted successfully' });
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.error || 'Failed to delete booking',
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    pending: 'bg-amber-500/20 text-amber-400 border-amber-500/50',
    confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    'in-progress': 'bg-primary-500/20 text-primary-400 border-primary-500/50',
    completed: 'bg-green-500/20 text-green-400 border-green-500/50',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  const vehicleTypeLabels = { car: 'Car', bike: 'Bike', suv: 'SUV', other: 'Other' };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-primary-500 font-display">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
          <div>
            <h1 className="section-title">Admin Dashboard</h1>
            <p className="text-gray-400">Manage bookings</p>
          </div>
          <div className="flex gap-4">
            <Link
              to="/admin/messages"
              className="btn-secondary py-2 px-4 text-sm flex items-center"
            >
              View Messages
            </Link>
            <button
              onClick={fetchBookings}
              className="btn-secondary py-2 px-4 text-sm"
            >
              Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-dark-700 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-primary-500/20 text-primary-400 border border-primary-500/50'
                : 'bg-red-500/20 text-red-400 border border-red-500/50'
            }`}
          >
            {message.text}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/20 text-red-400 border border-red-500/50">
            {error}
          </div>
        )}

        {/* Bookings Table */}
        <div className="card-dark overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700 bg-dark-800/50">
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Customer</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Phone</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Vehicle</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Service</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Date</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No bookings yet. <Link to="/booking" className="text-primary-500 hover:underline">Create one</Link>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b border-dark-800 hover:bg-dark-800/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="font-medium text-white">{booking.name}</p>
                      </td>
                      <td className="py-4 px-6 text-gray-400">{booking.phone}</td>
                      <td className="py-4 px-6">
                        <span className="text-gray-400">
                          {vehicleTypeLabels[booking.vehicleType]} - {booking.vehicleModel}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {booking.service?.name || 'N/A'}
                      </td>
                      <td className="py-4 px-6 text-gray-400">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                          disabled={updatingId === booking._id}
                          className={`px-3 py-1 rounded text-sm font-medium border ${
                            statusColors[booking.status]
                          } bg-transparent focus:outline-none cursor-pointer disabled:opacity-50`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => handleDelete(booking._id)}
                          disabled={updatingId === booking._id}
                          className="text-red-400 hover:text-red-300 text-sm disabled:opacity-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center">
          <Link to="/" className="text-primary-500 hover:text-primary-400 text-sm">
            ← Back to website
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
