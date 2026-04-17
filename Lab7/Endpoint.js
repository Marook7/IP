const express = require("express");
const app = express();
app.use(express.json());


const users = [];   // { id, username, email }
const posts = [];   // { id, userId, title, content, createdAt }
const likes = [];   // { userId, postId }

let nextUserId = 1;
let nextPostId = 1;

// USERS

app.post("/users", (req, res) => {
    const { username, email } = req.body;

    if (!username || !email) {
        return res.status(400).json({ error: "username and email are required" });
    }

    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(409).json({ error: "Username already taken" });
    }

    const newUser = {
        id: nextUserId++,
        username,
        email,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    console.log(`New user created: ${JSON.stringify(newUser)}`);
    res.status(201).json(newUser);
});


app.get("/users", (req, res) => {
    console.log(`Fetching all users. Count: ${users.length}`);
    res.status(200).json(users);
});


app.get("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);

    if (!user) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    console.log(`Fetching user: ${JSON.stringify(user)}`);
    res.status(200).json(user);
});


app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === userId);

    if (index === -1) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    const deleted = users.splice(index, 1)[0];
    console.log(`Deleted user: ${JSON.stringify(deleted)}`);
    res.status(200).json({ message: "User deleted", user: deleted });
});

// POSTS
app.post("/posts", (req, res) => {
    const post = {
        id: nextPostId++,
        userId: req.body["userId"],
        title: req.body["title"],
        content: req.body["content"],
        createdAt: new Date().toISOString()
    };

    if (!post.userId || !post.title || !post.content) {
        return res.status(400).json({ error: "userId, title and content are required" });
    }

    const userExists = users.find(u => u.id === post.userId);
    if (!userExists) {
        return res.status(404).json({ error: `User with id ${post.userId} not found` });
    }

    console.log(`Adding this new post ${JSON.stringify(post)}`);
    posts.push(post);
    console.log(`Posts: ${JSON.stringify(posts)}`);
    res.status(201).json(post);
});


app.get("/posts", (req, res) => {
    console.log(`Fetching all posts. Count: ${posts.length}`);
    res.status(200).json(posts);
});


app.get("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: `Post with id ${postId} not found` });
    }

    console.log(`Fetching post: ${JSON.stringify(post)}`);
    res.status(200).json(post);
});


app.get("/users/:id/posts", (req, res) => {
    const userId = parseInt(req.params.id);
    const userExists = users.find(u => u.id === userId);

    if (!userExists) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    const userPosts = posts.filter(p => p.userId === userId);
    console.log(`Posts for user ${userId}: ${JSON.stringify(userPosts)}`);
    res.status(200).json(userPosts);
});


app.put("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: `Post with id ${postId} not found` });
    }

    if (req.body.title)   post.title   = req.body["title"];
    if (req.body.content) post.content = req.body["content"];
    post.updatedAt = new Date().toISOString();

    console.log(`Updated post: ${JSON.stringify(post)}`);
    res.status(200).json(post);
});


app.delete("/posts/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const index = posts.findIndex(p => p.id === postId);

    if (index === -1) {
        return res.status(404).json({ error: `Post with id ${postId} not found` });
    }

    const deleted = posts.splice(index, 1)[0];
    console.log(`Deleted post: ${JSON.stringify(deleted)}`);
    res.status(200).json({ message: "Post deleted", post: deleted });
});

// LIKES
app.post("/posts/:id/like", (req, res) => {
    const postId = parseInt(req.params.id);
    const { userId } = req.body;

    const post = posts.find(p => p.id === postId);
    if (!post) {
        return res.status(404).json({ error: `Post with id ${postId} not found` });
    }

    const userExists = users.find(u => u.id === userId);
    if (!userExists) {
        return res.status(404).json({ error: `User with id ${userId} not found` });
    }

    const alreadyLiked = likes.find(l => l.userId === userId && l.postId === postId);
    if (alreadyLiked) {
        return res.status(409).json({ error: "User already liked this post" });
    }

    const like = { userId, postId };
    likes.push(like);
    console.log(`User ${userId} liked post ${postId}`);
    res.status(201).json({ message: "Post liked", like });
});


app.delete("/posts/:id/like", (req, res) => {
    const postId = parseInt(req.params.id);
    const { userId } = req.body;

    const index = likes.findIndex(l => l.userId === userId && l.postId === postId);
    if (index === -1) {
        return res.status(404).json({ error: "Like not found" });
    }

    likes.splice(index, 1);
    console.log(`User ${userId} unliked post ${postId}`);
    res.status(200).json({ message: "Post unliked" });
});


app.get("/posts/:id/likes", (req, res) => {
    const postId = parseInt(req.params.id);
    const post = posts.find(p => p.id === postId);

    if (!post) {
        return res.status(404).json({ error: `Post with id ${postId} not found` });
    }

    const postLikes = likes.filter(l => l.postId === postId);
    console.log(`Likes for post ${postId}: ${postLikes.length}`);
    res.status(200).json({ postId, likeCount: postLikes.length, likes: postLikes });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
