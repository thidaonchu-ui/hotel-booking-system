
const express = require("express");
const router = express.Router();

const Hotel = require("../models/Hotel");

// GET all hotels
router.get("/", async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// CREATE a hotel
router.post("/", async (req, res) => {
    try {
        const hotel = new Hotel(req.body);
        const savedHotel = await hotel.save();

        res.status(201).json(savedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET one hotel by ID
router.get("/:id", async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);

        if (!hotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json(hotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE a hotel
router.put("/:id", async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updatedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json(updatedHotel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE a hotel
router.delete("/:id", async (req, res) => {
    try {
        const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);

        if (!deletedHotel) {
            return res.status(404).json({ message: "Hotel not found" });
        }

        res.json({ message: "Hotel deleted successfully!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
