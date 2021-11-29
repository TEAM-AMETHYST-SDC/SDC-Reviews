const reviewModels = require('./server/models/reviews.js');
const metaModels = require('./server/models/meta.js');

console.log('these are the models', metaModels)

const express = require('express');
const app = express();
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// -reviews

app.get('/reviews/', async (req, res) => {
  try {
    const { product_id,
      count = 5,
      page = 1
    } = req.query;
    const reviews = await reviewModels.getReviews(product_id, count, page);
    !product_id ? res.send('err')
    : res.json({ product_id, count, page, results: reviews });
  } catch(err) {
    console.log(err);
  }
});

// app.get('/reviews/', (req, res) => {
//   // refactor to async function]
//   const { product_id } = req.query;
//     // count = 5,
//     // page = 0,
//     // sort = 'relevant' } = req.query;
//   !product_id && res.send('Err, please provide a product ID');
//   we.getAllReviews(product_id, (err, response) => {
//     if (err) {
//       res.send(err);
//     }

//     const checkForDuplicates = () => {
//       for (var key in countOfIds) {
//         if (countOfIds[key] > 1) {
//           duplicateIds.push(key);
//         }
//       }
//     }
//     const duplicateIds = [];
//     const countOfIds = {};
//     const newResponse = response.map(r => {
//       if (countOfIds[r.id] === undefined) {
//         countOfIds[r.id] = 1
//       } else {
//         countOfIds[r.id]++;
//       }
//       return Object.assign({},
//         {review_id: r.id,
//          rating: r.rating,
//          summary: r.summary,
//          recommend: r.recommend,
//          response: r.response,
//          body: r.body,
//          date: r.date,
//          reviewer_name: r.reviewer_name,
//          helpfulness: r.helpfulness,
//          photos: []
//         })
//     })
//     const review = {product: product_id, results: newResponse };
//     checkForDuplicates();
//     console.log(duplicateIds);
//     console.log(countOfIds);
//     if (duplicateIds.length) {
//       // iterate through the duplicate ids,
//       // then check if the element is the same as the new response id
//       //   then map over the new response and return a new object
//       //    with multiple photos...
//     }
//     res.json(review);
//     // console.log(response);
//   });
// })

app.post('/reviews/', async (req, res) => {
  const { product_id,
          rating,
          summary,
          body,
          recommend,
          name,
          email,
          photos,
          characteristics } = req.body;
  const postReview = await reviewModels.postReview(product_id);
  !product_id ? res.status(404).send('Err, invalid review id')
  : postReview(product_id);
  res.status(201).send('CREATED');

})

app.put('/reviews/:review_id/helpful', async (req, res) => {
  const { review_id } = req.params;
  const updateHelpfulness = await reviewModels.updateReviewHelpfulness(review_id);
  !review_id ? res.status(404).send('Err, invalid review id') :
  updateHelpfulness;
  res.status(204).send('successfully updated');
})

app.put('/reviews/:review_id/report', async(req, res) => {
  const { review_id } = req.params;
  const reportReviews = await reviewModels.reportReview(review_id);
  !review_id ? res.status(404).send('Err, invalid review id') :
  reportReviews;
  res.status(204).send('successfully reported');
})


// reviews/meta

app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query;
  const getData = await metaModels.getMetaData(product_id);
  !product_id ? res.status(404).send('Err, invalid product id') :
  // console.log(getData);
  res.json(getData);
})


app.listen(port, (err) => console.log(err ? err : 'listening on port 3000'));