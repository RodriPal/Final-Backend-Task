const Chapter = require("../models/animeChapters");
const Serie = require("../models/animeSeries");

const createChapter = async (title, description, url, serieId) => {
  let newChapter;
  try {
    const serieFound = await Serie.findById(serieId);
    if (!serieFound) {
      return { status: 404, message: "La serie no existe en la bd" };
    }
    newChapter = new Chapter({ title, description, url, serieOwner: serieId });
    await newChapter.save();
    serieFound.chapters.push(newChapter._id);
    await serieFound.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
  return { status: 200, message: "El capitulo fue creado exitosamente", newChapter };
};

const getChapter = async (serieOwner) => {
  let result;
  try{
      const chapters = await Chapter.find(serieOwner);
      result = { status: 200, chapters }
  }catch(error){
    throw error;
  }
  return result;
}

const updateChapter = async (id) => {
  let result;
  const { title, description, url } = Chapter;
  try {
    const chapter = await Chapter.findByIdAndUpdate({ _id: id }, { $set: { title, description, url }});
    result = { status: 201, chapter };
  } catch (error) {
    throw error;
  }
  return result;
};

const deleteChapter = async (id) => {
  let result;
  try {
    const chapter = await Chapter.findByIdAndDelete({ _id: id });
    result = { status: 201, chapter };
  } catch (error) {
    throw error;
  }
  return result;
};

module.exports = {
  createChapter,
  getChapter,
  updateChapter,
  deleteChapter,
};