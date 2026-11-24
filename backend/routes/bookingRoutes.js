
const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");

// CREATE a booking
router.post("/", async (req, res) => {
    try {
        const {
            hotel,
            guestName,
            email,
            phone,
            checkIn,
            checkOut,
            guests
        } = req.body;

        if (!hotel || !guestName || !email || !phone || !checkIn || !checkOut || !guests) {
            return res.status(400).json({
                message: "Please provide all required booking information."
            });
        }

        const hotelData = await Hotel.findById(hotel);

        if (!hotelData) {
            return res.status(404).json({ message: "Hotel not found." });
        }

        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);

        if (
            isNaN(startDate.getTime()) ||
            isNaN(endDate.getTime()) ||
            endDate <= startDate
        ) {
            return res.status(400).json({
                message: "Check-out date must be after check-in date."
            });
        }

        if (!Number.isInteger(Number(guests)) || Number(guests) < 1) {
            return res.status(400).json({
                message: "Guests must be at least 1."
            });
        }

        const nights = Math.ceil(
            (endDate - startDate) / (1000 * 60 * 60 * 24)
        );

        const totalPrice = nights * hotelData.pricePerNight;

        const booking = await Booking.create({
            hotel,
            guestName,
            email,
            phone,
            checkIn: startDate,
            checkOut: endDate,
            guests: Number(guests),
            totalPrice
        });

        res.status(201).json({
            message: "Booking created successfully!",
            booking
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find().populate("hotel");
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
