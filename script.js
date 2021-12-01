
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://localhost:5432/reviewsdb', {
  define: {
    timestamps: false
  }
});


const dbconnection = async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

dbconnection();

const Review = sequelize.define('reviews', {
  id: { type: DataTypes.UUID,
    primaryKey: true,
    autoIncrement: true
  },
  product_id: { type: DataTypes.INTEGER },
  rating: { type: DataTypes.SMALLINT },
  date: { type: DataTypes.DATE },
  summary: { type: DataTypes.TEXT },
  body: { type: DataTypes.TEXT },
  recommend: {type: DataTypes.BOOLEAN },
  reported: { type: DataTypes.BOOLEAN },
  reviewer_name: { type: DataTypes.TEXT },
  reviewer_email: { type: DataTypes.TEXT },
  response: { type: DataTypes.TEXT },
  helpfulness: { type: DataTypes.INTEGER }
}, {
  indexes: [
    {
      unique: false,
      fields: ['id']
    }
  ]
});

const Photos = sequelize.define('photos', {
  id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
  review_id: { type: DataTypes.INTEGER },
  url: { type: DataTypes.TEXT }
}, {
  indexes: [
    {
      unique: false,
      fields: ['review_id']
    }
  ]
});

const Characteristics = sequelize.define('characteristics', {
  id: { type: DataTypes.UUID, primaryKey: true },
  product_id: { type: DataTypes.INTEGER },
  name: { type: DataTypes.TEXT }
}, {
  indexes: [
    {
      unique: false,
      fields: ['product_id']
    }
  ]
});

const CharacteristicReviews = sequelize.define('characteristic_reviews', {
  id: { type: DataTypes.UUID, primaryKey: true, autoIncrement: true },
  characteristic_id: { type: DataTypes.INTEGER },
  review_id: { type: DataTypes.INTEGER },
  value: { type: DataTypes.INTEGER }
});

Review.hasMany(Photos, {foreignKey: 'review_id'});
Photos.belongsTo(Review, {foreignKey: 'id'});

CharacteristicReviews.belongsTo(Characteristics,
  { foreignKey: 'id' });

Characteristics.hasMany(CharacteristicReviews,
  { foreignKey: 'characteristic_id' });

Characteristics.belongsTo(Review,
  { foreignKey: 'product_id'})

Review.hasMany(Characteristics,
  { foreignKey: 'product_id'})


exports.connection = dbconnection;
exports.review = Review;
exports.photos = Photos;
exports.characteristics = Characteristics;
exports.characteristicreviews = CharacteristicReviews;
exports.sequelize = Sequelize;

