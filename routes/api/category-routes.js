const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products

  Category.findAll({
    include: [Product]
  }).then((allcategories) =>{
    res.json(allcategories);

  }) .catch((err)=>{
     res.json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findByPk(req.params.id, {
    include: [Product]
  }).then((categoryID) =>{
    res.json(categoryID);
 
  }) .catch((err)=>{
     res.json(err);
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
  })

  .then((newcategory) =>{

    res.json(newcategory);

  })
  .catch((err) =>{
     res.json(err);
  });

});

router.put('/:id', (req, res) => {
  // update a category by its `id` value

  Category.update(req.body,{
    where:{
      id:req.params.id,
    }
  }) .then((updatedbyID) =>{
        res.json(updatedbyID);
  }).catch((err) =>{
    res.json(err);
 });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value

  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
   .then((deletedCategory) =>{
     res.json(deletedCategory);
   }).catch((err) =>{
    res.json(err);
 });

  
});

module.exports = router;
