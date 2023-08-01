const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

// *** IMPORTANT ***
// The validation only runs when we make a model using .create() and .save() methods
// Avoid findOneAndUpdate, findAndUpdate, findOneAndReplace and all the update methods because there is no valdiation in them
// Instead first find that model using find() or findOne(), and then change the particular model and then save it using .save()

// 1. Make a schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: { type: Number, min: [18, "Minimum age must be 18 years"], max: 65 },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, //automatically converts email to lowercase
        minLLength: 8,
        maxLength: 30,
        validate: function () {
            return true; //change this, validate email here
        }
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    hobbies: [String],
    address: {
        street: String,
        city: String
    }
});

// Hooks (middleware)
// middleware -> pre and post
// events -> save, validate, remove
// pre-hook
userSchema.pre("save", function (next) {
    console.log("Before saving in database, ", this);
    this.updatedAt = Date.now();
    next();
});

// post-hook
userSchema.post("save", function (doc, next) {
    console.log("After saving in database, ", doc);
    next();
});

// Methods, don't use arrow function in this, as we have to use this keyword
// Methods are used on instance, and not on blueprint(schema)
userSchema.methods.sayHi = function () {
    console.log(`Hi, my name is ${this.name}`);
};

// statics
// statics are used on Schema(blueprint), and not on instance
userSchema.statics.findByName = function (name) {
    return this.where({ name: new RegExp(name, "i") });
};

// virtuals
userSchema.virtual("namedEmail").get(function () {
    return `${this.name} <${this.email}>`;
});

// 2. Convert schema into model and export it
const User = mongoose.model("User", userSchema);
module.exports = User;
