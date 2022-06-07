const Sequelize = require("sequelize");
const db = require("../config/database");

module.exports = (sequelize) => {
    sequelize.define(
        "booktags",
        {
            title: {
                type: Sequelize.STRING,
            },
            iban: {
                type: Sequelize.STRING,
            },
            author: {
                type: Sequelize.STRING,
            },
            type: {
                type: Sequelize.STRING,
            },
            category: {
                type: Sequelize.STRING,
            },
            cover_photo: {
                type: Sequelize.STRING,
            },
            description: {
                type: Sequelize.STRING,
            },
        },
        {
            tableName: "books_tag",
            timestamps: false,
        }
    )
};