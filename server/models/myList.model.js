const mongoose = require("mongoose");

const myListSchema = mongoose.Schema({
  profileId: { type: mongoose.Schema.ObjectId, ref: "Profile", required: true },
  movies: [{ type: mongoose.Schema.ObjectId, ref: "Movie" }], // Array of movie IDs
});

module.exports = mongoose.model("MyList", myListSchema);
