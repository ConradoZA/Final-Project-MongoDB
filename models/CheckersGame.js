const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const CheckersGameSchema = new mongoose.Schema({
    playerOne: {
        type: String,
        required: true
    },
    playerTwo: {
        type: String,
        required: true
    },
    initiated: {
        type: Boolean,
        required: true
    },
    winner: String,
    drawOffered:Boolean,
    gamePlay:{
        type:ObjectId,
        ref:"CheckersPlay"
    }
}, {
    timestamps: true
});
// CheckersGameSchema.methods.toJSON = function (params) {
//     const game = this._doc;
//     delete game._id;
//     delete game.__v;
//     return game;
// }
const CheckersGame = mongoose.model('CheckersGame', CheckersGameSchema);
module.exports = CheckersGame;