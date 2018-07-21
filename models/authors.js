'use strict';

const Sequelize = require('sequelize');

const {sequelize} = require('../db/sequelize');

const Author = sequelize.define('Author', {
    firstName: {
        type: Sequelize.STRING,
        field: 'first_name'
    },
    lastName: {
        type: Sequelize.STRING,
        field: 'last_name'
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
{
    tableName: 'authors',
    underscored: true
});

Author.associate = function(models) {
    Author.hasMany(
        models.Post,
        {
            as: 'posts',
            foreignKey: {allowNull: false}
        }
    );

    Author.hasMany(
        models.Comment,
        {
            as: 'comments',
            foreignKey: {allowNull: false},
            onDelete: 'CASCADE'                
        }
    );
};

Author.prototype.apiRepr = function() {
    return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username
    }
}

module.exports = {
    Author
};