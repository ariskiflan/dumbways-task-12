"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("projects", [
      {
        project_name: "aris",
        start_date: "2024-01-18",
        end_date: "2024-01-20",
        description: "hallo kak",
        technologies: ["nodejs", "reactjs"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("projects", null, {});
  },
};
