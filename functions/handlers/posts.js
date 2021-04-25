const { db } = require('../util/admin')
const postsDB = db.collection('posts');

//get all posts, for reference see index.js
exports.getAllPosts = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
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
      res.status(500).json({error: err});
    });
}

//get posts by limit, for reference see index.js
exports.getPosts = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  postsDB
  .limit(parseInt(req.params.limit))
  .get()
  .then((allPosts) => {
    let posts = [];
    allPosts.forEach(doc => {
      posts.push({
        id: doc.id,
        postUser: doc.data().postUser,
        title: doc.data().title,
        description: doc.data().description,
        status: doc.data().status
      });
    });
    res.json(posts);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
}

exports.getMyPosts = (req, res) => {
  postsDB
    .where('postUser', '==', req.params.user)
    .get()
    .then((myPosts) => {
      let posts = [];
      myPosts.forEach(doc => {
        posts.push({
          id: doc.id,
          postUser: doc.data().postUser,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status
        })
      });
      res.render('my-posts', {posts: posts});
    })
    .catch(err => {
      res.status(500).json({ error: "we couldn't fetch your posts..."});
      console.log(err);
    });
}

exports.updatePostStatusById = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  let toUpdate = postsDB.doc(req.params.id);
  let posts = [];
  toUpdate.get()
    .then((x) => {
      let newReciever = (x.data().receiveUser != "") ? "" : req.params.user;
      let newStatus = (x.data().status != "Complete") ? "Complete" : "Incomplete";
      toUpdate.update({ "receiveUser" : newReciever})
      .then((x) => {
        toUpdate.update({ "status" : newStatus })
        .then((x) => {
          toUpdate.get()
          .then((x) => {
            res.json({"status": x.data().status});
          })
        })
      })
    })
    
  
}

//get single post by id, for reference see index.js
exports.getPostById = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");


}


// Make a single post and send to DB
// endpoint --> http://localhost:5001/venushacksfood/us-central1/api/post
exports.makeOnePost = (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  const newPost = {
    postUser: req.body.postUser,
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
