const reviewModels = require('./server/models/reviews.js');
const metaModels = require('./server/models/meta.js');

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
      page = 0
    } = req.query;
    const reviews = await reviewModels.getReviews(product_id, count, page);
    !product_id ? res.send('err')
    : res.json({ product_id, count, page, results: reviews });
  } catch(err) {
    console.log(err);
  }
});


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
  const postReviews = await reviewModels.postReview(product_id, rating, summary, body, recommend, name, email, photos, characteristics);
  !product_id ? res.status(404).send('Err, invalid review id')
  : postReviews;
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
  const characteristics = await metaModels.getMetaData(product_id);
  !product_id ? res.status(404).send('Err, invalid product id') :
  res.json(characteristics);
})


app.listen(port, (err) => console.log(err ? err : 'listening on port 3000'));