# Play 2 Games

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/p2g_title.jpg" width="80%"></p>

This is the MongoDB part of the Backend of my project "Play 2 Games".<br />
It's a web where you can play 2-player games asynchronously with other users.

### Coded with 📋

* [Mongoose.js](https://mongoosejs.com/)

### Getting started 🔧

_You want to try this poject in your computer?<br />
Then you need to download too [The Backend in PHP/Laravel](https://github.com/ConradoZA/Final-Project-MySQLDB) and [The Frontend in React](https://github.com/ConradoZA/Final-Project-Frontend).<br />
And of course, have [node.js](https://nodejs.org/en/) installed in your computer._

First run
```bash
npm install
```
to install all the node_modules.<br />
Then edit "config copy" folder to "config" and configure your own variables in the "mongoose.js" file inside it, if you need it.<br />
<br />
Then run
```bash
npm start
```
and your server will be listening in http://localhost:3001.<br />
<br />
Remember to start the other backend and the frontend too!

### Seeding 🌱

If you want to seed the database with some initial info, you'll have to install

* [Mongo-seeding](https://github.com/pkosiec/mongo-seeding)

I have installed it as **cli** and all I have to do is run
```bash
seed -u mongodb://127.0.0.1:27017/play-games --drop-database ./seeder
```
You'll have to adapt it if you change your database name and/or port.

## Show and Tell 🚀

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/p2g_image_change.gif" width="400"></p>

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/p2g_turn_move.gif" width="400"></p>

<p align="center"><img src="https://github.com/ConradoZA/Readme-assets/blob/master/p2g_history.gif" width="400"></p>


---
⌨️ with ❤️ and 💧 by [ConradoZA](https://github.com/ConradoZA) 😉