const express = require('express');
const {
  getArticles,
  getArticleByName,
  createArticle,
  updateArticle,
  deleteArticle,
} = require('../controllers/articleController');
const auth = require('../middleware/auth');

const router = express.Router();

// Public endpoints
router.get('/', getArticles);
router.get('/slug/:name', getArticleByName);

// Protected endpoints (require valid JWT and admin role)
router.post('/', auth.verifyToken, auth.ensureAdmin, createArticle);
router.put('/:id', auth.verifyToken, auth.ensureAdmin, updateArticle);
router.delete('/:id', auth.verifyToken, auth.ensureAdmin, deleteArticle);

module.exports = router;