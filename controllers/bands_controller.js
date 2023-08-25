const express = require('express');
const bands = express.Router();
const db = require('../models')
const { Band, MeetGreet, Event, SetTime } = db;
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

bands.get('/:name', async (req, res) => {
    const { event: eventName = '' } = req.query;

    const where = {
        name: {
            [Op.iLike] : `%${eventName}%`
        }
    }
    try {
        const foundBand = await Band.findOne({
            attributes: {
                exclude: 'band_id'
            },
            where: {
                name: {
                    [Op.iLike] : `%${req.params.name}%`
                }
            },
            include: [
                {
                    model: MeetGreet,
                    as: 'meetGreets',
                    attributes: {
                        exclude: ['meet_greet_id', 'event_id', 'band_id']
                    },
                    include: {
                        model: Event, 
                        attributes: {
                            exclude: ['event_id']
                        },
                        as: 'event',
                        where
                    }
                },
                {
                    model: SetTime,
                    as: 'setTimes',
                    attributes: {
                        exclude: ['set_time_id', 'event_id', 'band_id', 'stage_id']
                    },
                    include: {
                        model: Event,
                        attributes: {
                            exclude: ['event_id']
                        },
                        as: 'event',
                        where
                    }
                }
            ],
            order: [
                [{ model: MeetGreet, as: 'meetGreets'}, { model: Event, as: 'event'}, 'date', 'ASC'],
                [{ model: SetTime, as: 'setTimes'}, { model: Event, as: 'event'}, 'date', 'ASC'],
            ]
        });
        res.status(202).json(foundBands)
    } catch (error) {
        console.log(error)
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