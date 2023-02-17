const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const routes = require('./routes');

const app = express();

app.use(express.json());

dotenv.config();

app.use("/api", routes);

mongoose.connect(
    process.env.MONGO_DB,
    { useNewUrlParser: true },
    (error, result) => {
        if (error) {
            return console.log(`Error al conectarse a la base de datos ${error}`);
        }
        console.log('Conexion a la base de datos establecida.');
        app.listen(process.env.PORT, () => {
            console.log(`Server Online On Port ${process.env.PORT}`);
        });
    }
);