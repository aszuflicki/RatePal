"use strict";
const status = require("http-status");

module.exports = (app, options) => {
  const { repo } = options;

  app.get("/skills", (req, res, next) => {
    const { skip, limit } = req.params;
    const { user } = req.locals || 'test';
    repo
      .getAllSkills(user, skip, limit)
      .then(skills => {
        res.status(status.OK).json(skills);
      })
      .catch(next);
  });

  app.post("/skills", (req, res, next) => {
    const { name, desc } = req.body;
    const { user } = req.locals || 'test';
    repo
      .addNewSkill(user, name, desc)
      .then(skill => {
        res.status(status.OK).json(skill);
      })
      .catch(next);
  });

  app.patch("/skills", (req, res, next) => {
    const { id, name, desc } = req.body;
    const { user } = req.locals;
    repo
      .updateSkill(user, id, name, desc)
      .then(skill => {
        res.status(status.OK).json(skill);
      })
      .catch(next);
  });

  app.delete("/skills", (req, res, next) => {
    const { id } = req.params;
    const { user } = req.locals;
    repo
      .deleteSkill(user, id)
      .then(skill => {
        res.status(status.OK).json(skill);
      })
      .catch(next);
  });

  app.post("/skills/rate", (req, res, next) => {
    const { id, rate } = req.body;
    const { user } = req.locals;
    repo
      .rateSkill(user, id, rate)
      .then(rate => {
        res.status(status.OK).json(rate);
      })
      .catch(next);
  });

  app.patch("/skills/rate", (req, res, next) => {
    const { id, rate } = req.body;
    const { user } = req.locals;
    repo
      .updateRate(user, id, rate)
      .then(rate => {
        res.status(status.OK).json(rate);
      })
      .catch(next);
  });

  app.delete("/skills/rate", (req, res, next) => {
    repo
      .deleteRate(req.params.id)
      .then(album => {
        res.status(status.OK).json(album);
      })
      .catch(next);
  });
};
