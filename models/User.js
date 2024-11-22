const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      match: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Instance method to compare passwords
UserSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Handle unique constraint errors
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("Duplicate field value entered"));
  } else {
    next();
  }
});

module.exports = mongoose.model("User", UserSchema);
