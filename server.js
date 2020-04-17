var express = require('express');

var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;

var bcrypt = require('bcrypt');

var nodemailer = require('nodemailer');

var jwt = require('jsonwebtoken');

var app = express();

var conn = 'mongodb+srv://mainaccess:securepassword@cop4331-large-project-l2dqk.mongodb.net/MyGymPro?retryWrites=true&w=majority';

var client = new MongoClient(conn, {useUnifiedTopology:true, useNewUrlParser:true});
client.connect();

app.use(bodyParser.json());

app.post('/api/signup', async (req, res) =>
{

});
