const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

let user = [
    { userId: 1, name: "ali", email: "ali@gamil.com", maxBookings: 3, activeBookings: 0 }
];

app.post('/users', (req, res)=>
{   
    const maxBookings = 3;
    const {name, email, activeBookings} = req.body;
    const newUser = { userId : user.length + 1, name, email, maxBookings, activeBookings};
    user.push(newUser);
    res.json(newUser);
})

app.get('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId); 
    const userFound = user.find((u) => u.userId === userId); 
    if (!userFound)
    {
        res.status(404).json({ message: "User not found" });
    } 
    else 
    {
        res.json(userFound);
    }
});

app.get('/users', (req, res)=>
    {
        res.json(user);
    }
);
app.put('/users/:userId', (req, res) =>
{
    const userId = req.params.userId;
    const { activeBookings } = req.body;
    const userFound = user.find(user => user.userId === parseInt(userId));
    if(!userFound) 
    {
        res.status(404).json({message: "User not found"});
    }
    else   
    {
        userFound.activeBookings = activeBookings;
    }
    res.json(userFound);
})

app.listen(port, () => {
    console.log(`Microservice listening on port ${port}`);
    });