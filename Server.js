const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require("dotenv");
const Tweet = require('./models/Tweet');
dotenv.config();


const app = express();
app.use(express.json());
// Routes
//Create new tweet
app.post('/tweets',async(req,res)=>{
  try{
    const{username,content}=req.body;
    const newTweet =new Tweet({username,content})
    await newTweet.save();
    res.status(201).json({message: 'Tweet created!',tweet:newTweet})
   
  }
  catch(error){
  res.status(500).json({message:"error in storing tweet"})
  }
})

app.get('/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find();
    res.status(200).json(tweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/tweets/:id', async (req, res) => {
  try {
    const deletedTweet = await Tweet.findByIdAndDelete(req.params.id);
    if (!deletedTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json({ message: 'Tweet deleted!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/tweets/:id', async (req, res) => {
  try {
    const updatedTweet = await Tweet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json({ message: 'Tweet updated!', tweet: updatedTweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI,)
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));








