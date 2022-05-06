const express = require('express');
const router = express.Router();
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema');  
const auth=require('../middleware/auth');
const uuid=require("uuid");
const {format}=require('util');
const uuidv1=uuid.v1;


const Multer=require('multer')

const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
  });
  
  // A bucket is a container for objects (files).
const {Storage}=require('@google-cloud/storage');
const storage = new Storage({projectId:process.env.GCLOUD_PROJECT,credentials:{client_email:process.env.GCLOUD_CLIENT_EMAIL,private_key:process.env.GCLOUD_PRIVATE_KEY}});
const bucket = storage.bucket(process.env.GCS_BUCKET);



////////////////////////////////////////////////////////////////////Getting array of replies for a single tweet.
router.get("/repliesArray/:id",auth,async (req,res)=>{


    try {
        let { page, size } = req.query;
  
        //default value is 1 if page parameter is not given.
        if (!page) {
            page = 1;
        }
        //default value is 10 if page parameter is not given.
        if (!size) {
            size = 10;
        }

        //Casting the size string to integer.
        const limit = parseInt(size);

    const theUser=req.user._id;
    const theTweet=req.params.id;
    finalArray=[]

    const projection = { "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1,"numberLikes":1,"numberReplies":1,"numberRetweets":1};
    const projection2 ={"_id":0,"name":1,"username":1};

    try{
    var results=await tweet.find({replyTo:theTweet},projection).limit(limit).skip(size*(page-1)).sort({"createdAt":-1})
    }
    catch(error)
    {
        return res.sendStatus(400);
    }
    if(!results)
    {
        return res.sendStatus(400);
    }
    
    
    
    for(i=0;i<results.length;i++)
    {

        var tempMedia=results[i]["media"]
        const the_id= results[i]["_id"]

        //the user who posted this reply.
        var theId=results[i]["postedBy"]

        var contentTemp="";
        var gifTemp="";
        
    
        if(results[i]["content"])
                 contentTemp=results[i]["content"];
      

        var results2 = await user.findById(theId,projection2)
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        if(results2==null)
        {
            return res.status(400).send("a user who posted one of the tweets is not found.")
        }

        //Checking if the tweet is retweeted by the current user.
        var Retweeted=false       
        findRetweet=await tweet.find({retweetInfo:the_id,postedBy:theUser}).select("_id") 
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })        
        if(findRetweet.length!=0)
            Retweeted=true

        
        //Checking if the tweet is liked by current user.  
        var Liked=false     
        var foundLike= await user.find({_id:theUser,likes:{ $all:the_id}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

        if(foundLike.length!=0)
            Liked=true

  

        var urls=[]
        if(!tempMedia || tempMedia.length==0)
        {
            if(!gifTemp || gifTemp.length==0)
            {
                urls=[];
            }
            else
            {
                urls.push(gifTemp);
            }
        }
        else
        {
            urls=tempMedia;
        }

        const Obj= ({
            id:the_id,
            userName: results2["username"],
            displayName: results2["name"],
            content: contentTemp,
            URLs:urls,
            isLiked:Liked,
            isRetweeted:Retweeted,
            noOfLike:results[i]["numberLikes"],
            noOfReplies:results[i]["numberReplies"],
            noOfRetweets:results[i]["numberRetweets"],
           });

           finalArray.push(Obj)

              
        }
        if(finalArray.length==0)
        {
            return res.status(200).send("no replies found"); 
        }
        return res.status(200).send(finalArray); 

        

    }
    catch (error) {
        return res.status(400).send("problem with page parameters size/number");
    }
    
})


//////////////////////////////////////////////////////////////////////////////////Getting single tweet endpoint
router.get("/SingleTweet/:id",auth,async (req,res)=>{

    theUser=req.user._id;
    TheTweet=req.params.id;

    const projection ={ "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1,"numberLikes":1,"numberReplies":1,"numberRetweets":1};
    const projection2 ={"_id":0,"name":1,"username":1};

    try{
        var results= await tweet.findOne({_id:TheTweet},projection)
        }
        catch(error)
        {
            return res.sendStatus(400);
        }
        if(!results)
        {
            return res.status(400).send("tweet not found");
        }

    
    //Checking if the tweet is retweeted by the current user.
    var Retweeted=false       
    findRetweet=await tweet.find({retweetInfo:TheTweet,postedBy:theUser}).select("_id") 
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })       
    if(findRetweet.length!=0)
        Retweeted=true

    
 
    //Checking if the tweet is liked by current user.  
        var Liked=false     
        var foundLike= await user.find({_id:theUser,likes:{ $all:TheTweet}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

        if(foundLike.length!=0)
            Liked=true


    var theId=results["postedBy"]
    var tempMedia=results["media"]
    var gifTemp=results["gifs"]
    var urls=[]

    if(!tempMedia || tempMedia.length==0)
    {
        if(!gifTemp || gifTemp.length==0)
        {
            urls=[];
        }
        else
        {
            urls.push(gifTemp);
        }
    }
    else
    {
        urls=tempMedia;
    }

    var contentTemp="";
    if(results["content"])
             contentTemp=results["content"];


    var results2 = await user.findById(theId,projection2)
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })
    if(results2==null)
    {
        return res.status(400).send("the user who posted this tweet is not found.")
    }

    const Obj= ({
        id:results["_id"],
        userName: results2["username"],
        displayName: results2["name"],
        content: contentTemp,
        URLs:urls,
        isLiked:Liked,
        isRetweeted:Retweeted,
        noOfLike:results["numberLikes"],
        noOfReplies:results["numberReplies"],
        noOfRetweets:results["numberRetweets"]
       });
    res.status(200).send(Obj);     


})


///////////////////////////////////////////////////////////////////////////////////Getting timeline tweets endpoint:
router.get("/TimelineTweets",auth,async (req,res)=>{

    try {
        let { page, size } = req.query;
    
        //default value is 1 if page parameter is not given.
        if (!page) {
            page = 1;
        }
        //default value is 10 if page parameter is not given.
        if (!size) {
            size = 10;
        }

        //Casting the size string to integer.
        const limit = parseInt(size);

        const theUser=req.user._id;
       
        
        finalArray=[]
        const projection = { "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1,"numberLikes":1,"numberReplies":1,"numberRetweets":1};
        
        var results = await tweet.find({},projection).limit(limit).skip(size*(page-1))
        .populate("postedBy")
        .populate("retweeters")
        .populate("likes")
        .sort({"createdAt":-1})    
        .catch(error => {
            console.log(error);
            return res.status(400).send("error: problem with finding the tweets")
        })
        if (!results) return res.status.send('No tweets found')
        


    for(i=0;i<results.length;i++)
       {
        if (!results[i])
            continue;

  
        //do not view reply as a tweet. go to next iteration.   
        if(results[i]["replyTo"]==undefined || results[i]["replyTo"]==null || results[i]["replyTo"].length=="") 
       {


        if(results[i]._id)
       { 
           Liked=false
           Retweeted=false

           //Checking if the tweet is liked by the current user.
           var userLiked=results[i].likes.some(item => item._id == theUser)
           if(userLiked)
               Liked=true
              
           //Checking if the tweet is retweeted by the current user.
           var userRetweeted=results[i].retweeters.some(item => item._id == theUser)
           if(userRetweeted)
               Retweeted=true
       }
       else
       {
           res.sendStatus(400).send("one of the tweets' ids is null");
       }    

        var contentTemp="";
        var gifTemp=results[i]["gifs"];
        var tempMedia=results[i]["media"]
        var urls=[]
        if(!tempMedia || tempMedia.length==0)
        {
            if(!gifTemp || gifTemp.length==0)
            {
                urls=[];
            }
            else
            {
                urls.push(gifTemp);
            }
        }
        else
        {
            urls=tempMedia;
        }
    
        if(results[i]["content"])
                 contentTemp=results[i]["content"];

        
        const Obj= ({
            id:results[i]["_id"],
            userName: results[i].postedBy.username,
            displayName: results[i].postedBy.name,
            content: contentTemp,
            URLs:urls,
            isLiked:Liked,
            isRetweeted:Retweeted,
            noOfLike:results[i].numberLikes,
            noOfReplies:results[i].numberReplies,
            noOfRetweets:results[i].numberRetweets,
           });


        finalArray.push(Obj)
              
        }
    }
        if(finalArray.length==0)
        {
            return res.status(200).send("no tweets found"); 
        }
        return res.status(200).send(finalArray); 

    }
    catch (error) {
        return res.status(400).send("problem with page parameters size/number");
    }
})

//////////////////////////////////////////////////////////////////////////////Posting and replying
router.post("/",multer.any(),auth,async function(req,res,next){
    //A tweet can have content or images or gifs, but it can not be empty 
    //A tweet can have maximum 4 images/1 gif.
    //number of characters in a tweet is maximum: 
    //same goes for a reply

    token=req.user._id
    var userInfo=null;
    try
    {
        userInfo=await user.findById(token)     
    }
    catch(error) //error with finding (invalid id)
    {
        console.log(error)
         return res.status(400).send("user not found.");
    }

    
   
    if(userInfo==null || req.body.content==null || req.files==null || req.body.gifs==null || req.body.replyId==null) //the id of the user is not found
    {
        return res.status(400).send("1 of the body parameters could not be read.");
        
    }
    
    //prevent the user from posting if he is banned.
    if(userInfo.banned)
    {
        return res.status(400).send("The user is banned and cannot post a tweet.");
    }
    
    //initialising images,gifs,content,reply as empty
    mediaTemp=[]
    contentTemp=""
     replyTemp=undefined //represents an empty object
     gifTemp=""
     
     //if the tweet has content 
     if(req.body.content!="")
     {
         contentTemp=req.body.content
         //checking that the tweet is maximum 280 charcters
         if(contentTemp.length>280)
            return res.status(400).send("the tweet is longer than 280 characters")
     }
     publicUrl=""; 

    //if the tweet has images
     if(req.files)
     {
         if(req.files.length >4)
         {
            return res.status(400).send("there are more than 4 images attached.")
         }
         
       for(m=0;m<req.files.length;m++)
        {
            const newFileName=uuidv1()+"-"+req.files[m].originalname;
            const blob = bucket.file(newFileName);

            const blobStream = blob.createWriteStream(
            { resumable: false }
            );
      
        blobStream.on('error', err => {
          next(err);
        });

        blobStream.on('finish', () => {
          // The public URL can be used to directly access the file via HTTP.
          publicUrl =format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

        });
      
        blobStream.end(req.files[m].buffer);
        mediaTemp.push(format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`));
       }
    }
    
     //if the tweet has a gif:
     if(req.body.gifs.length!=0)
     {
        if(typeof(req.body.gifs)=="string")
            {
                gifTemp=req.body.gifs
            }

        else
            {
                return res.status(400).send("can not have more than 1 gif")  //can not have more than 1 gif    
            } 
            
            
            if(mediaTemp.length!=0) //can not have images and a gif
            {
                 return res.status(400).send("can not have images and a gif")
            }
              

     }


     //if the tweet is a reply to another tweet
     if(req.body.replyId) 
     {
        replyTemp = req.body.replyId

        //checking if the id of the tweet we are repling to is valid.
        try
        {
            originalTweet=await tweet.findById(req.body.replyId)
        }
        catch(error) //error with finding (invalid id)
        {
             return res.status(400).send("invalid reply tweet id");
        }
    
        if(!originalTweet) //the id of the tweet is not found
        {
            return res.status(400).send("reply tweet id not found");
            
        }

     }
               
             
    //The tweet/reply has to have at least one of these to be valid
     if(contentTemp!="" || mediaTemp!=[] || gifTemp!="")
     {  
         
            const userTweet= new tweet({
             content: req.body.content,
             postedBy: token,
             media: mediaTemp,
             replyTo:replyTemp,
             gifs:gifTemp,
             pinned:false,
             likes:[],
             retweeters:[],
             retweetInfo:[],
             numberLikes:0,
             numberReplies:0,
             numberRetweets:0
            });
            

             userTweet.save(async function(err,theTweet){
             if(err)
             {
                return res.status(400).send("error with saving the tweet.");
             }
             else
             {
                //If it is not a reply
                 if(replyTemp==undefined)
                 {
                    //add the tweet to the user's tweets 
                    await user.findByIdAndUpdate(token,{$addToSet:{tweets: theTweet.id}},{new:true})
                    .catch(error => {
                     console.log(error);
                     return res.status(400).send("error with adding the tweet to the user's tweets.");
                    })  
                 }

                 //if it is a reply
                 else 
                 {
                   //add the tweet to the user's replies
                   await user.findByIdAndUpdate(token,{$addToSet:{replies: userTweet["_id"]}},{new:true})
                   .catch(error => {
                      console.log(error);
                      return res.status(400).send("error with adding the tweet to the user's replies.");
                    })
                    await tweet.findByIdAndUpdate(replyTemp,{$inc : {'numberReplies' : 1}}); 
                 }
                 return res.sendStatus(200);
             }
         });
     }
     else{
        
         return res.status(400).send("error can not post an empty tweet.");
     }  
        

});
 
 
 //////////////////////////////////////////////////////////////////////////////Deleting a tweet:
 router.delete("/:id",auth, async function(req, res){
    var checkLikes=[];
    var userInfo=null;
    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.status(400).send("error with finding (invalid id)");
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.status(400).send("the id of the user is not found");
        
    }
 
    const Tweet = await tweet.findById(req.params.id)


    //if the tweet is found and is posted by the current logged in user:
    if (Tweet && Tweet.postedBy==req.user._id)
    {
        var deletedTweet=await tweet.findByIdAndDelete(req.params.id,{new:true})
        checkLikes.push(deletedTweet._id);
    }
    else
    {
        return res.status(400).send("The tweet you are trying to delete is not found");
    }

    //delete tweet from users schema:
    if(!Tweet.replyTo) //if it is a tweet or a retweet:
        {   
            //remove the tweet/retweet from the user's tweets. 
            await user.findByIdAndUpdate(req.user._id,{$pull:{tweets: req.params.id}},{new:true})

           
           if(Tweet.retweetInfo)
           {
               if(Tweet.retweetInfo.length!=0) //if the tweet deleted is a retweet
               {
                //decrement the number of retweets for the original tweet,remove user from retweeters:
                update1={
                    $inc:{'numberRetweets' : -1},
                    $pull:{retweeters:req.user._id}
                }
                await tweet.findByIdAndUpdate(Tweet.retweetInfo,update1,{new:true})
                }

             //if the tweet is neither a reply nor a retweet:
              else
             {
              //if the deleted tweet has replies:
              if(Tweet.numberReplies!=null &&Tweet.numberReplies > 0)
              {
                //delete any replies this tweet has:  
                const projection3 ={"_id":1,"replyTo":1,"postedBy":1,"retweeters":1};      
                var deletedReplies=await tweet.find({"replyTo":req.params.id}).select(projection3);
               if(deletedReplies)
                {

                   for(u=0;u<deletedReplies.length;u++)
                   {

                        //delete the reply itself:
                        await tweet.findByIdAndDelete(deletedReplies[u]._id);
                        checkLikes.push(deletedReplies[u]._id);

                        //remove the tweet from the user's replies array
                        await user.findByIdAndUpdate(deletedReplies[u].postedBy,{$pull:{replies:deletedReplies[u]._id}},{new:true})

                        //check if the reply has retweets remove these retweets.
                        allTheRetweets22=await tweet.find({retweetInfo:deletedReplies[u]._id},{new:true}).select({"_id":1,"postedBy":1});
                        if(allTheRetweets22)
                        {
                          for(g=0;g<allTheRetweets22.length;g++)
                          {
                            //remove retweets and remove them from tweets of users that posted them: 
            
                            //remove from user schema    
                            await user.findByIdAndUpdate(allTheRetweets22[g].postedBy,{$pull:{tweets:allTheRetweets22[g]._id}})
                            .catch(error => {
                                console.log(error);
                                return res.sendStatus(400);
                            })
                            //remove from tweets schema
                            await tweet.findByIdAndDelete(allTheRetweets22[g]._id);
                            checkLikes.push(allTheRetweets22[g]._id);
                          }   
                        } 
                         
                   }
                }
              }

              //if the deleted tweet has retweets:
              hasRetweets=await tweet.find({retweetInfo:Tweet._id},{new:true}).select({"_id":1,"postedBy":1});
              if(hasRetweets)
              {
                
                for(hr=0;hr<hasRetweets.length;hr++)
                {
                  //remove retweets and remove them from tweets of users that posted them: 
                  
                  //remove from user schema    
                  await user.findByIdAndUpdate(hasRetweets[hr].postedBy,{ $pull:{tweets:hasRetweets[hr]._id}})
                  .catch(error => {
                      console.log(error);
                      return res.sendStatus(400);
                  })
                  //remove from tweets schema
                  await tweet.findByIdAndDelete(hasRetweets[hr]._id);
                  checkLikes.push(hasRetweets[hr]._id);
                }   
              } 

           }
        }
        }

    else //if it is a reply
        {  
            //decrement the number of replies for the original tweet:
            await tweet.findByIdAndUpdate(Tweet.replyTo,{$inc:{'numberReplies' : -1}},{new:true})

            //remove the tweet from the user's replies array
            await user.findByIdAndUpdate(req.user._id,{$pull:{replies: req.params.id}},{new:true})

            //check if the reply has retweets remove these retweets.
            allTheRetweets=await tweet.find({retweetInfo:Tweet._id},{new:true}).select({"_id":1,"postedBy":1});
            if(allTheRetweets)
            {
              
              for(r=0;r<allTheRetweets.length;r++)
              {
                //remove retweets and remove them from tweets of users that posted them: 
                
                update2={
                    $pull:{tweets:allTheRetweets[r]._id}
                    } 
                //remove from user schema    
                console.log(allTheRetweets[r])
                await user.findByIdAndUpdate(allTheRetweets[r].postedBy,update2)
                .catch(error => {
                    console.log(error);
                    return res.sendStatus(400);
                })
                //remove from tweets schema
                await tweet.findByIdAndDelete(allTheRetweets[r]._id);
                checkLikes.push(allTheRetweets[r]._id);
              }   
            } 

        }

    //Any tweet removed should be removed from users liked tweets.
    if(checkLikes.length!=0)
    {
        await user.updateMany({},{$pull:{likes:{$in:checkLikes}}})
    }
    return res.status(200).send("successfully deleted.");
     
 })


//////////////////////////////////////////////////////////////////////////////Liking and unliking posts:
router.put("/:id/like",auth,async(req,res)=>{
    var userInfo=null;
    if(!req.params.id)
    {
        return res.status(400).send("The tweet id could not be read.");
        
    }  
     //post id
    var postId=req.params.id;
    token=req.user._id;
    try
    {
        userInfo=await user.findById(token)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }
    
    //checking if this tweet exists:
    try
    {
        var tweetFound=await tweet.find({_id:postId});
    }
    catch(error) //invalid tweet
    {
        return res.sendStatus(400);
    }
    if(tweetFound.length==0){ //tweet not found
        return res.sendStatus(400)
    }

    var foundLike= await user.find({_id:token,likes:{ $all:[postId]}},{new:true})

    //if the tweet is liked, unlike it and decrement number of likes
    if(foundLike.length!=0){

        await user.findByIdAndUpdate(token,{$pull:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        updateDecrement={
            $inc : {'numberLikes' : -1},
            $pull:{likes: token}
        }
        await tweet.findByIdAndUpdate(postId,updateDecrement,{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
    //if the tweet is unliked,like it and increment number of likes
    else{
        await user.findByIdAndUpdate(token,{$addToSet:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        updateIncrement={
            $inc : {'numberLikes' : 1},
            $addToSet: {likes: token}
        }
        await tweet.findByIdAndUpdate(postId,updateIncrement,{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })


    }
        return res.sendStatus(200);

})


//////////////////////////////////////////////////////////////////////////////Retweeting and unretweeting:
router.post("/:id/retweet",auth,async(req,res)=>{

    var postId=req.params.id; 
    token=req.user._id;
    var userInfo=null;

    try
    {
       userInfo =await user.findById(token)
     
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
         
         
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }
    
    //checking if the tweet we want to retweet exists:
    try
    {
        var tweetFound=await tweet.find({_id:postId});
    }
    catch(error) //invalid tweet
    {
        return res.sendStatus(400);
    }
    if(!tweetFound){ //tweet not found
        return res.sendStatus(400)
    }    
    

    //Checking if the retweet already exists
    found=await tweet.find({retweetInfo:postId,postedBy:token}).select("_id") 
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })


    if(found.length==0) //couldn't find the retweet, therefore create it.
        {
            //create a new retweet 
            //A retweet has no content.
            const userTweet= new tweet({
                postedBy: token,
                retweetInfo: postId,
                content:"",
                media:[],
                pinned:false,
                likes:[],
                retweeters:[],
                numberLikes:0,
                numberReplies:0,
                numberRetweets:0,
                gifs:""

            });
    
            userTweet.save(async function(err,theRetweet){
            if(err)
                return res.sendStatus(400)
            
            
            //add to retweets in users table
            await user.findByIdAndUpdate(token,{$addToSet:{tweets: theRetweet.id}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            //add to retweeters of the post in table tweets
            update={
                $inc : {'numberRetweets' : 1},
                $addToSet:{retweeters: token}
            }
            await tweet.findByIdAndUpdate(postId,update,{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
        });
        }

        //there is a retweet, therefore unretweet.
        else 
        {
            //remove the retweet from tweets
            RetweetID=await tweet.findByIdAndDelete(found)
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            
            
            //remove from retweets in users table
            await user.findByIdAndUpdate(token,{$pull:{tweets: RetweetID._id}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })
            //remove from retweeters in tweets table
            update={
                $inc : {'numberRetweets' : -1},
                $pull:{retweeters: token}
            }
            await tweet.findByIdAndUpdate(postId,update,{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })

        }

        return res.sendStatus(200)

})

/////////////////////////////////////////////////////////////////////////////Getting likers of a tweet:
router.get("/:id/likers",auth,async(req,res)=>{

    var postId=req.params.id; 
    token=req.user._id;
    var userInfo=null;

    try
    {
       userInfo =await user.findById(token)
     
    }
    catch(error) //error with finding (invalid id)
    {
         return res.status(400).send("error with finding user (invalid id)");
          
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.status(400).send("the id of the user is not found");
    }

    //checking if the tweet we want to retweet exists:
    var tweetFound=null;
    try
    {
        tweetFound=await tweet.find({_id:postId});
    }
    catch(error) //invalid tweet
    {
        return res.status(400).send("invalid tweet");
    }
    if(!tweetFound){ //tweet not found
        return res.status(400).send("tweet not found")
    }

    finalArray=[];
    const projection ={"_id":0,"name":1,"username":1,"description":1};
    for(iterator=0; iterator<tweetFound[0]["likes"].length;  iterator++)
    {
        currentLiker=tweetFound[0]["likes"][iterator]
        var likingUser=await user.findOne({_id:currentLiker}).select(projection)
        finalArray.push(likingUser)
    }
    res.status(200).send(finalArray);

})

/////////////////////////////////////////////////////////////////////////////Searching by tweet's content:
router.get("/search/all",auth,async(req,res)=>{

try {
        let page=req.query.page;
        let size=req.query.size;
        //default value is 1 if page parameter is not given.
        if (!page) {
            page = 1;
        }
        //default value is 10 if page parameter is not given.
        if (!size) {
            size = 10;
        }

   //Casting the size string to integer.
   const limit = parseInt(size); 
   theUser=req.user._id;

   const projection = { "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1,"numberLikes":1,"numberReplies":1,"numberRetweets":1};
   var partOfContent=req.query.search;

   var results = await tweet.find(({"content":{$regex:partOfContent,$options:"i"}}),projection).limit(limit).skip(size*(page-1))
   .populate("postedBy")
   .populate("retweeters")
   .populate("likes")
   .sort({"createdAt":-1})    
   .catch(error => {
       console.log(error);
       return res.status(400).send("error: problem with finding the tweets")
   })
   if (!results) 
      return res.status(200).send("No tweets found")
   if(results==[] || results.length==0)   
      return res.status(200).send("No tweets found")

      finalArray=[];
      for(i=0;i<results.length;i++)
      {
       if (!results[i])
           continue;

 
       //do not view reply as a tweet. go to next iteration.   
       if(results[i]["replyTo"]==undefined || results[i]["replyTo"]==null || results[i]["replyTo"].length=="") 
      {


       if(results[i]._id)
      { 
          Liked=false
          Retweeted=false

          //Checking if the tweet is liked by the current user.
          var userLiked=results[i].likes.some(item => item._id == theUser)
          if(userLiked)
              Liked=true
             
          //Checking if the tweet is retweeted by the current user.
          var userRetweeted=results[i].retweeters.some(item => item._id == theUser)
          if(userRetweeted)
              Retweeted=true
      }
      else
      {
          return res.sendStatus(400).send("one of the tweets' ids is null");
      }    

       var contentTemp="";
       var gifTemp=results[i]["gifs"];
       var tempMedia=results[i]["media"]
       var urls=[]
       if(!tempMedia || tempMedia.length==0)
       {
           if(!gifTemp || gifTemp.length==0)
           {
               urls=[];
           }
           else
           {
               urls.push(gifTemp);
           }
       }
       else
       {
           urls=tempMedia;
       }
   
       if(results[i]["content"])
                contentTemp=results[i]["content"];

       
       const Obj= ({
           id:results[i]["_id"],
           userName: results[i].postedBy.username,
           displayName: results[i].postedBy.name,
           content: contentTemp,
           URLs:urls,
           isLiked:Liked,
           isRetweeted:Retweeted,
           noOfLike:results[i].numberLikes,
           noOfReplies:results[i].numberReplies,
           noOfRetweets:results[i].numberRetweets,
          });


       finalArray.push(Obj)
             
       }
   }

    if(finalArray.length==0)
    {
       return res.status(200).send("no tweets found"); 
    }
    return res.status(200).send(finalArray); 
}
catch (error) {
    return res.status(400).send("problem with page parameters size/number");
}
})

/////////////////////////////////////////////////////////////////////////////Getting repliers info:


module.exports =router;
