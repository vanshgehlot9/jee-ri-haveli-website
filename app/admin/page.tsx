"use client"

import { useState, useEffect, useRef } from "react"

const rooms = [
  { name: "Deluxe Room", price: "₹2,500" },
  { name: "Standard Room", price: "₹1,800" },
  { name: "Standard Room without Balcony", price: "₹1,500" }
]

const floors = ["Ground Floor", "First Floor", "Second Floor"]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [unavailable, setUnavailable] = useState<any[]>([])
  const [unavailForm, setUnavailForm] = useState({
    floor: "Ground Floor",
    roomType: "Deluxe Room",
    start: "",
    end: "",
    reason: ""
  })
  const [unavailMsg, setUnavailMsg] = useState("")
  const [tableReservations, setTableReservations] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState("")
  const [newBookingNotification, setNewBookingNotification] = useState(false)
  const [lastBookingCount, setLastBookingCount] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Floor availability management
  const [floorAvailability, setFloorAvailability] = useState({
    "Ground Floor": {
      "Deluxe Room": { available: 2, total: 3 },
      "Standard Room": { available: 1, total: 2 },
      "Standard Room without Balcony": { available: 2, total: 3 }
    },
    "First Floor": {
      "Deluxe Room": { available: 3, total: 4 },
      "Standard Room": { available: 2, total: 3 },
      "Standard Room without Balcony": { available: 1, total: 2 }
    },
    "Second Floor": {
      "Deluxe Room": { available: 1, total: 2 },
      "Standard Room": { available: 2, total: 2 },
      "Standard Room without Balcony": { available: 3, total: 4 }
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === "admin2025") {
      setLoggedIn(true)
      fetchBookings()
    } else {
      setError("Incorrect password")
    }
  }

  const fetchBookings = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/bookings")
      const data = await res.json()
      if (Array.isArray(data)) {
        // Check for new bookings
        if (loggedIn && data.length > lastBookingCount && lastBookingCount > 0) {
          setNewBookingNotification(true)
          if (audioRef.current) {
            audioRef.current.play().catch(console.error)
          }
          // Auto-hide notification after 5 seconds
          setTimeout(() => setNewBookingNotification(false), 5000)
        }
        setBookings(data)
        setLastBookingCount(data.length)
      } else {
        setError("Failed to fetch bookings")
      }
    } catch {
      setError("Failed to fetch bookings")
    }
    setLoading(false)
  }

  const handleCancel = async (id: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "cancelled" })
      })
      const data = await res.json()
      if (data.success) {
        fetchBookings()
      } else {
        setError(data.error || "Failed to cancel booking")
      }
    } catch {
      setError("Failed to cancel booking")
    }
    setLoading(false)
  }

  // Calculate room availability summary
  const roomSummary = bookings.reduce((acc, b) => {
    if (b.status !== 'cancelled') {
      acc[b.roomType] = (acc[b.roomType] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  const fetchUnavailable = async () => {
    try {
      const res = await fetch("/api/admin/unavailable")
      const data = await res.json()
      if (data.success) setUnavailable(data.unavailable)
    } catch {}
  }

  const handleUnavailChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setUnavailForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleUnavailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUnavailMsg("")
    try {
      const res = await fetch("/api/admin/unavailable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(unavailForm)
      })
      const data = await res.json()
      if (data.success) {
        setUnavailMsg("Room marked as unavailable.")
        setUnavailForm({ floor: floors[0], roomType: rooms[0].name, start: "", end: "", reason: "" })
        fetchUnavailable()
      } else {
        setUnavailMsg(data.error || "Failed to mark unavailable.")
      }
    } catch {
      setUnavailMsg("Failed to mark unavailable.")
    }
  }

  const handleDeleteUnavail = async (id: string) => {
    if (!window.confirm("Remove this unavailable period?")) return
    try {
      await fetch(`/api/admin/unavailable/${id}`, { method: "DELETE" })
      fetchUnavailable()
    } catch {}
  }

  // Floor availability management functions
  const updateRoomAvailability = (floor: string, roomType: string, available: number) => {
    setFloorAvailability(prev => ({
      ...prev,
      [floor]: {
        ...prev[floor as keyof typeof prev],
        [roomType]: {
          ...prev[floor as keyof typeof prev][roomType as keyof typeof prev[typeof floor]],
          available: Math.max(0, Math.min(available, prev[floor as keyof typeof prev][roomType as keyof typeof prev[typeof floor]].total))
        }
      }
    }))
  }

  const saveFloorAvailability = async () => {
    try {
      const res = await fetch("/api/admin/floor-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(floorAvailability)
      })
      const data = await res.json()
      if (data.success) {
        alert("Floor availability updated successfully!")
      } else {
        alert("Failed to update floor availability")
      }
    } catch {
      alert("Failed to update floor availability")
    }
  }

  const fetchTableReservations = async () => {
    setTableLoading(true)
    setTableError("")
    try {
      const res = await fetch("/api/admin/table-reservations")
      const data = await res.json()
      if (Array.isArray(data)) {
        setTableReservations(data)
      } else {
        setTableError("Failed to fetch reservations")
      }
    } catch {
      setTableError("Failed to fetch reservations")
    }
    setTableLoading(false)
  }

  // Fetch unavailable periods and table reservations after login
  useEffect(() => {
    if (loggedIn) {
      fetchUnavailable()
      fetchTableReservations()
      // Set up real-time booking updates
      const interval = setInterval(fetchBookings, 10000) // Check every 10 seconds
      return () => clearInterval(interval)
    }
  }, [loggedIn])

  if (!loggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center py-10">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  required
                />
              </div>
              {error && <div className="text-red-600 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 rounded-lg font-semibold"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-10">
      {/* Notification Sound */}
      <audio ref={audioRef} preload="auto">
        <source src="/notification.mp3" type="audio/mpeg" />
        <source src="/notification.wav" type="audio/wav" />
      </audio>
      
      {/* New Booking Notification */}
      {newBookingNotification && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-pulse">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
            <span className="font-semibold">🎉 New Booking Received!</span>
          </div>
          <p className="text-sm mt-1">Check the bookings table below</p>
        </div>
      )}
      
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
        
        {/* Floor Availability Management */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Floor Availability Management</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {floors.map((floor) => (
              <div key={floor} className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-3">{floor}</h3>
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <div key={room.name} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{room.name}</span>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          min="0"
                          max={floorAvailability[floor as keyof typeof floorAvailability][room.name as keyof typeof floorAvailability[typeof floor]].total}
                          value={floorAvailability[floor as keyof typeof floorAvailability][room.name as keyof typeof floorAvailability[typeof floor]].available}
                          onChange={(e) => updateRoomAvailability(floor, room.name, parseInt(e.target.value))}
                          className="w-16 p-1 border rounded text-center text-sm"
                        />
                        <span className="text-xs text-gray-500">
                          / {floorAvailability[floor as keyof typeof floorAvailability][room.name as keyof typeof floorAvailability[typeof floor]].total}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <button
              onClick={saveFloorAvailability}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-2">Room Booking Summary</h2>
        <div className="mb-6 flex gap-4">
          {Object.entries(roomSummary).map(([room, count]) => (
            <div key={room} className="bg-white rounded shadow p-4">
              <div className="font-bold">{room}</div>
              <div>{count} bookings</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">All Bookings</h2>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : '🔄 Refresh'}
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 border text-left">Name</th>
                  <th className="p-2 border text-left">Email</th>
                  <th className="p-2 border text-left">Phone</th>
                  <th className="p-2 border text-left">Room Type</th>
                  <th className="p-2 border text-left">Check In</th>
                  <th className="p-2 border text-left">Check Out</th>
                  <th className="p-2 border text-left">Guests</th>
                  <th className="p-2 border text-left">Status</th>
                  <th className="p-2 border text-left">Created</th>
                  <th className="p-2 border text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b.id || i} className={b.status === 'cancelled' ? "bg-red-100" : ""}>
                    <td className="p-2 border">{b.name}</td>
                    <td className="p-2 border">{b.email}</td>
                    <td className="p-2 border">{b.phone}</td>
                    <td className="p-2 border">{b.roomType}</td>
                    <td className="p-2 border">{b.checkIn ? new Date(b.checkIn).toLocaleDateString() : ""}</td>
                    <td className="p-2 border">{b.checkOut ? new Date(b.checkOut).toLocaleDateString() : ""}</td>
                    <td className="p-2 border">{b.guests}</td>
                    <td className="p-2 border">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        b.status === 'cancelled' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-2 border">{b.createdAt ? new Date(b.createdAt).toLocaleString() : ""}</td>
                    <td className="p-2 border">
                      {b.status === 'cancelled' ? (
                        <span className="text-red-600 font-bold">Cancelled</span>
                      ) : (
                        <button
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700"
                          onClick={() => handleCancel(b.id)}
                          disabled={loading}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2 mt-8">Mark Room as Unavailable</h2>
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <form onSubmit={handleUnavailSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Floor</label>
              <select
                name="floor"
                value={unavailForm.floor}
                onChange={handleUnavailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
              >
                {floors.map((floor) => (
                  <option key={floor} value={floor}>{floor}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <select
                name="roomType"
                value={unavailForm.roomType}
                onChange={handleUnavailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
              >
                {rooms.map((room) => (
                  <option key={room.name} value={room.name}>{room.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="start"
                value={unavailForm.start}
                onChange={handleUnavailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="end"
                value={unavailForm.end}
                onChange={handleUnavailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
              <input
                type="text"
                name="reason"
                value={unavailForm.reason}
                onChange={handleUnavailChange}
                className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500"
                placeholder="Maintenance, etc."
              />
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded font-semibold"
              >
                Mark Unavailable
              </button>
            </div>
          </form>
          {unavailMsg && (
            <div className={`mt-4 p-3 rounded text-sm ${
              unavailMsg.includes("successfully") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {unavailMsg}
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-2">Unavailable Periods</h2>
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border text-left">Floor</th>
                <th className="p-2 border text-left">Room Type</th>
                <th className="p-2 border text-left">Start Date</th>
                <th className="p-2 border text-left">End Date</th>
                <th className="p-2 border text-left">Reason</th>
                <th className="p-2 border text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {unavailable.map((u, i) => (
                <tr key={u.id || i}>
                  <td className="p-2 border">{u.floor}</td>
                  <td className="p-2 border">{u.roomType}</td>
                  <td className="p-2 border">{new Date(u.start).toLocaleDateString()}</td>
                  <td className="p-2 border">{new Date(u.end).toLocaleDateString()}</td>
                  <td className="p-2 border">{u.reason}</td>
                  <td className="p-2 border">
                    <button
                      className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700"
                      onClick={() => handleDeleteUnavail(u.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-semibold mb-2 mt-8">Table Reservations</h2>
        {tableLoading ? (
          <div>Loading...</div>
        ) : tableReservations.length === 0 ? (
          <div>No table reservations found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Time</th>
                  <th className="p-2 border">Guests</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Reserved At</th>
                </tr>
              </thead>
              <tbody>
                {tableReservations.map((r, i) => (
                  <tr key={r.id || i}>
                    <td className="p-2 border">{r.name}</td>
                    <td className="p-2 border">{r.email}</td>
                    <td className="p-2 border">{r.phone}</td>
                    <td className="p-2 border">{r.date ? new Date(r.date).toLocaleDateString() : ""}</td>
                    <td className="p-2 border">{r.time}</td>
                    <td className="p-2 border">{r.guests}</td>
                    <td className="p-2 border">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-green-200 text-green-800">
                        {r.status}
                      </span>
                    </td>
                    <td className="p-2 border">{r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 