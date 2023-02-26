const express = require('express');
const routes = express.Router();

const { userController, animeChapterController , animeSeriesController } = require('../controllers');
const { isAuth } = require('../middlewares');

const { userSchema } = require('../controllers/schemas');

routes.post('/login', userSchema, userController.login);
routes.post('/register', userController.register);

routes.post("/serie", animeSeriesController.createSerie);
routes.get("/serie", animeSeriesController.getSerie);
routes.get("/serie/:id", animeSeriesController.getSerieById);
routes.put("/serie/:id", animeSeriesController.updateSerie);
routes.delete("/serie/:id", animeSeriesController.deleteSerie);

routes.post("/chapter", animeChapterController.createChapter);
routes.get("/chapter", animeChapterController.getChapter);
routes.put("/chapter/:id", animeChapterController.updateChapter);
routes.delete("/chapter/:id", animeChapterController.deleteChapter);

routes.get('/hi', isAuth, userController.konNichiwa);

module.exports = routes;