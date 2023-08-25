const express = require('express');
const bands = express.Router();
const db = require('../models')
const { Band } = db;
const { Op } = require('sequelize')

bands.get('/', async (req, res) => {
    const { name = '' } = req.query
    try {
        const foundBands = await Band.findAll({
            order: [['available_start_time', 'ASC'], ['name', 'ASC']],
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
        res.status(200).json(foundBands)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})

bands.get('/:id', async (req, res) => {
    try {
        const foundBands = await Band.findOne({
            where: { band_id: req.params.id }
        })
        res.status(202).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body);
        res.status(202).json({
            message: 'success',
            data: newBand
        })
    } catch (error) {
        res.status(404)
    }
})

bands.put('/:id', async (req, res) => {
    try {
        const foundBands = await Band.update(req.body, {
            where: { band_id: req.params.id }
        })
        res.status(202).json({
            message: 'success',
            data: foundBands
        })
    } catch (error) {
        res.status(404)
    }
})

bands.delete('/:id', async (req, res) => {
    try {
        const foundBands = await Band.destroy({
            where: { band_id: req.params.id }
        })
        res.status(202).json({
            message: 'success delete',
            data: foundBands
        })
    } catch (error) {
        res.status(404)
    }
})
module.exports = bands;