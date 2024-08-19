var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel');
var BrandModel = require('../models/BrandModel');

// Route để hiển thị danh sách đồ chơi
router.get('/', async (req, res) => {
   try {
       var toys = await ToyModel.find({}).populate('brand');
       res.render('toy/index', { toys });
   } catch (err) {
       console.error('Failed to retrieve toys. Error:', err);
       res.status(500).send('An error occurred while retrieving toys.');
   }
});

// Route để xử lý tìm kiếm
router.post('/search', async (req, res) => {
   var keyword = req.body.keyword.trim(); // Loại bỏ khoảng trắng thừa ở đầu và cuối từ khóa
   console.log(`Received search keyword: "${keyword}"`); // Log từ khóa tìm kiếm

   try {
       let toys;
       if (keyword) {
           // Tìm kiếm các sản phẩm theo tên, không phân biệt chữ hoa/chữ thường
           toys = await ToyModel.find({ name: new RegExp(keyword, "i") }).populate('brand');
           console.log(`Found ${toys.length} toys matching the keyword "${keyword}"`); // Log số lượng sản phẩm tìm thấy
       } else {
           // Nếu không có từ khóa, trả về toàn bộ danh sách đồ chơi
           toys = await ToyModel.find({}).populate('brand');
           console.log('No keyword provided. Returning all toys.');
       }

       // Log chi tiết các sản phẩm được tìm thấy
       toys.forEach((toy, index) => {
           console.log(`Toy ${index + 1}: ${toy.name} (${toy.brand.name})`);
       });

       res.render('toy/index', { toys });
   } catch (err) {
       console.error('Search failed. Error:', err);
       res.status(500).send('An error occurred while searching for toys.');
   }
});

// Route để thêm đồ chơi
router.get('/add', async (req, res) => {
    try {
        var brands = await BrandModel.find({});
        res.render('toy/add', { brands });
    } catch (err) {
        console.error('Failed to retrieve brands for adding toy. Error:', err);
        res.status(500).send('An error occurred while preparing to add a toy.');
    }
});

router.post('/add', async (req, res) => {
    try {
        var toy = req.body;
        await ToyModel.create(toy);
        res.redirect('/toy');
    } catch (err) {
        console.error('Failed to add toy. Error:', err);
        res.status(500).send('An error occurred while adding the toy.');
    }
});

// Route để chỉnh sửa đồ chơi
router.get('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var toy = await ToyModel.findById(id);
        var brands = await BrandModel.find({});
        res.render('toy/edit', { toy, brands });
    } catch (err) {
        console.error('Failed to retrieve toy or brands for editing. Error:', err);
        res.status(500).send('An error occurred while preparing to edit the toy.');
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
        var id = req.params.id;
        var toy = req.body;
        await ToyModel.findByIdAndUpdate(id, toy);
        res.redirect('/toy');
    } catch (err) {
        console.error('Failed to edit toy. Error:', err);
        res.status(500).send('An error occurred while editing the toy.');
    }
});

// Route để xóa đồ chơi
router.get('/delete/:id', async (req, res) => {
    try {
        var id = req.params.id;
        await ToyModel.findByIdAndDelete(id);
        res.redirect('/toy');
    } catch (err) {
        console.error('Failed to delete toy. Error:', err);
        res.status(500).send('An error occurred while deleting the toy.');
    }
});

// Route để xóa tất cả đồ chơi
router.get('/deleteall', async (req, res) => {
    try {
        await ToyModel.deleteMany();
        res.redirect('/toy');
    } catch (err) {
        console.error('Failed to delete all toys. Error:', err);
        res.status(500).send('An error occurred while deleting all toys.');
    }
});

module.exports = router;
