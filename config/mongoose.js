const mongoose = require('mongoose');

const mongo_URI =
    process.env.NODE_ENV === 'production' ?
        'mongodb+srv://Conrado:JBIDqc8q4DRCgeeA@cza-cko71.mongodb.net/play-two-games?retryWrites=true&w=majority' : 'mongodb://localhost:27017/play-games';

mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Successfully conected to MongoDB'))
    .catch(console.error)