const mongoose = require('mongoose');

const mongo_URI = process.env.NODE_ENV === 'production' ?
//ToDo: changes to your own variables
    'mongodb + srv ://your Atlas server or whatever'
    : 'mongodb://localhost:27017/your-mongoDB'
mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Successfully conected to MongoDB'))
    .catch(console.error)