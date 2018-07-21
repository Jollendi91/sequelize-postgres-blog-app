'use strict';

const Sequelize = require('sequelize');

const {sequelize} = require('../db/sequelize');

const Comment = sequelize.define('Comment', {
    commentText: {
        type: Sequelize.STRING,
        field: 'comment_text'
    }
},
{
    tableName: 'comments',
    underscored: true
});

Comment.associate = function(models) {
    Comment.belongsTo(
        models.Author,
        {foreignKey: {allowNull: false}, onDelete: 'CASCADE'}
    );

    Comment.belongsTo(
        models.Post,
        {foreignKey: {allowNull: false}, onDelete: 'CASCADE'}
    );
};

Comment.prototype.apiRepr = function() {
    return {
        id: this.id,
        commentText: this.commentText
    }
};
    

module.exports = {
    Comment
}