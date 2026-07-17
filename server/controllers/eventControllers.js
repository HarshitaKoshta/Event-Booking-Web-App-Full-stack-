const Event = require("../models/Event.js");

// Get all events
exports.getAllEvents = async (req, res) => {
  try {

    const filters = {};

    if (req.query.category) {
      filters.category = req.query.category;
    }
    if(req.query.ticketPrice) {
      filters.price = req.query.ticketPrice;
    }
 
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
};

exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createEvent = async(req,res)=>{
   const {title, description, date, location, category, price} = req.body
  try {
    const newEvent = new Event({
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      ticketPrice,
      imageUrl
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res) => {
  const { title, description, date, location, category, totalSeats, ticketPrice, imageUrl } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, {
      title,
      description,
      date,
      location,
      category,
      totalSeats,
      ticketPrice,
      imageUrl
    }, { new: true });
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if(!event){
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  } 
};