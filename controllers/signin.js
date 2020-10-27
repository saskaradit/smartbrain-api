const handleSignin= (db,bcrypt)=>(req,res)=>{
  const {email,password} = req.body
  if(!email || !password){
    return res.status(400).json('Incorrect Submission')
  }
  db.select('email','hash').from('login')
  .where('email','=',email)
  .then(data => {
    const isValid = bcrypt.compareSync(password,data[0].hash)
    // console.log(isValid);
    if(isValid) {
      return db.select('*').from('users').where('email','=',email)
      .then(user=>{
        res.json(user[0])
      })
      .catch(err=>res.status(400).json('Unable to login'))
    }
    else res.status(400).json('Wrong Credentials')
    // console.log(data[0])
  })
  .catch(err => res.status(400).json('Wrong Credential'))
}

module.exports={
  handleSignin
}