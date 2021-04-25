const { db } = require('../util/admin')
const postsDB = db.collection('posts');

exports.getAllPosts = (req, res) => {
  postsDB
    //.orderBy('createdAt', 'desc')  
    .get()
    .then((allPosts) => {
      let posts = [];
      allPosts.forEach(doc => {
        console.log("one doc");
        posts.push({
          title: doc.data().title,
        });
      });
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({error: 'could not retrieve posts...'});
    });
}

exports.makeOnePost = (req, res) => {
  const newPost = {
    postUser: 'randomUser',
    receiveUser: '',
    comments: [],
    status: 'Incomplete',
    title: 'Beets',
    description: 'carrots',
  };
  postsDB
    .add(newPost)
    .then((post) => {
      res.json({message: `${post.title} created successfully`});
    })
    .catch((err) => {
      res.json({error: 'something bad happened...'});
      console.error(err);
    });
}
