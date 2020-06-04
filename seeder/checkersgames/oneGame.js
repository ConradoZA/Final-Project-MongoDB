const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

module.exports = {
	"playerOne": "User",
	"playerTwo": "Admin",
	"initiated": true,
	"winner": "",
	"drawOffered": false,
	"gamePlay": ObjectId("5ed79e1dfb5fab1d08c60490")
}