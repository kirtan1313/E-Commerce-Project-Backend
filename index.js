const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const PORT = process.env.PORT || 3000
const express_session = require('express-session');
const bodyparser = require('body-parser');
const cors = require('cors');
const db = require('./DB/Server.js')
const ProductRouet = require('./routes/route.js')
const path = require('path')
const multer = require('./Multer/multer.js')


app.use(express.json());
app.use('/uplodFile', express.static(path.join(__dirname, 'uplodFile')));
app.use('/uplodFile', express.static('uplodFile'));

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/',ProductRouet)

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Running  http://localhost:${PORT}`);
    } else {
        console.log("Not Connected", err);
    }
})