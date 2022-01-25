const { Router } = require('express');
const Barbie = require('../models/Barbie');
const barbieCheck = require('../utils/barbie-check');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const barbie = await Barbie.insert(req.body);
      res.send(barbie);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const barbie = await Barbie.getById(req.params.id);
      res.send(barbie);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const barbies = await Barbie.getAll();
      res.send(barbies);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const barbie = await Barbie.updateById(req.params.id, req.body);
      barbieCheck(barbie);
      res.send(barbie);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const barbie = await Barbie.deleteById(req.params.id);
      barbieCheck(barbie);
      res.send(barbie);
    } catch (error) {
      next(error);
    }
  });
