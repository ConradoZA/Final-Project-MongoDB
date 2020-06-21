const mongoose = require('mongoose');

const mongo_URI =
    process.env.NODE_ENV === 'production' ?
        'jaja' : 'mongodb://localhost:27017/play-games';

mongoose.connect(mongo_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
    .then(() => console.log('Successfully conected to MongoDB'))
    .catch(console.error)