const mongoose = require('mongoose');
const CheckersGameSchema = new mongoose.Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String,
        required: true
    },
    turn: {
        type: Number,
        required: true
    },
    past: {
        type: [[Array]],
        required: true
    },
    present: {
        type: [[]],
        required: true
    },
    future: {
        type: [[]],
        required: true
    },
    whitePCaptured: Number,
    blackPCaptured: Number,
    winner: String
});
CheckersGameSchema.methods.toJSON = function (params) {
    const game = this._doc;
    delete game._id;
    delete game.__v;
    return game;
}
const Checkers = mongoose.model('CheckersGame', CheckersGameSchema);
module.exports = Checkers;