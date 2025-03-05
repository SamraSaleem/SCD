const express = require('express');
const app = express();
const axios = require('axios');
const port = process.env.PORT || 3002;
app.use(express.json());

let booking = [];

app.post('/booking', async (req, res) => {
    const {userId, carId, startDate, endDate, status } = req.body;

    const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
    const carResponse = await axios.get(`http://localhost:3001/cars/${carId}`);

    const user = userResponse.data;
    const car = carResponse.data;
    if(user && car) {
        const bookings = {bookingId : booking.length + 1, userId, carId, startDate, endDate, status };
        booking.push(bookings);

        await axios.put(`http://localhost:3000/users/${userId}`, { activeBookings: user.activeBookings + 1 });
        await axios.put(`http://localhost:3001/cars/${carId}`, { isAvailable: false });

        response.json(bookings);
    }
    else
    {
        res.status(404).json({message: "User or Car not found"});
    }
});

app.get('/bookings/:userId', async (req, res) => {
    const userId = req.params.userId;
    const bookingFound = booking.find(booking => booking.userId === userId);
    if(!bookingFound) {
        res.status(404).json({message: "No booking found for this user"});
        }
        else
        {
            res.json(bookingFound);
        }
    });

app.delete('/booking/:id', async (req, res) => {
    const id = req.params.id;
    const bookingFound = booking.findIndex(booking => booking.bookingId === id);
    if(!bookingFound) {
        res.status(404).json({message: "No booking found for this id"});
        }
        else
        {
            booking.splice(bookingFound, 1);
            await axios.put(`http://localhost:3000/users/${userId}`, { activeBookings: user.activeBookings - 1 });
            await axios.put(`http://localhost:3001/cars/${carId}`, { isAvailable: true });
    
            res.json({message: "Booking deleted"});
        }
});

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}`);
    });