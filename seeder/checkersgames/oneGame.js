const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports = [
	{
		_id: ObjectId("5ee0d5d31ee3502a809c14ba"),
		playerOne: "User",
		playerTwo: "Admin",
		initiated: true,
		winner: "",
		drawOffered: false,
		createdAt: "2020-06-10T12:45:07.958Z",
		updatedAt: "2020-06-10T12:45:22.833Z",
		__v: 0,
		gamePlay: ObjectId("5ee0d5e21ee3502a809c14bb"),
	},
	{
		_id: ObjectId("5ee0e991c400e9361c24e7e8"),
		playerOne: "Admin",
		playerTwo: "User",
		initiated: true,
		winner: "",
		drawOffered: false,
		createdAt: "2020-06-10T14:09:21.081Z",
		updatedAt: "2020-06-10T14:09:50.346Z",
		__v: 0,
		gamePlay: ObjectId("5ee0e9aec400e9361c24e7e9"),
	},
];
