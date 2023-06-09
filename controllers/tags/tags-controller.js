import * as tagDao from "./tags-dao.js"

const TagController = (app) => {
    app.get('/api/tags', findTags);
  app.get('/api/tags/:tid', findTagById);
      app.get('/api/tags/name/:name', findTagByName);
    app.post('/api/tags', createTag);
}

const findTags = async (req, res) => {
  const tags = await tagDao.findTags()
  res.json(tags)
}
const findTagByName = async (req, res) => {
  const tags = await tagDao.findTagsByName(req.params.name)
  res.json(tags)
}



const findTagById = async (req, res) => {
  const tags = await tagDao.findTagsById(req.params.tid)
  res.json(tags)
}

const createTag = async (req, res) => {
  const newTag = req.body;
  const insertedTag = await tagDao
                             .createTags(newTag);
  res.json(insertedTag);
}


export default TagController