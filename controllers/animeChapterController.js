const Chapter = require("../models/animeChapters");
const { chapterService } = require("../services");

const createChapter = async (req, res) => {
    try {
        const {title, description, url, serieId} = req.body;
        const result = await chapterService.createChapter(title, description, url, serieId);
        res.status(result.status).send(result);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getChapter = async (req, res) => {
  try{
      const { serieOwner } = req.query;
      const result = await chapterService.getChapter({ serieOwner });
      res.status(result.status).send(result);
  }catch(error){
      res.status(500).send("Se produjo un error al listar los capítulos.");
  }
}

const updateChapter = async (req, res) => {
  try{
    await Chapter.updateOne({ _id: req.params.id }, { $set: { ...req.body } });
    res.status(201).send("Capitulo actualizado exitosamente!");
  }catch (error) {
    res.status(500).send("Se produjo un error al actualizar el capitulo.");
  }
};

const deleteChapter = async (req, res) => {
  try {
    await Chapter.findByIdAndDelete(req.params.id);
    res.status(201).send("Capitulo eliminado exitosamente!");
  } catch (error) {
    res.status(500).send("Se produjo un error al borrar el capitulo.");
  }
};

module.exports = {
  createChapter,
  getChapter,
  updateChapter,
  deleteChapter,
};