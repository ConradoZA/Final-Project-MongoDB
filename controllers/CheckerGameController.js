const CheckersGame = require("../models/CheckersGame.js");
var plays = require("./CheckerPlayController");

const CheckerGameController = {
	async sendNewGameInvitation(req, res) {
		try {
			console.log(req.body);
			//NECESITO EL NOMBRE DE USUARIO DEL JUGADOR1 Y DEL 2, INITIATED=FALSE Y GAMEPLAY VACÍO
			const invite = await CheckersGame.create(req.body);
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
	async acceptNewGame(req, res) {
		try {
			console.log(req.body);
			// if (req.body.answer === true) {
			//const play = await plays.initialize();
			//console.log(play)
			//     const game = await CheckersGame.findByIdAndUpdate(req.body.id, { initiated: true, gamePlay: play._id }, { new: true });
			//     res.send({ message: "Juego aceptado", game });
			// } else {
			//     await CheckersGame.findOneAndDelete({ _id: req.body._id });
			// await User.findByIdAndRemove(req.user._id); OTRA OPCION
			//     res.send({ message: "Juego rechazado" });
			// }
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
};
module.exports = CheckerGameController;
