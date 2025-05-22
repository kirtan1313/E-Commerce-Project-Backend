const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mkirtan013:KvJNO0YeJrikMEFt@cluster0.egcsg.mongodb.net/E-Commerce')
    .then(() => console.log('Data Base Connect'))
    .catch(() => {
        console.log("DataBase Not Connected");
    })