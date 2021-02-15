const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const app= express()
const Meme = require("../models/memes");

app.set('view engine', 'ejs')



router.get("/", (req, res, next) => {
  Meme.find()
    .exec()
    .then(docs => {
      console.log(docs);
      //   if (docs.length >= 0) {
        
     // res.json(docs);
      res.render('memes.ejs', {result:docs})
      

      return;
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req, res, next) => {
  const meme = new Meme({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    caption: req.body.caption,
    url:req.body.url
  });
  meme
    .save()
    .then(result => {
      console.log(result);

      
      
     
      // res.json({
      //   message: "Handling POST requests to /memes",
      //   createdmeme: result
      // });
      res.render('home.ejs',{createdmeme: result});
      
      
      
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
      return;
    });
});

router.get("/:memeID", (req, res, next) => {
  const id = req.params.memeID;
  Meme.findById(id)
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:memeID", (req, res, next) => {
  const id = req.params.memeID;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Meme.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

// router.delete("/:productId", (req, res, next) => {
//   const id = req.params.productId;
//   Product.remove({ _id: id })
//     .exec()
//     .then(result => {
//       res.status(200).json(result);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

module.exports = router;
