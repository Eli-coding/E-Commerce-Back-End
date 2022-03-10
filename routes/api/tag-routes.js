const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  console.log("hello world");
  Tag.findAll({
     include: [{
       model:Product,
       through:ProductTag
     }]
  }).then((alltags) =>{
    console.log(alltags);
    res.json(alltags);

  }) .catch((err)=>{
res.status(500).json(err);
     //res.json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  
  Tag.findByPk(req.params.id, {
    include: [Product]
  }).then((tagID) =>{
    res.json(tagID);
 
  }) .catch((err)=>{
     res.json(err);
  })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })

  .then((newtag) =>{

    res.json(newtag);

  })
  .catch((err) =>{
     res.json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body,{
    where:{
      id:req.params.id,
    }
  }) .then((updatebyID) =>{
        res.json(updatebyID);
  }).catch((err) =>{
    res.json(err);
 });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((deletedtag) =>{
     res.json(deletedtag);
   }).catch((err) =>{
    res.json(err);
});

});

module.exports = router;
