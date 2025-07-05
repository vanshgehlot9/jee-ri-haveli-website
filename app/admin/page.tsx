"use client"

import { useState, useEffect } from "react"

const rooms = [
  { name: "Deluxe Room", price: "₹2,500" },
  { name: "Standard Room", price: "₹1,800" }
]

export default function AdminPage() {
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [unavailable, setUnavailable] = useState<any[]>([])
  const [unavailForm, setUnavailForm] = useState({
    roomType: "Deluxe Room ",
    start: "",
    end: "",
    reason: ""
  })
  const [unavailMsg, setUnavailMsg] = useState("")
  const [tableReservations, setTableReservations] = useState<any[]>([])
  const [tableLoading, setTableLoading] = useState(false)
  const [tableError, setTableError] = useState("")

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
        setBookings(data)
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
        setUnavailForm({ roomType: rooms[0].name, start: "", end: "", reason: "" })
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
    }
  }, [loggedIn])

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-lg max-w-xs w-full">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-amber-600 text-white py-2 rounded font-bold">Login</button>
          {error && <div className="text-red-600 text-center mt-2">{error}</div>}
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 py-10">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Panel</h1>
        <h2 className="text-xl font-semibold mb-2">Room Booking Summary</h2>
        <div className="mb-6 flex gap-4">
          {Object.entries(roomSummary).map(([room, count]) => (
            <div key={room} className="bg-white rounded shadow p-4">
              <div className="font-bold">{room}</div>
              <div>{count} bookings</div>
            </div>
          ))}
        </div>
        <h2 className="text-xl font-semibold mb-2">All Bookings</h2>
        {loading ? (
          <div>Loading...</div>
        ) : bookings.length === 0 ? (
          <div>No bookings found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Phone</th>
                  <th className="p-2 border">Room</th>
                  <th className="p-2 border">Check In</th>
                  <th className="p-2 border">Check Out</th>
                  <th className="p-2 border">Guests</th>
                  <th className="p-2 border">Status</th>
                  <th className="p-2 border">Booked At</th>
                  <th className="p-2 border">Actions</th>
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
        <h2 className="text-xl font-semibold mb-2">Mark Room as Unavailable</h2>
        <form className="mb-4 flex flex-wrap gap-2 items-end" onSubmit={handleUnavailSubmit}>
          <select name="roomType" value={unavailForm.roomType} onChange={handleUnavailChange} className="p-2 border rounded">
            {rooms.map((room) => (
              <option key={room.name} value={room.name}>{room.name}</option>
            ))}
          </select>
          <input type="date" name="start" value={unavailForm.start} onChange={handleUnavailChange} required className="p-2 border rounded" />
          <input type="date" name="end" value={unavailForm.end} onChange={handleUnavailChange} required className="p-2 border rounded" />
          <input type="text" name="reason" value={unavailForm.reason} onChange={handleUnavailChange} placeholder="Reason (optional)" className="p-2 border rounded" />
          <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded font-bold">Mark Unavailable</button>
        </form>
        {unavailMsg && <div className="mb-2 text-amber-700 font-semibold">{unavailMsg}</div>}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Unavailable Periods</h3>
          {unavailable.length === 0 ? (
            <div>No unavailable periods.</div>
          ) : (
            <table className="min-w-full bg-white rounded shadow text-sm">
              <thead>
                <tr>
                  <th className="p-2 border">Room</th>
                  <th className="p-2 border">Start</th>
                  <th className="p-2 border">End</th>
                  <th className="p-2 border">Reason</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {unavailable.map((u) => (
                  <tr key={u._id}>
                    <td className="p-2 border">{u.roomType}</td>
                    <td className="p-2 border">{u.start}</td>
                    <td className="p-2 border">{u.end}</td>
                    <td className="p-2 border">{u.reason}</td>
                    <td className="p-2 border">
                      <button className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold hover:bg-red-700" onClick={() => handleDeleteUnavail(u._id)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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