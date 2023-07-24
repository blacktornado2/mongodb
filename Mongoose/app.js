const mongoose = require("mongoose");
const User = require("./User.js");

const connectDB = async () => {
    try {
        const res = await mongoose.connect("mongodb://localhost/testdb");
        console.log("Connection Successful!!");
    } catch (err) {
        console.log(err);
    }

    // 1. Create a new user
    const user = new User({ name: "Ankit", age: 23 });
    await user.save();

    // 2. Alternative way to create a new user
    const newUser = await User.create({ name: "Ankit", age: 50 });

    const newUser2 = new User({
        name: "A",
        age: 50,
        hobbies: ["Reading", "Video Gaming"],
        address: {
            city: "Gurugram",
            street: "LXMN Vihar"
        }
    });

    await newUser2.save();

    const allUsers = await User.find();
    console.log(allUsers);
};

connectDB();
