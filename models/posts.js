'use strict';

const Sequelize = require('sequelize');

const {sequelize} = require('../db/sequelize');

const Post = sequelize.define('Post', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},
{
    tableName: 'posts',
    underscored: true
});

Post.associate = function(models) {
    Post.belongsTo(
        models.Author,
        {foreignKey: {allowNull: false}}
    );
};

Post.prototype.apiRepr = function() {
    return {
        id: this.id,
        title: this.title,
        content: this.content
    }
};

module.exports = {
    Post
};