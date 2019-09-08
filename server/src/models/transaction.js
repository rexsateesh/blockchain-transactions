'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transactions', {
    hash: {
      type: DataTypes.STRING(120)
    },
    time: {
      type: DataTypes.DATE
    },
    weight: {
      type: DataTypes.INTEGER
    },
    size: {
      type: DataTypes.INTEGER
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {});


  transaction.associate = function(models) {
    // Association will goes here
  };

  return transaction;
};