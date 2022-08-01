const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;
dbName='Auth'
const dbUrl=`mongodb+srv://QuizApp:2WKeigxo38yXUaC7@cluster0.487qx.mongodb.net/${dbName}`
module.exports={dbUrl,MongoClient,mongodb}