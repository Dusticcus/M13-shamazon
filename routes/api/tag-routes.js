const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      // include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.body.id, {
      // include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  /* req.body should look like this...
  {
    category_name: "Clothing"
  }
*/
  // create a new category
  Tag.create(req.body)
    .then((newTag) => res.status(200).json(newTag))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  ;
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(tagData);

  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    res.status(200).json(await Tag.destroy({
      where: {
        id: req.body.id
      }
    }));
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
