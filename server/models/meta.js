const db = require('../../script.js');
// console.log(db);

const getMetaData = async (product_id) => {
  try {
    const getRatings = await db.review.findAll({
      where: { product_id: product_id },
      raw: true,
      attributes: ['rating', [db.sequelize.fn('count', db.sequelize.col("rating")), "count"]],
      group: 'rating'
    })
    const getRecommended = await db.review.findAll({
      where: { product_id: product_id },
      raw: true,
      attributes: ['recommend', [db.sequelize.fn('count', db.sequelize.col('recommend')), 'count']],
      group: 'recommend'
      // raw: true,
    })
    const getCharacteristics = await db.characteristics.findAll({
      where: { product_id: product_id },
      // raw: true,
      include: [
        {
          model: db.characteristicreviews,
          attributes: ['value']
        }
      ]
    })
    // console.log('this is the recommended')
    // console.log('these are the recommended', getRecommended);
    // console.log('these are the characteristics', getCharacteristics);
    const charData = await Promise.all(
      getCharacteristics.map(data => {
        // for (var key in data.dataValues) {
        //   return data.dataValues[key];
        // }
        // console.log(data.dataValues);
        return {
          [data.dataValues.name]: {
            id: data.dataValues.id,
            value: data.dataValues.characteristic_reviews.map(item => {
              console.log(item);
            })
          }
        }
      })
    )
    console.log(charData);

    // const metaResults = await Promise.all(
    //   getCharacteristics.map(item => {
    //     return item.attributes.map(item2 => {
    //       console.log(item2)
    //     })
    //   }))
      // console.log('these are the meta results', metaResults)
  } catch(err) {
    console.log(err);
  }
}

exports.getMetaData = getMetaData;