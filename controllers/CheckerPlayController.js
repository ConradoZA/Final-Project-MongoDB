const CheckersPlay = require("../models/CheckersPlay.js");

const CheckerPlayController = {
	async getPlay(req, res) {
		try {
			const turn = await CheckersPlay.findById(req.params.id);
			res.send(turn);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al buscar la partida",
				error,
			});
		}
	},
	async initialize(req, res) {
		try {
			const initial = {
				turn: 1,
				past: [],
				present: [	[9, 9, "bp", 99],
				[7, 9, "bp", 97],
				[5, 9, "bp", 95],
				[3, 9, "bp", 93],
				[1, 9, "bp", 91],
				[8, 8, "bp", 88],
				[6, 8, "bp", 86],
				[4, 8, "bp", 84],
				[2, 8, "bp", 82],
				[0, 8, "bp", 80],
				[9, 7, "bp", 79],
				[7, 7, "bp", 77],
				[5, 7, "bp", 75],
				[3, 7, "bp", 73],
				[1, 7, "bp", 71],
				[8, 6, "bp", 68],
				[6, 6, "bp", 66],
				[4, 6, "bp", 64],
				[2, 6, "bp", 62],
				[0, 6, "bp", 60],
				[9, 3, "wp", 39],
				[7, 3, "wp", 37],
				[5, 3, "wp", 35],
				[3, 3, "wp", 33],
				[1, 3, "wp", 31],
				[8, 2, "wp", 28],
				[6, 2, "wp", 26],
				[4, 2, "wp", 24],
				[2, 2, "wp", 22],
				[0, 2, "wp", 20],
				[9, 1, "wp", 19],
				[7, 1, "wp", 17],
				[5, 1, "wp", 15],
				[3, 1, "wp", 13],
				[1, 1, "wp", 11],
				[8, 0, "wp", 8],
				[6, 0, "wp", 6],
				[4, 0, "wp", 4],
				[2, 0, "wp", 2],
				[0, 0, "wp", 0],],
				whitePCaptured: 0,
				blackPCaptured: 0,
				captureTimer: 0,
			};
			const turnZero = await CheckersPlay.create(initial);
			// res.send(turnZero);
			return turnZero;
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "No se pudo empezar la partida",
				error,
			});
		}
	},
	async newTurn(req, res) {
		try {
			const oldPlay = await CheckersPlay.findById(req.body.id);
			const past = oldPlay.past;
			past.push(oldPlay.present);
			const newPlay = { ...req.body, ...past };
			const newTurn = await CheckersPlay.findByIdAndUpdate(req.body.id, newPlay, {
				new: true,
			});
			res.send(newTurn);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "No se pudo actualizar la partida",
				error,
			});
		}
	},
};
module.exports = CheckerPlayController;
