const User = require('../models/User.js');
const bcrypt = require('bcryptjs');

const CheckerController = {
    //Sería iniciar la partida. Tiene que tener token para que no se pueda acceder a ellos desde el postman
    async register(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 9)
            const user = await User.create(req.body);
            res.status(201).send({
                user,
                message: 'Usuario creado con éxito'
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'Hubo un problema al intentar registrar al usuario',
                error
            })
        }
    },
    async login(req, res) {
        try {
            const user = await User.findOne({
                email: req.body.email
            });
            if (!user) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectos'
                })
            }
            const isMatch = bcrypt.compare(req.body.password, user.password);
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Email o contraseña incorrectos'
                })
            }
            const token = jwt.sign({ _id: user._id }, jwt_auth_secret);
            if (user.tokens.length > 4) { user.tokens.shift() }
            user.tokens.push(token);
            await user.replaceOne(user);
            res.send({
                user,
                token,
                message: 'Conectado con éxito'
            })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'Hubo un problema al intentar conectar al usuario'
            })
        }
    },
    logout(req, res) {
        User.findByIdAndUpdate(req.user._id, { $pull: { tokens: req.headers.authorization } })
            .then(() => res.send({ message: 'Desconectado con éxito' }))
            .catch(error => {
                console.error(error)
                res.status(500).send({
                    message: 'Hubo un problema al intentar conectar al usuario'
                })
            })
    },



    async getMyInfo(req, res) {
        try {
            const user = await User.findById(req.user._id)
            res.send(user)
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'Hubo un problema al obtener tu perfil',
                error
            })
        }

    },
    // async follow(req, res) {
    //     try {
    //         const isSameUser = req.params.user_id === '' + req.user._id;
    //         const isAlreadyFollowingUser = req.user.following.includes(req.params.user_id);
    //         let user = req.user;
    //         if (!isAlreadyFollowingUser && !isSameUser) {
    //             user = await User.findByIdAndUpdate(req.user._id, {
    //                 $push: {
    //                     following: req.params.user_id
    //                 }
    //             }, {
    //                 new: true
    //             });
    //             console.log(user.following)
    //             await User.findByIdAndUpdate(req.params.user_id, {
    //                 $push: {
    //                     followers: req.user._id
    //                 }
    //             });
    //         }
    //         console.log(user.following)
    //         res.send(user)
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'There was a problem trying to follow'
    //         })
    //     }
    // },
    // async unfollow(req, res) {
    //     try {
    //         const isSameUser = req.params.user_id === '' + req.user._id;
    //         const isAlreadyFollowingUser = req.user.following.includes(req.params.user_id);
    //         let user = req.user;
    //         if (isAlreadyFollowingUser && !isSameUser) {
    //             user = await User.findByIdAndUpdate(req.user._id, {
    //                 $pull: {
    //                     following: req.params.user_id
    //                 }
    //             }, {
    //                 new: true
    //             });
    //             console.log(user.following)
    //             await User.findByIdAndUpdate(req.params.user_id, {
    //                 $pull: {
    //                     followers: req.user._id
    //                 }
    //             });
    //         }
    //         console.log(user.following)
    //         res.send(user)
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send({
    //             message: 'There was a problem trying to unfollow'
    //         })
    //     }
    // },
    async uploadImage(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.user._id, { image: req.file.filename }, { new: true });
            res.send({ message: "Imagen actualizada.", user })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'Hubo un problema al actualizar la imagen'
            })
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findByIdAndUpdate(req.user._id, { ...req.body }, { new: true });
            res.send({ message: "Usuario actualizado", user })
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'Hubo un problema al actualizar el usuario'
            })
        }
    },
    async deleteUser(req, res) {
        try {
            await User.findByIdAndRemove(req.user._id);
        } catch (error) {
            console.error(error)
            res.status(500).send({
                message: 'No se pudo borrar el usuario'
            })
        }
    },
    async sendForgottenMail(req, res) {
        try {
            const user = await User.findOne({ name: req.body.name });
            const userId = user._id;
            const passToken = jwt.sign({ userId }, jwt_auth_secret, { expiresIn: '24h' });
            const url = FRONT_URI + "/recover/" + passToken;
            await transporter.sendMail({
                to: user.email,
                subject: 'Recupera tu contraseña de Play 2 Games',
                html: `
                        <h3>¿Te has olvidado de tu contraseña?</h3>
                        <br>
                        <p>Pues vas a tener que crear una nueva:<br>
                        Para eso tienes que hacer click <a href="${url}">aquí</a> e introducir una nueva contraseña.</p>
                        <br>
                        <p>Recordatorio: El link expira en 24 horas... Si no creas una nueva contraseña antes, tendrás que volver a solicitar otro link de confirmación</p>
                        `
            })
            res.send({ message: "Revisa tu dirección de correo" })
        } catch (error) {
            res.status(500).send({ message: "No existe ese usuario", error })
        }
    },
    async recoverPassword(req, res) {
        try {
            const payload = jwt.verify(req.body.token, jwt_auth_secret);
            const password = await bcrypt.hash(req.body.password, 9);
            const user = await User.findByIdAndUpdate(payload.userId, { password }, { new: true });
            res.send({ message: "Contraseña cambiada", user })
        } catch (error) {
            res.status(500).send({ message: "Problemas al cambiar la contraseña", error })
        }
    },
    async newPassword(req, res) {
        try {
            const user = await User.findById(req.user._id).lean()
            const isMatch2 = user.password === req.body.actualPass;
            const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
            if (!isMatch || !isMatch2) { return res.status(400).send({ message: 'Contraseña incorrecta' }) }
            else {
                const password = await bcrypt.hash(req.body.newPassword, 9);
                const user = await User.findByIdAndUpdate(req.user._id, { password }, { new: true });
                res.send({ message: "Contraseña cambiada", user })
            }
        } catch (error) {
            res.status(500).send({ message: "Problemas al obtener la contraseña", error })
        }
    }
    // async getPassword(req, res) {
    //     try {
    //         const user = await User.findById(req.user._id).lean()
    //         res.send(user.password)
    //     } catch (error) {
    //         res.status(500).send({ message: "Problemas al obtener la contraseña", error })
    //     }
    // }

}
module.exports = CheckerController;