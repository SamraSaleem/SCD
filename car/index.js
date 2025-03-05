const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

let cars = [];


app.post('/cars', (req, res) =>
{
    const {model, location} = req.body;
    const car = {carId : cars.length + 1, model, location, isAvailable: true};
    cars.push(car);
    res.json(car);
})

app.get('/cars/:carId', (req, res) => {
    const carId = parseInt(req.params.carId); 
    const carFound = cars.find((u) => u.carId === carId); 
    if (!carFound)
    {
        res.status(404).json({ message: "car not found" });
    } 
    else 
    {
        res.json(carFound);
    }
});

app.put('/cars/:carId', (req, res) =>
{
   
    const carId = req.params.carId;
    const { isAvailable } = req.body;
    const carFound = cars.find(cars.carId === parseInt(carId));
    if (!carFound) {
        res.status(404).json("car not found");
    }
    else
    {
        carFound.isAvailable = isAvailable;
        res.json(carFound);
    }
});

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}`);
    });