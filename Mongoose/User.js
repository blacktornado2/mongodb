const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

// 1. Make a schema
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function () {
            return true; //change this, validate email here
        }
    },
    createdAt: Date,
    updatedAt: Date,
    bestFriend: mongoose.SchemaTypes.ObjectId,
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
});

// Hooks
// pre-hook
userSchema.pre("save", function () {
    console.log("Before saving in database, ", this);
});

// post-hook
userSchema.post("save", function (doc) {
    console.log("After saving in database, ", doc);
});

// 2. Convert schema into model and export it
module.exports = mongoose.model("User", userSchema);
