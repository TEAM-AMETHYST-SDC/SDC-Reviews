const db = require('../../script.js');
// console.log(db);

const getMetaData = async (product_id) => {
  try {
    const getRatings = await db.review.findAll({
      where: { product_id: product_id },
      raw: true,
      attributes: ['rating', [db.sequelize.fn('count', db.sequelize.col('rating')), 'count']],
      group: 'rating'
    })

    const ratings = {};

    getRatings.forEach(rating => {
      ratings[rating.rating] = rating.count;
    })
    const getRecommended = await db.review.findAll({
      where: { product_id: product_id },
      raw: true,
      attributes: ['recommend', [db.sequelize.fn('count', db.sequelize.col('recommend')), 'count']],
      group: 'recommend'
    })
    const recommended = {};

    getRecommended.forEach(r => {
      r.recommend ? recommended['0'] = r.count :
      recommended['1'] = r.count
    })
    const getCharacteristics = await db.characteristics.findAll({
      where: { product_id: product_id },
      include: [
        {
          model: db.characteristicreviews,
          attributes: ['value']
        }
      ]
    })
    const charData = await Promise.all(
      getCharacteristics.map(data => {
        return {
          [data.dataValues.name]: {
            id: data.dataValues.id,
            value: data.dataValues.characteristic_reviews.map(values => {
              return values.dataValues.value;
            })
          }
        }
      })
    )
    characteristics = {};

    // charData.forEach(item => {
    //   for (var key in item) {
    //     characteristics[key] = {
    //       id: item[key].id,
    //       value: item[key].value.reduce(function(sum, current) {
    //         return sum + current;
    //       }, 0) / item[key].value.length
    //     }
    //   }
    // })

    return { ratings, recommended, characteristics }

  } catch(err) {
    console.log(err);
  }
}

exports.getMetaData = getMetaData;