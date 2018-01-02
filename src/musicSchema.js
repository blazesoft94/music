var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var musicSchema = new Schema({
    name: String,
    category: String
});

const Music = mongoose.model("music", musicSchema);
module.exports = Music;