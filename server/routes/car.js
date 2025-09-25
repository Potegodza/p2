const express = require('express');
const router = express.Router();
const { authCheck, adminCheck } = require('../middlewares/authCheck');
const {
    create,
    list,
    read,
    update,
    remove,
    searchFilters,
    createImages,
    removeImage,
    listBy
} = require('../controllers/car');

// === Public Routes === (ทุกคนเข้าถึงได้)
router.get('/cars/:count', list);
router.get('/car/:id', read);
router.post('/search/filters', searchFilters);
router.post('/carby', listBy);

// === Admin Only Routes === (เฉพาะ Admin)
router.post('/car', authCheck, adminCheck, create);
router.put('/car/:id', authCheck, adminCheck, update);
router.delete('/car/:id', authCheck, adminCheck, remove);
router.post('/images', authCheck, adminCheck, createImages);
router.post('/removeimages', authCheck, adminCheck, removeImage);

module.exports = router;