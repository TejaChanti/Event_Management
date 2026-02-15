const router = require("express").Router();
const protect = require("../middleware/protect");
const Registration = require("../models/Registration");
const Event = require("../models/Event");

router.post("/:eventId", protect, async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: "Event not found" });

  const existing = await Registration.findOne({
    user: req.user._id,
    event: event._id
  });

  if (existing)
    return res.status(400).json({ message: "Already registered" });

  const count = await Registration.countDocuments({ event: event._id });

  if (count >= event.capacity)
    return res.status(400).json({ message: "Event Full" });

  await Registration.create({
    user: req.user._id,
    event: event._id
  });

  res.json({ message: "Registered Successfully" });
});

router.delete("/:eventId", protect, async (req, res) => {
  const deleted = await Registration.findOneAndDelete({
    user: req.user._id,
    event: req.params.eventId
  });

  if (!deleted)
    return res.status(404).json({ message: "Registration not found" });

  res.json({ message: "Cancelled Successfully" });
});

router.get("/my/events", protect, async (req, res) => {
  const registrations = await Registration.find({
    user: req.user._id
  }).populate("event");

  res.json(
    registrations.map((r) => ({
      registrationId: r._id,
      event: r.event
    }))
  );
});

module.exports = router;
