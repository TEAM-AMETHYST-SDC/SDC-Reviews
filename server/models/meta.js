const db = require('../../script.js');
console.log(db);

const getMetaData = async (product_id) => {
  try {
    const getMeta = await db.review.count({
      where: { product_id: product_id },
      attributes: [[db.sequelize.fn('count', db.sequelize.col('rating')), 'count']],
      include: [
        {model: db.characteristics,
        include: [
          {
            model: db.characteristicreviews
          }
        ]},

      ]
    })
    // console.log(getMeta);
    return getMeta;
  } catch(err) {
    console.log(err);
  }
}

exports.getMetaData = getMetaData;