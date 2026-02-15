import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    API.get("/registrations/my/events")
      .then(res => setEvents(res.data));
  }, []);

  const now = new Date();

  const upcoming = events.filter(e => new Date(e.event.date) > now);
  const past = events.filter(e => new Date(e.event.date) < now);

  return (
    <div className="p-8 bg-[#f9f6de] min-h-full">
      <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
      {upcoming.map(e => (
        <div key={e._id}>{e.event.name}</div>
      ))}

      <h2 className="text-xl font-bold mt-6 mb-4">Past Events</h2>
      {past.map(e => (
        <div key={e._id}>{e.event.name}</div>
      ))}
    </div>
  );
}
