const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const { getYesterday, getToday } = require('../models/coins.js');

router.get('/compare', (req, res) => {
  getToday()
    .then(num => {
      const today = num;
      getYesterday()
        .then(js => {
          const yesterday = Object.values(js)[0];
          const change = today - yesterday;
          res.status(STATUS_SUCCESS);
          if (change === 0) res.send(`Amazingly Bitcoin hasnt changed value since closing yesterday`);
          if (change < 0) res.send(`Bitcoin has fallen $${change.toFixed(2)} since closing yesterday`);
          if (change > 0) res.send(`Bitcoin has risen $${change.toFixed(2)} since closing yesterday`);
        })
        .catch(err => {
          res.status(STATUS_USER_ERROR);
          res.send({ error: err });
        });
    })
    .catch(err => {
      res.status(STATUS_USER_ERROR);
      res.send({ error: err });
    });
});

module.exports = router;