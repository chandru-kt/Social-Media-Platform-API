// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Schemas
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  passwordHash: String,
  createdAt: { type: Date, default: Date.now },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const friendRequestSchema = new mongoose.Schema({
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'] },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const commentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

// Models
const User = mongoose.model('User', userSchema);
const FriendRequest = mongoose.model('FriendRequest', friendRequestSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

// API to get user feed
app.get('/feed/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findById(userId).populate('friends');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const friendsIds = user.friends.map(friend => friend._id);
      const postsByFriends = await Post.find({ userId: { $in: friendsIds } });
  
      const commentsByFriends = await Comment.find({ userId: { $in: friendsIds } }).populate('postId');
      const commentedPostIds = commentsByFriends.map(comment => comment.postId._id);
  
      const uniqueCommentedPosts = await Post.find({ _id: { $in: commentedPostIds }, userId: { $nin: friendsIds } });
  
      const combinedFeed = [...postsByFriends, ...uniqueCommentedPosts];
      res.status(200).json({ feed: combinedFeed });
    } catch (error) {
      console.error('Error fetching feed:', error);
      res.status(500).json({ error: `Error fetching feed: ${error.message}` });
    }
  });
  
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
