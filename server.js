var express = require('express');

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

var jwt = require('jsonwebtoken');

var swaggerJsdoc = require('swagger-jsdoc');

var swaggerUi = require ('swagger-ui-express');

var app = express();

var conn = 'mongodb+srv://mainaccess:securepassword@cop4331-large-project-l2dqk.mongodb.net/MyGymPro?retryWrites=true&w=majority';

var client = new MongoClient(conn, {useUnifiedTopology:true, useNewUrlParser:true});
client.connect();

app.use(bodyParser.json());

var counter = 1;

app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

app.get('/', (req, res) =>
{
  res.send('Yay! Server is working.');
});

const authenticateJWT = (req, res, next) =>
{
  const authHeader = req.headers.authorization;
  
  if (authHeader)
  {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, 'supersecretkey', (err) =>
    {
      if (err)
      {
        res.status(403).json({Error:'Could not authenticate.'});
      }
      else
      {
        next();
      }
    });
  }
  else
  {
    res.status(401).json({Error:'Unauthorized.'});
  }
};

app.post('/api/signup', async (req, res) =>
{
  var error = '';
  var ret1, ret2;
  var rand = Math.floor((Math.random() * 100) + 54);
  
  const {username, email, password} = req.body;
  const newUser = {Username:username, Email:email, Password:password, isVerified:0, rand:rand};
  
  try
  {
    const db = client.db();
    
    ret1 = await db.collection('Users').findOne({Username:username});
    ret2 = await db.collection('Users').findOne({Email:email});
    
    if (ret1 != null)
    {
      res.status(403).json({Error:'Username already exists.'});
    }
    else if (ret2 != null)
    {
      res.status(403).json({Error:'Email address already exists.'});
    }
    else
    {
      const result = db.collection('Users').insertOne(newUser);
    
      var transporter = nodemailer.createTransport(
      {
        service: "gmail",
        auth: {user: "mygymproapp@gmail.com", pass: "Exceptions123?"}
      });
    
      var link = "http://my-gym-pro.herokuapp.com/api/verifyemail/?id=" + rand + "&username=" + username;
    
      mailOptions = 
      {
        from: "mygymproapp@gmail.com",
        to: email.toString(),
        subject: "Please confirm your MyGymPro account.",
        html: "<br>Click the link to verify your email.<br><a href=" + link + ">CLICK HERE</a>"
      }
    
      transporter.sendMail(mailOptions);
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error});
  }
});

app.get('/api/verifyemail', async (req, res) =>
{
  var error = '';
  
  try
  {
    const db = client.db();
    const result = await db.collection('Users').findOne({Username:req.query.username});
    
    if (req.query.id == result.rand)
    {
      const verify = db.collection('Users').updateOne({Username:req.query.username}, {$set:{isVerified:1}});
      res.send('Your email has been verified. You can now log in.');
    }
    else
    {
      res.send('Email could not be verified.');
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error});
  }
});

app.post('/api/login', async (req, res) =>
{
  var error = '';
  
  const {username, password} = req.body;
  
  try
  {
    const db = client.db();
    const result = await db.collection('Users').findOne({Username:username});
    
    if (result == null)
    {
      res.status(403).json({Error:'Username does not exist.'});
    }
    else if (result.isVerified == 0)
    {
      res.status(403).json({Error:'Email has not been verified.'});
    }
    else if (password != result.Password)
    {
      res.status(403).json({Error:'Incorrect password.'});
    }
    else
    {
      const accessToken = jwt.sign({username:username}, 'supersecretkey');
      res.status(200).json({AccessToken:accessToken, id:result._id});
    }
  }
  catch(e)
  {
    error = e.toString();
  }
  
  if (!res.headersSent)
  {
    res.status(200).json({Error:error});
  }
});

app.post('/api/createpost', authenticateJWT, async (req, res) =>
{
  var error = '';
  
  const {username, text} = req.body;
  
  const newPost = {UserID:username, Description:text};
  
  try
  {
  const db = client.db();
  const result = db.collection('Posts').insertOne(newPost);
  }
  catch(e)
  {
    error = e.toString();
  }
  
  res.status(200).json({Error:error});
});

app.get('/api/getallposts', async (req, res) =>
{
  var error = '';
  var ret = {};
  
  try
  {
  const db = client.db();
  const results = await db.collection('Posts').find({}).toArray();
  ret = JSON.stringify(results);
  }
  catch(e)
  {
    error = e.toString();
  }
  
  res.status(200).json({Posts:ret});
});

app.post('/api/poststepdata', authenticateJWT, async (req, res) =>
{
  var error = '';
	
  const {userID, date, numSteps, distanceTraveled, caloriesBurned, dailyGoal} = req.body;
  
  const stepData = {UserID:userID, Date:date, Counter:counter, Steps:numSteps, Distance:distanceTraveled, Calories:caloriesBurned, Goal:dailyGoal};
  
  try
  {
  const db = client.db();
  const result = db.collection('Steps').insertOne(stepData);
  counter++;
  }
  catch(e)
  {
    error = e.toString();
  }
  
  res.status(200).json({Error:error});
});

app.post('/api/getallstepdata', authenticateJWT, async (req, res) =>
{
  var error = '';
  var ret = {};

  const {userID} = req.body;
  
  try
  {
  const db = client.db();
  const results = await db.collection('Steps').find({UserID:userID}).toArray();
  ret = JSON.stringify(results);
  }
  catch(e)
  {
    error = e.toString();
  }

  res.status(200).json({StepData:ret, Error:error});
});

app.post('/api/getrecentstepdata', authenticateJWT, async (req, res) =>
{
  var error = '';
  var result;
  
  const {userID} = req.body;

  try
  {
    const db = client.db();
    result = await db.collection('Steps').find({UserID:userID}).sort({Counter:-1}).limit(1).toArray();
  }
  catch(e)
  {
    error = e.toString();
  }
	
  res.status(200).json({StepData:result, Error:error});
});

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "MyGymPro API Documentation",
      version: "1.0.0",
      description:
        "An efficient API that facilitates the data transfer and storage of the MyGymPro app.",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/"
      },
      contact: {
        name: "MyGymPro",
        url: "",
        email: "mygymproapp@gmail.com"
      }
    },
    servers: [
      {
        url: "https://my-gym-pro.herokuapp.com/api"
      }
    ]
  },
  apis: ["./models.js", "./routes.js"]
};
const specs = swaggerJsdoc(options);
app.use("/api/docs", swaggerUi.serve);
app.get(
  "/api/docs",
  swaggerUi.setup(specs, {
    explorer: true
  })
);

app.listen(process.env.PORT);
