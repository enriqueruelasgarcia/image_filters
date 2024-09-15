const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Image = require('../models/image')
const upload = require('../multer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require('dotenv').config();

router.post('/register', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        const result = await user.save();
        const { password, ...data } = result.toObject();
        res.send(data);
        console.log(result)
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).send({ message: 'Error registering user', error: error.message });
    }
});

router.post('/login', async(req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(404).send({ msg: "User not found" })
    }

    if (!await bcrypt.compare(req.body.password, user.password)) {
        return res.status(400).send({ msg: "Invalid username or password" })
    }
    const token = jwt.sign({
        _id: user.id
    }, process.env.SECRET)

    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 //1day
    })

    res.send({
        msg: "Success"
    })
})

router.get('/user', async(req, res) => {
    try {
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, process.env.SECRET)
        if (!claims) {
            return res.status(401).send({ msg: "Unauthenticated" })
        }

        const user = await User.findOne({ _id: claims._id })

        const { password, ...data } = await user.toJSON()

        res.send(data)
    } catch (e) {
        res.status(401).send({ msg: "Unauthenticated" })
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })

    res.send({
        msg: "Log Out"
    })
})

router.post('/upload', upload.single('image'), async(req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).send({ msg: 'User ID is required' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ msg: 'User not found' });
        }

        const image = new Image({
            data: req.file.buffer,
            contentType: req.file.mimetype, // image format
            user: userId, // image referes to the user
        });

        const result = await image.save();
        res.send({ msg: 'Image uploaded successfully', id: result._id });
    } catch (error) {
        res.status(500).send({ msg: 'Failed to upload image', error: error.message });
    }
});

router.get('/user-images/:userId', async(req, res) => {
    try {
        const { userId } = req.params;
        const images = await Image.find({ user: userId });

        // Convert data image to 64base
        const imagesWithBase64 = images.map(image => ({
            _id: image._id,
            data: image.data.toString('base64'),
            contentType: image.contentType
        }));

        res.send(imagesWithBase64);
    } catch (error) {
        res.status(500).send({ msg: 'Failed to retrieve images', error: error.message });
    }
});

module.exports = router;