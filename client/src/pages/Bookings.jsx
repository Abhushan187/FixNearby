import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const statusOptions = ["All", "Pending", "Completed", "Cancelled"];

  useEffect(() => {
    setTimeout(() => {
      try {
        const data = [
          { id: 'BK-101', worker: 'Jane Smith', service: 'Plumbing', date: '2023-10-25', status: 'Completed' },
          { id: 'BK-102', worker: 'John Doe', service: 'Electrical', date: '2023-11-05', status: 'Pending' },
          { id: 'BK-103', worker: 'Mike Johnson', service: 'Carpentry', date: '2023-11-10', status: 'Cancelled' },
        ];
        setBookings(data);
        setLoading(false);
      } catch {
        setError("Failed to fetch bookings");
        setLoading(false);
      }
    }, 1000);
  }, []);

  const handleCancel = (id) => {
    const updated = bookings.map((b) =>
      b.id === id ? { ...b, status: "Cancelled" } : b
    );
    setBookings(updated);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.worker.toLowerCase().includes(search.toLowerCase()) ||
      b.service.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || b.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

      <h1 className="text-4xl font-bold text-gray-900 mb-6">My Bookings</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by worker or service..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full md:w-1/2 px-4 py-2 border rounded-lg"
      />

      {/* Status Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statusOptions.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-1 rounded-full text-sm border ${
              statusFilter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* States */}
      {loading && <p className="text-gray-500">Loading bookings...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Empty State */}
      {!loading && filteredBookings.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium">No bookings found</h3>
          <p className="text-gray-500 mt-2">
            Try a different filter or book a service.
          </p>
          <Link
            to="/services"
            className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded"
          >
            Find Services
          </Link>
        </div>
      )}

      {/* Booking List */}
      {!loading && filteredBookings.length > 0 && (
        <div className="bg-white shadow rounded-lg divide-y">
          {filteredBookings.map((booking) => (
            <div key={booking.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-center">
                <p className="font-medium text-blue-600">
                  {booking.service} with {booking.worker}
                </p>

                <span className={`text-xs px-2 py-1 rounded-full ${
                  booking.status === "Completed"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}>
                  {booking.status}
                </span>
              </div>

              <div className="text-sm text-gray-500 mt-2 flex justify-between">
                <span>ID: {booking.id}</span>
                <span>{booking.date}</span>
              </div>

              {/* Actions */}
              <div className="mt-3 flex gap-4">
                {booking.status === "Pending" && (
                  <button
                    onClick={() => handleCancel(booking.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Cancel
                  </button>
                )}

                {booking.status === "Completed" && (
                  <button className="text-blue-600 hover:underline text-sm">
                    Leave Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookings;