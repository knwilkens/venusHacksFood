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
  console.log(req.body.description);
  const np = JSON.parse(req.body);
  console.log(np.postTitle);
  const newPost = {
    postUser: 'randomUser', // TODO: get user that's signed in ID
    receiveUser: '',
    comments: [],
    status: 'Incomplete',
    postTitle: np.postTitle,
    description: np.description,
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
