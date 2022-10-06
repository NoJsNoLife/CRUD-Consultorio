const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Consultorio-app')
    .then(db => console.log('DB is connected'))
    .catch(err => console.log(e));