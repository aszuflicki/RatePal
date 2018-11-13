"use strict";

const Skill = (sequelize, types) => 
 sequelize.define("skill", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: types.STRING
    },
    desc: {
      type: types.STRING
    },
    rate: {
      type: types.DOUBLE(56,7)
    }
  })


const SkillRate = (sequelize, types) =>
  sequelize.define("skill_rate", {
    id: {
      type: types.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: types.INTEGER
    },
    skill: {
      type: types.INTEGER
    },
    rate: {
      type: types.INTEGER
    }
  });

module.exports = { Skill, SkillRate }
