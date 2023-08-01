const express = require("express");

const userRouter = express.Router();

// Create a new user
userRouter.post("/", async (req, res) => {
    try {
        // 1. Create a new user
        const user = req.body;
        const newUser = new User(user);
        await newUser.save();

        return res.json({ status: "SUCCESS", user: "newUser" });

        // 2. Alternative way to create a new user
        // const newUser = await User.create({ name: "Ankit", age: 50 });
    } catch (error) {
        return res.json({ status: "ERROR", error: error.message });
    }
});

// Get all users
userRouter.get("/", async (req, res) => {
    try {
        const allUsers = await User.find();
        console.log(allUsers);
        return res.json({ status: "SUCCESS", data: allUsers });
    } catch (error) {
        return res.json({ status: "ERROR", error: error.message });
    }
});

// find - find, findById, findOne, exists, findOneAndDelete, findOneAndUpdate
// delete - delete, deleteById, DeleteOne
// User.where("age").gt(20).lt(30).where("name").equals("Ankit").select("name").limit(50).populate("bestFriend")
// populate methods allows us to do a join

module.exports = userRouter;
