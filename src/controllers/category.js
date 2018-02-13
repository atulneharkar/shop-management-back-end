import Category from '../models/category';

/**
 * controller for create category
 * POST /category/create
 */
export const createCategory = (req, res) => {
  var category = new Category({
    'name': req.body.name
  }); 

  category.save().then(() => {
    res.send(category);
  }).catch((e) => {
    res.status(400).send(e);
  });
};

/**
 * controller to get all/specific category
 * GET /category/
 * search all/id
 */
export const getCategoryList = (req, res) => {
  const search = {};

  Category.find(search)
  .then(category => {
    res.status(200).send(category);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to get specific category info
 * GET /category/:id
 */
export const getCategoryByID = (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      if(!category) {
        return Promise.reject({'status': 404});
      }

      res.status(200).send(category);
    })
    .catch(err => {
      res.status(err.status || 400).send();
    });
};

/**
 * controller to update existing category
 * PUT /category/:id
 */
export const updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, {
    '$set': req.body
  }, {
    'new': true,
    'runValidators': true,
    'context': 'query'
  })
  .then(updatedCategory => {
    res.status(200).send(updatedCategory);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};

/**
 * controller to delete existing category
 * DELETE /category/:id
 */
export const removeCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
  .then((category) => {
    res.status(200).send(category);
  })
  .catch(err => {
    res.status(400).send(err);
  });
};
