const { db } = require('../util/admin')
const postsDB = db.collection('posts');

exports.getAllPosts = (req, res) => {
  postsDB
    //.orderBy('createdAt', 'desc')  
    .get()
    .then((allPosts) => {
      let posts = [];
      allPosts.forEach(doc => {
        posts.push({
          postUser: doc.data().postUser,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status
        });
      });
      res.render('index', {posts: posts});
    })
    .catch(err => {
      res.status(500).json({error: 'could not retrieve posts...'});
    });
}

exports.makeOnePost = (req, res) => {
  console.log(req.body);
  const newPost = {
    postUser: 'randomUser', // TODO: get user that's signed in ID
    receiveUser: '',
    comments: [],
    status: 'Incomplete',
    title: req.body.postTitle,
    description: req.body.description,
  };
  postsDB
    .add(newPost)
    .then((post) => {
      res.json({message: `${post.id} created successfully`});
    })
    .catch((err) => {
      res.json({error: 'something bad happened...'});
      console.error(err);
    });
}
