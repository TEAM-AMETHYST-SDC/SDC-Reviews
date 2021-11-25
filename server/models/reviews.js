

const db = require('../../script.js');

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

// const getPhotos = Promise.all(reviewIds.map(async id => {
//   const photos = await db.photos.findAll({
//     raw: true,
//     where: { review_id: id}
//   })
//   console.log(photos);
// }))



// const getPhotos = async() => {
//   try {
//     const photos
//   } catch (err) {
//     console.log(err);
//   }
// }




// module.exports = {

//   review_ids: [],

//   getAllReviews: function (product_id, callback) {
//     db.review.findAll({
//       limit: 5,
//       raw: true,
//       where: { product_id: product_id },
//       include: [
//         {
//           model: db.photos,
//           raw: true
//         }
//       ]
//     })
//     .then((reviews) => {
//       console.log(reviews);
//       callback(null, reviews);
//     })
//     .catch((err) => {
//       callback(err);
//     })
//   },


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


//   updateReviewHelpfulness: function(review_id, callback) {
//     db.review.increment('helpfulness', {
//       by: 1,
//       where: { id: review_id },
//       returning: false
//     })
//     .then((response) => {
//       callback(response);
//     })
//     .catch((err) => {
//       callback(err);
//     })
//   }
// }

exports.getReviews = getReviews;
exports.updateReviewHelpfulness = updateReviewHelpfulness;
exports.reportReview = reportReview;