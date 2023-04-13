const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide user name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide user password"],
    minlength: 5,
  },
});

const SALT_FACTOR = 10;

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(SALT_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model("Users", UserSchema);
