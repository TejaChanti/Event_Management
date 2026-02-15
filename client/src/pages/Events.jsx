import { useEffect, useState } from "react";
import API from "../api";
import EventCard from "../components/EventCard";

export default function Events({ search }) {
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data } = await API.get(
          `/events?search=${search}&page=${page}`
        );

        setEvents(data.events);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvents();
  }, [search, page]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <div className="p-8 bg-[#f9f6de] w-full min-h-full">

      <div className="grid md:grid-cols-3 gap-6">
        {events.length > 0 ? (
          events.map((e) => (
            <EventCard key={e._id} event={e} />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No events found.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-10 space-x-2">

          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
            className={`px-4 py-2 text-sm rounded border ${
              page === 1
                ? "bg-[#f9f6de] cursor-not-allowed"
                : "bg-[#efe49c] hover:bg-[#efe49c]"
            }`}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 text-sm rounded border ${
                page === num
                  ? "bg-green-600 text-white"
                  : "bg-[#efe49c] hover:bg-[#efe49c]"
              }`}
            >
              {num}
            </button>
          ))}


          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 text-sm rounded border ${
              page === totalPages
                ? "bg-[#f9f6de] cursor-not-allowed"
                : "bg-[#efe49c] hover:bg-[#efe49c]"
            }`}
          >
            Next
          </button>

        </div>
      )}
    </div>
  );
}
