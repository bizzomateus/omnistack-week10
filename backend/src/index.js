const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://omni-bizzo:omnibizzo_31@cluster0-7e90r.mongodb.net/week10?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors());
app.use(express.json()); // configura express para entender requisições com corpo json
app.use(routes);


app.listen(3333);
