const express = require('express');
const tagsRouter = express.Router();

tagsRouter.use((req, res, next) => {
  console.log("A request is being made to /tags");

  next(); 
});

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.get('/', async (req, res) => {
  const tag = await getAllTags();
  console.log("Tags", tag);

  res.send({
    tag
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.body;// read the tagname from the params
  try {
    const tagPost = await getPostsByTagName (tagName) // use our method to get posts by tag name from the db
    // send out an object to the client { posts: // the posts }
    if (tagPost){
      res.send({posts: tagPost});
  } else {
      next({
      name :"TagCreationError",
      message: "Can't create tag",
  });
  // otherwise, next an appropriate error object 
} } catch ({ name, message }) {
  next({ name, message });
}
});

module.exports = tagsRouter;