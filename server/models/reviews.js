

const db = require('../../script.js');

console.log(db.sequelize);

const getReviews = async(product_id, count, page, sort) => {
  try {
    const reviews = await db.review.findAll({
      limit: count || 5,
      offset: page || 0,
      // figure out how to do the order sort
      // order: ['relevant', 'DESC'],
      raw: false,
      where: { product_id: product_id,
               reported: false
              },
      include: [
        {
          model: db.photos
        }
      ]
    })
    const results = await Promise.all(
      reviews.map(result=> {
        return {
          review_id: result.dataValues.id,
          rating: result.dataValues.rating,
          summary: result.dataValues.summary,
          recommend: result.dataValues.recommend,
          response: result.dataValues.response,
          body: result.dataValues.body,
          date: result.dataValues.date,
          reviewer_name: result.dataValues.reviewer_name,
          helpfulness: result.dataValues.helpfulness,
          photos: result.dataValues.photos.map(photo => {
            return {
              id: photo.dataValues.id,
              url: photo.dataValues.url
            }
          })
        }
      })
    )
    return results;
  } catch (err) {
    console.log(err);
  }
}

const postReview  = async (product_id, rating, summary, body, recommend, name, email, ) => {
  try {
    const postToReviews = await db.review.create({
      where: {product_id: product_id},
      rating: rating,
      summary: summary,
      body: body,
      recommend: recommend,
      name: name,
      email: email
    });
    const postToPhotos = await db.photos.create({

    })
  } catch(err) {
    console.log(err)
  }
}

const updateReviewHelpfulness = async (review_id) => {
  try {
    const update = await db.review.increment('helpfulness', {
      by: 1,
      where: { id: review_id },
      returning: false
    })
    return update;
  } catch(err) {
    console.log(err);
  }
}

const reportReview = async (review_id) => {
  try {
    const report = await db.review.update({
      reported: true
    },
      { where:
        {id: review_id }
      })
  } catch(err) {
    console.log(err);
  }
}


exports.getReviews = getReviews;
exports.updateReviewHelpfulness = updateReviewHelpfulness;
exports.reportReview = reportReview;