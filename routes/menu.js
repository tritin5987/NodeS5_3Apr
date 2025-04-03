const express = require('express');
const router = express.Router();
const { getMenuTree, renderMenuHTML } = require('../utils/menu');

// Route: /menu/json
router.get('/json', async (req, res, next) => {
    try {
      const tree = await getMenuTree();
      res.json({
        success: true,
        data: tree
      });
    } catch (err) {
      next(err);
    }
  });
  
  // Route: /menu/html
  router.get('/html', async (req, res, next) => {
    try {
      const tree = await getMenuTree();
      const html = renderMenuHTML(tree);
      res.send(html);
    } catch (err) {
      next(err);
    }
  });
  
  module.exports = router;
