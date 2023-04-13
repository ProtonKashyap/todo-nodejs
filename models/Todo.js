const mongoose = require("mongoose");

const TodosSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Please Provide todo title"] },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todos", TodosSchema);
