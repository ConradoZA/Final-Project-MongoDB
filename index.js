require('./config/mongoose.js');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const gamesRouter = require('./routes/game');
const playsRouter = require('./routes/play');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.options('/*', (req, res) => res.send());

app.use('/checkers/games', gamesRouter);
app.use('/checkers/plays', playsRouter);

app.listen(PORT, () => console.log('server running on port: ' + PORT));