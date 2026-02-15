import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const fetchEvent = async () => {
    try {
      const { data } = await API.get(`/events/${id}`);
      setEvent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const registerHandler = async () => {
    try {
      await API.post(`/registrations/${id}`);
      setMessage("Successfully Registered!");
      fetchEvent();
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  const cancelHandler = async () => {
    try {
      await API.delete(`/registrations/${id}`);
      setMessage("Registration Cancelled!");
      fetchEvent();
    } catch (err) {
      setMessage("Cancel failed");
    }
  };

  if (loading) return <div className="p-8 bg-[#f9f6de] min-h-full"><p>Loading...</p></div>;
  if (!event) return <div className="p-8 bg-[#f9f6de] min-h-full"><p>Event not found</p></div>;

  return (
    <div className="p-8 bg-[#f9f6de] min-h-full">
      <div className="max-w-3xl mx-auto my-8 bg-[#efe49c] shadow rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-4">{event.name}</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Organizer:</strong> {event.organizer}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p>
          <strong>Date & Time:</strong>{" "}
          {new Date(event.date).toLocaleString()}
        </p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Description:</strong> {event.description}</p>
        <p>
          <strong>Available Seats:</strong>{" "}
          {event.availableSeats} / {event.capacity}
        </p>
      </div>

      {message && (
        <div className="mt-4 text-sm text-green-600">
          {message}
        </div>
      )}

      <div className="mt-6 flex gap-4">
        {user ? (
          <>
            {event.availableSeats > 0 && (
              <button
                onClick={registerHandler}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Register
              </button>
            )}

            <button
              onClick={cancelHandler}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Registration
            </button>
          </>
        ) : (
          <p className="text-red-500">
            Login to register for this event.
          </p>
        )}
      </div>
    </div>
    </div>
  );
}
