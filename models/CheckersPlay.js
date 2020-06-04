const mongoose = require('mongoose');
const CheckersPlaySchema = new mongoose.Schema({
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
    whitePCaptured: Number,
    blackPCaptured: Number,
    captureTimer: Number
}, {
    timestamps: true
});
// CheckersPlaySchema.methods.toJSON = function (params) {
//     const play = this._doc;
//     delete play._id;
//     delete play.__v;
//     return play;
// }
const CheckersPlay = mongoose.model('CheckersPlay', CheckersPlaySchema);
module.exports = CheckersPlay;