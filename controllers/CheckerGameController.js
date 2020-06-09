const CheckersGame = require("../models/CheckersGame.js");
var plays = require("./CheckerPlayController");

const CheckerGameController = {
	async sendNewGameInvitation(req, res) {
		try {
			const newGame = {
				playerOne: req.body.playerOne,
				playerTwo: req.body.playerTwo,
				initiated: false,
				winner: "",
				drawOffered: false,
			};
			const invite = await CheckersGame.create(newGame);
			res.status(201).send({
				invite,
				message: "Invitación enviada",
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al crear la invitación",
				error,
			});
		}
	},
	async answerInvitation(req, res) {
		try {
			if (req.body.answer === "yes") {
				const play = await plays.initialize();
				const game = await CheckersGame.findByIdAndUpdate(
					req.body.gameId,
					{ initiated: true, gamePlay: play._id },
					{ new: true }
				);
				res.send({ message: "Juego aceptado", game });
			} else if (req.body.answer === "no") {
				await CheckersGame.findByIdAndDelete(req.body.gameId);
				res.send({ message: "Juego rechazado" });
			}
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al enviar la respuesta",
				error,
			});
		}
	},
	async getGame(req, res) {
		try {
			const game = await CheckersGame.findById(req.params.id).populate("gamePlay");
			res.send(game);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al buscar el juego",
				error,
			});
		}
	},
	async getAll(req, res) {
		try {
			const asPlayerOne = await CheckersGame.find({
				playerOne: req.params.username,
			}).populate("gamePlay");
			const asPlayerTwo = await CheckersGame.find({
				playerTwo: req.params.username,
			}).populate("gamePlay");
			const all = asPlayerOne.concat(asPlayerTwo);
			res.send(all);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al buscar los juegos",
				error,
			});
		}
	},
	async drawOffered(req, res) {
		try {
			const draw = await CheckersGame.findOneAndUpdate(
				{ gamePlay: req.body.playId },
				{ drawOffered: true },
				{ new: true }
			);
			res.send(draw);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al enviar la oferta",
				error,
			});
		}
	},
	async drawAccepted(req, res) {
		try {
			const draw = await CheckersGame.findByIdAndUpdate(
				req.body.gameId,
				{ winner: "draw" },
				{ new: true }
			);
			res.send(draw);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al enviar la oferta",
				error,
			});
		}
	},
	async drawRejected(req, res) {
		try {
			const draw = await CheckersGame.findByIdAndUpdate(
				req.body.gameId,
				{ drawOffered: false },
				{ new: true }
			);
			res.send(draw);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al enviar la oferta",
				error,
			});
		}
	},
	async surrenderGame(req, res) {
		try {
			const lose = await CheckersGame.findOneAndUpdate(
				{ gamePlay: req.body.playId },
				{ winner: req.body.winner },
				{ new: true }
			);
			res.send(lose);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al enviar la rendición",
				error,
			});
		}
	},
	async finishGame(req, res) {
		try {
			const ended = await CheckersGame.findByIdAndUpdate(
				req.body.gameId,
				{ winner: req.body.winner },
				{ new: true }
			);
			res.send(ended);
		} catch (error) {
			console.error(error);
			res.status(500).send({
				message: "Hubo un problema al cerrar la partida",
				error,
			});
		}
	},
};
module.exports = CheckerGameController;
