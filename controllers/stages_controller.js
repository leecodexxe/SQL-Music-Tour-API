const stages = require('express').Router();
const db = require('../models');
const { Op } = require('sequelize');
const { Stage } = db;

stages.get('/', async(req, res) => {
    try {
        const { name = '' } = req.query;
        const foundStage = await Stage.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            order: [
                ['capacity', 'DESC'],
                ['manager', 'ASC']
            ]
        });
        res.status(200).json(foundStage);
    } catch (error) {
        res.status(500).json(error);
    }
})

stages.get('/:id', async (req, res) => {
    try {
        const foundStage = await Stage.findOne({
            where: {
                stages_id: req.params.id
            }
        });
        res.status(200).json(foundStage);
    } catch(e) {
        res.status(500).json(e)
    }
})

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body);
        res.status(200).json({
            message: 'Successfully created a stage',
            data: newStage
        });
    } catch (error) {
        res.status(500).json(error);
    }
})

stages.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedStage = await Stage.update(req.body, {
            where: {
                stages_id: id
            }
        });
        res.status(200).json({
            message: `successfully updated the stage`,
            updatedStage
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

stages.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedStage = await Stage.destroy({
            where: {
                stages_id: id
            }
        })
        res.status(200).json({
            message: `Successfully yeeted stage`
        })
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = stages;