// gigs.js
const express = require('express');
const router = express.Router();
const list = require('../models/list');
const { Op } = require('sequelize');

// Get all data or search by name
router.get('/', async (req, res) => {
    const { name } = req.query;

    try {
        let lists;
        if (name) {
            lists = await list.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`
                    }
                }
            });
        } else {
            lists = await list.findAll();
        }
        res.render('index', { lists: lists, searchTerm: name });

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Add new data
router.post('/', async (req, res) => {
    const { name, age, country, city } = req.body;
    try {
        await list.create({ name, age, country, city });
        res.redirect('/gigs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating data');
    }
});

// Render add form
router.get('/add', (req, res) => {
    res.render('add');
});

// Render update form
router.get('/update/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await list.findByPk(id);
        res.render('update', { data });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching data for update');
    }
});

// Update data
router.post('/update/:id', async (req, res) => {
    const { name, age, country, city } = req.body;
    const id = req.params.id;
    try {
        await list.update({ name, age, country, city }, { where: { id } });
        res.redirect('/gigs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating data');
    }
});

// Delete data
router.post('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await list.destroy({ where: { id } });
        res.redirect('/gigs');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
    }
});

router.get('/', async (req, res) => {
    const { name } = req.query; // Get the name from the query parameter

    try {
        let lists;
        if (name) { // If a name is provided, search
            lists = await list.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%` // Case-insensitive search
                    }
                }
            });
        } else { // If no name provided, show all
            lists = await list.findAll();
        }

        res.render('index', { lists: lists, searchTerm: name }); // Pass searchTerm

    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});


module.exports = router;