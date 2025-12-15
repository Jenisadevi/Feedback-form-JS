
// const express = require('express');
// const cors = require('cors');

// const app = express();
// app.use(cors());
// app.use(express.json());

// let feedbacks = [];
// let nextId = 1;

// /* POST /api/feedback */
// app.post('/api/feedback', (req, res) => {
//   const { name, message } = req.body;

//   if (!message || typeof message !== 'string') {
//     return res.status(400).json({ error: 'Message is required' });
//   }

//   const fb = {
//     id: nextId++,
//     name: name || 'Anonymous',
//     message,
//     createdAt: new Date().toISOString()
//   };

//   feedbacks.unshift(fb);
//   res.status(201).json(fb);
// });

// /* GET /api/feedback */
// app.get('/api/feedback', (req, res) => {
//   res.json(feedbacks);
// });

// /* ⭐ START THE SERVER (THIS WAS MISSING) */
// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => {
//   console.log(`Feedback backend running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let feedbacks = [];
let nextId = 1;

app.post('/api/feedback', (req, res) => {
  const { name, message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const fb = {
    id: nextId++,
    name: name || 'Anonymous',
    message,
    createdAt: new Date().toISOString()
  };

  feedbacks.unshift(fb);
  res.status(201).json(fb);
});

app.get('/api/feedback', (req, res) => {
  res.json(feedbacks);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Feedback backend running on port ${PORT}`);
});
