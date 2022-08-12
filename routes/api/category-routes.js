const router = require('express').Router();
const { response } = require('express');
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({

    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.body.id, {
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
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
  Category.create(req.body)
    .then((category) => {
      if (category) {
        return ProductTag.bulkCreate(category);
      }

    })
    .then((newCategory) => res.status(200).json(newCategory))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
  ;
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update(req.body, {
      where: {
        id: req.body.id,
      },
    });
    res.status(200).json(categoryData);

  }
  catch (err) {
    res.status(500).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    res.status(200).json(await Category.destroy({
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
