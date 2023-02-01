const express = require('express');
const { COOKIE_ADDONS, COOKIE_BASES } = require('../data/cookies-data');
const { getAddonsFromReq } = require('../utils/get-addons-from-req');
const configuratorRouter = express.Router();

configuratorRouter
  .get('/select-base/:baseName', (req, res) => {
    const { baseName } = req.params;

    if (!COOKIE_BASES[baseName]) {
      return res.render('error', {
        description: `There is no such base as ${baseName}.`,
      });
    }

    res.cookie('cookieBase', baseName).render('configurator/base-selected', {
      baseName,
    });
  })
  .get('/add-addon/:addonName', (req, res) => {
    const { addonName } = req.params;
    if (!COOKIE_ADDONS[addonName]) {
      return res.render('error', {
        description: `There is no such addon as ${addonName}.`,
      });
    }
    const addons = getAddonsFromReq(req);

    if (addons.includes(addonName)) {
      return res.render('error', {
        description: `${addonName} is already on your cookie!`,
      });
    }

    addons.push(addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/added', {
        addonName,
      });
  })
  .get('/delete-addon/:addonName', (req, res) => {
    const { addonName } = req.params;

    const oldAddons = getAddonsFromReq(req);

    if (!oldAddons.includes(addonName)) {
      return res.render('error', {
        description: `Cannot delete ${addonName}.`,
      });
    }

    const addons = oldAddons.filter(addon => addon !== addonName);

    res
      .cookie('cookieAddons', JSON.stringify(addons))
      .render('configurator/deleted', {
        addonName,
      });
  });

module.exports = {
  configuratorRouter,
};
