const express = require('express');
const { getCookieSettings } = require('../utils/get-cookie-settings');
const homeRouter = express.Router();

homeRouter.get('/', (req, res) => {
  const { sum, addons, base, allBases, allAddons } = getCookieSettings(req);
  res.render('home/index', {
    cookie: {
      base,
      addons,
    },
    bases: allBases,
    addons: allAddons,
    sum,
  });
});

module.exports = {
  homeRouter,
};
