import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link to={`/event/${event._id}`} className="bg-[#efe49c] rounded-lg shadow-md p-5 hover:shadow-xl transition">
      <h2 className="text-xl font-semibold">{event.name}</h2>
      <p className="text-gray-600">{event.location}</p>
      <p className="text-sm text-gray-600">
        {new Date(event.date).toLocaleString()}
      </p>

      <Link
        to={`/event/${event._id}`}
        className="mt-3 font-small text-green-800 inline-block hover:underline"
      >
        View Details
      </Link>
    </Link>
  );
}
