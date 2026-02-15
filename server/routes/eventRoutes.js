const router = require("express").Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

router.get("/", async (req, res) => {
  const { search, category, location, page = 1 } = req.query;

  let query = {};

  if (search) query.$text = { $search: search };
  if (category) query.category = category;
  if (location) query.location = location;

  const limit = 6;
  const skip = (page - 1) * limit;

  const total = await Event.countDocuments(query);

  const events = await Event.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ date: 1 });

  // Attach available seats
  const eventsWithSeats = await Promise.all(
    events.map(async (event) => {
      const count = await Registration.countDocuments({ event: event._id });
      return {
        ...event.toObject(),
        availableSeats: event.capacity - count
      };
    })
  );

  res.json({
    events: eventsWithSeats,
    currentPage: Number(page),
    totalPages: Math.ceil(total / limit)
  });
});

router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const count = await Registration.countDocuments({ event: event._id });

  res.json({
    ...event.toObject(),
    availableSeats: event.capacity - count
  });
});

module.exports = router;
