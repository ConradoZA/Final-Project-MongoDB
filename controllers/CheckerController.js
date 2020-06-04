const CheckersGame = require('../models/CheckersGame.js');
const CheckersPlay = require('../models/CheckersPlay.js');

const CheckerController = {
    SEND_ERROR(error, message) {
        console.error(error);
        res.status(500).send({
            message,
            error
        })
    },
    async sendNewGameInvitation(req, res) {
        try {
            console.log(req.body);
            //NECESITO EL NOMBRE DE USUARIO DEL JUGADOR1 Y DEL 2, INITIATED=FALSE Y GAMEPLAY VACÍO
            const invite = await CheckersGame.create(req.body);
            res.status(201).send({
                invite,
                message: 'Invitación enviada'
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Hubo un problema al crear la invitación',
                error
            })
        }
    },
    async acceptNewGame(req, res) {
        try {
            console.log(req.body);
            // if (answer === true) {
            //NECESITO PAST Y PRESENT, TURN=1, CAPTURED=0, TIMER=1
            // const play = await CheckersPlay.create(req.body.turn);
            //     const game = await CheckersGame.findByIdAndUpdate(req.body._id, { initiated: true, gamePlay: play._id }, { new: true });
            //     res.send({ message: "Juego aceptado", game });
            // } else {
            //     await CheckersGame.findOneAndDelete({ _id: req.body._id });
            // await User.findByIdAndRemove(req.user._id); OTRA OPCION
            //     res.send({ message: "Juego rechazado" });
            // }
        } catch (error) {
            this.SEND_ERROR(error, 'Hubo un problema al enviar la respuesta');
        }
    },
    async getGame(req, res) {
        try {
            const game = await CheckersGame.findById(req.params.id)
                .populate('gamePlay');
            res.send(game);
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Hubo un problema al buscar el juego',
                error
            })
        }
    },
}
module.exports = CheckerController;