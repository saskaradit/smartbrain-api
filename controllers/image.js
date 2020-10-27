const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd124d504c4e8419c8c11d470417c5d50'
});

const handleAPI = (req,res) => {
  app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
   .then(generalModel => {
     return generalModel.predict(req.body.input);
   })
   .then(data => {
     res.json(data)
   })
   .catch(err => res.status(400).json('Unable to make request'))
}


const handleImage = (req,res,db)=>{
  const {id} = req.body;
  db('users').where('id','=',id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries =>{res.json(entries[0])})
  .catch(err => res.status(400).json('Unable to add entries'))
}

module.exports = {
  handleImage,
  handleAPI
}