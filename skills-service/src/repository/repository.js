"use strict";
const models = require("../models/models");
const Sequelize = require('sequelize')

const repository = ({ Skill, SkillRate }) => {

  const getAllSkills = (user, offset = 0, limit = 10) => {
    return new Promise((resolve, reject) => {
      Skill.findAndCountAll({
        limit,
        offset
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    });
  };

  const addNewSkill = (user, name, desc) => {
    return new Promise((resolve, reject) => {
      Skill.create({ user, name, desc, rate: 0 })
        .then(() =>
          Skill.findOrCreate({ where: { user, name, desc, rate: 0 } })
        )
        .spread((skill, created) => {
          resolve({ skill, created });
        });
    });
  };

  const updateSkill = (user, id, name, desc) => {
    return new Promise((resolve, reject) => {
      Skill.update(
        {
          name,
          desc,
          rate
        },
        {
          where: { id }
        }
      ).spread((no, skill) => {
        resolve(skill);
      });
    });
  };

  const deleteSkill = (user, id) => {
    return new Promise((resolve, reject) => {
      Skill.destroy({
        where: {
          id
        }
      }).then(noOfRows => resolve(noOfRows));
    });
  };

  const rateSkill = (user, skill, rate) => {
    return new Promise((resolve, reject) => {
      SkillRate.create({ user, rate, skill })
        .then(() =>
          SkillRate.findOrCreate({ where: { user, rate, skill } })
        )
        .spread((rate, created) => {
          resolve({ rate, created });
        });
    });
  };

  const updateRate = (id, rate) => {
    return new Promise((resolve, reject) => {
      SkillRate.update(
        {
          rate
        },
        {
          where: { id }
        }
      );
    }).spread((no, rate) => {
      resolve(rate);
    });
  };

  const deleteRate = id => {
    return new Promise((resolve, reject) => {
      SkillRate.destroy({
        where: {
          id
        }
      }).then(noOfRows => resolve(noOfRows));
    });
  };

  return {
    getAllSkills,
    addNewSkill,
    updateSkill,
    deleteSkill,
    rateSkill,
    updateRate,
    deleteRate
  };
};

const initModels = sequelize => {
  return new Promise((resolve, reject) => {
    const Skill = models.Skill(sequelize, Sequelize)
    const SkillRate = models.SkillRate(sequelize, Sequelize)

    Promise.all([
      Skill.sync({ force: false }),
      SkillRate.sync({ force: false })
    ]).then((values) => {
      resolve(values)
    }).catch(e => reject(e))
  })
}

const connect = sequelize => {
  return new Promise((resolve, reject) => {
    if (!sequelize) {
      reject(new Error("Sequelize not supplied"))
    }
    initModels(sequelize).then(
      ([Skill, SkillRate]) => {
        resolve(repository({ Skill, SkillRate }))
      }
    ).catch(e => reject(e))
  })
}

module.exports = { connect };