const mongoose=require('mongoose');
const TweetSchema= new mongoose.Schema({
    username:{type:String, required:true},
    content:{type:String ,required:true,maxlength:280},
    likes:{type:Number,default: 0},
    createdAt:{type:Date,default:Date.now}
})
const Tweet=mongoose.model('Tweet',TweetSchema)
module.exports=Tweet;