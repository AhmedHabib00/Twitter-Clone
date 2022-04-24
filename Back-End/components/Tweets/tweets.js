const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const bodyParser = require('body-parser');
const user = require('../User/userSchema');
const tweet=require('./tweetsSchema');  
const auth=require('../middleware/auth');

const http = require('https'); 
const fs = require('fs');


const multer=require('multer')

const filestorageEngine=multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,"./uploads")
    },
    filename:(req,file,cb) => {
    cb (null,Date.now()+"-"+file.originalname);
    }
});

objectMulter={
    storage: filestorageEngine
}

const upload=multer(objectMulter).array('images',4);

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

    // theUser="62608baaaa118abd39b1288f";
    const theUser=req.user._id;
    // theTweet="62604a81aa118abd39b12886";
    const theTweet=req.params.id;
    finalArray=[]
    // theUser=req.user._id;

    const projection = { "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1};
    const projection2 ={"_id":0,"name":1,"username":1};

    try{
    var results=await tweet.find({replyTo:theTweet},projection).limit(limit).skip(size*(page-1))
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
        var numLikes=results[i]["likes"].length
        var numRetweets=results[i]["retweeters"].length
        var tempMedia=results[i]["media"]

        const the_id= results[i]["_id"]
        //the user who posted this reply.
        var theId=results[i]["postedBy"]
        var contentTemp="";
        var gifTemp="";
        
    
        if(results[i]["content"])
                 contentTemp=results[i]["content"];
      
        if(results[i]["gifs"])         
                 gifTemp=results[i]["gifs"];
        var results2 = await user.findById(theId,projection2)
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

       //Getting number of replies for the tweet:
       results22=await tweet.find({replyTo:the_id},{new:true}) 
       .catch(error => {
        console.log(error);
        return res.sendStatus(400);
       })
       countReplies=results22.length;

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

  
        // console.log(results[i]["likes"])
        // const numLikes1=results[i]['likes'].length
        
        // numLikes=numLikes1.length
        

        var img=[]
        if (tempMedia.length==0)
        {
               img[0]="";
               img[1]="";
               img[2]="";
               img[3]="";
        }
        else{
            
            for(j=0;j<tempMedia.length;j++)
            {
               img[j]=tempMedia[j]
            }

            if(j==1) //1 image
            {
                img[1]=""
                img[2]=""
                img[3]=""
            }

            else if(j==2) //2 images
            {
                img[2]=""
                img[3]=""
            }

            else if(j==3) //3 images
            {
                img[3]=""
            }
        }        

        const Obj= ({
            id:the_id,
            userName: results2["username"],
            displayName: results2["name"],
            content: contentTemp,
            img1:img[0],
            img2:img[1],
            img3:img[2],
            img4:img[3],
            gifs:gifTemp,
            isLiked:Liked,
            isRetweeted:Retweeted,
            noOfLike:numLikes,
            noOfReplies:countReplies,
            noOfRetweets:numRetweets,
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

    // theUser=req.user._id;
    TheTweet=req.params.id;
    // theUser="62608baaaa118abd39b1288f";

    

  
    // finalArray=[]
    const projection ={ "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1};;
    const projection2 ={"_id":0,"name":1,"username":1};

    try{
        var results= await tweet.find({_id:TheTweet},projection)
        }
        catch(error)
        {
            return res.sendStatus(400);
        }
        if(!results.length)
        {
            return res.status(400).send("tweet not found");
        }
    // console.loh
    // console.log(results[0])
    // .catch(error => console.log(error))


  
    // console.log(results)


   //Getting number of replies for the tweet:
   findReplies=await tweet.find({replyTo:TheTweet},{new:true})
   .catch(error => {
    console.log(error);
    return res.sendStatus(400);
   })  
   countReplies=findReplies.length;


    
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

        //Checking if the tweet is liked by current user.  
        var Liked=false     
        var foundLike= await user.find({_id:theUser,likes:{ $all:TheTweet}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

        if(foundLike.length!=0)
            Liked=true

    // console.log(results[0]["likes"])
    var numLikes=results[0]["likes"].length
    var numRetweets=results[0]["retweeters"].length
    // console.log("likesNum: ")
    // console.log(numLikes)
    var theId=results[0]["postedBy"]
    // console.log(results[i]["media"])
    var tempMedia=results[0]["media"]
    var img=[]
    if (tempMedia.length==0)
    {
           img[0]="";
           img[1]="";
           img[2]="";
           img[3]="";
    }
    else{
        
        for(j=0;j<tempMedia.length;j++)
        {
           img[j]=tempMedia[j]
        }

        if(j==1) //1 image
        {
            img[1]=""
            img[2]=""
            img[3]=""
        }

        else if(j==2) //2 images
        {
            img[2]=""
            img[3]=""
        }

        else if(j==3) //3 images
        {
            img[3]=""
        }

    }

    var contentTemp="";
    var gifTemp="";
    

    if(results[0]["content"])
             contentTemp=results[i]["content"];
  
    if(results[0]["gifs"])         
             gifTemp=results[i]["gifs"];

    var results2 = await user.findById(theId,projection2)
    .catch(error => {
        console.log(error);
        return res.sendStatus(400);
    })
    // console.log(results2)
    const Obj= ({
        id:results[0]["_id"],
        userName: results2["username"],
        displayName: results2["name"],
        content: contentTemp,
        img1:img[0],
        img2:img[1],
        img3:img[2],
        img4:img[3],
        gifs:gifTemp,
        isLiked:Liked,
        isRetweeted:Retweeted,
        noOfLike:numLikes,
        noOfReplies:countReplies,
        noOfRetweets:numRetweets,
       });
    res.status(200).send(Obj);     


})


///////////////////////////////////////////////////////////////////////////////////Getting timeline tweets endpoint:
router.get("/TimelineTweets",auth,async (req,res)=>{

    // try {
    //     let { page, size } = req.query;
  
    //     //default value is 1 if page parameter is not given.
    //     if (!page) {
    //         page = 1;
    //     }
    //     //default value is 10 if page parameter is not given.
    //     if (!size) {
    //         size = 10;
    //     }

    //     //Casting the size string to integer.
    //     const limit = parseInt(size);


        // theUser="62615984578b341248402d89";
        const theUser=req.user._id;
        finalArray=[]
        const projection = { "_id": 1,"media":1,"gifs":1,"content":1,"postedBy":1,"likes":1,"retweeters":1,"replyTo":1};
        const projection2 ={"_id":0,"name":1,"username":1};


        // .limit(limit).skip(size*(page-1))
        var results = await tweet.find({},projection)
        .catch(error => {
            console.log(error);
            return res.status(400).send("error: problem with finding the tweets");;
        })



    for(i=0;i<results.length;i++)
       {
           //console.log(results.length)
           //console.log(i);
  
        //do not view reply as a tweet.go to next iteration.   
        if(results[i]["replyTo"]==undefined || results[i]["replyTo"]==null || results[i]["replyTo"].length=="") 
       {
       //Getting number of replies for the tweet:
       findReplies=await tweet.find({replyTo:results[i]["_id"]},{new:true}) 
       .catch(error => {
        console.log(error);
        return res.status(400).send("error: problem with getting number of replies for the tweet");;
       });
       countReplies=findReplies.length;


        
        //Checking if the tweet is retweeted by the current user.
        var Retweeted=false       
        findRetweet=await tweet.find({retweetInfo:results[i]["_id"],postedBy:theUser}).select("_id") 
        .catch(error => {
            console.log(error);
            return res.sendStatus(400).send("error: problem with checking if the tweet is retweeted by the current user ");
        })       
        if(findRetweet.length!=0)
            Retweeted=true

        
        //Checking if the tweet is liked by current user.  
        var Liked=false     
        var foundLike= await user.find({_id:theUser,likes:{ $all:results[i]["_id"]}},{new:true})
        .catch(error => {
            console.log(error);
            return res.status(400).send("error: problem with checking if if the tweet is liked by current user ");;
        })        
        if(foundLike.length!=0)
            Liked=true

  

        var numLikes=results[i]["likes"].length
        var numRetweets=results[i]["retweeters"].length
        // console.log("likesNum: ")
        // console.log(numLikes)
        var theId=results[i]["postedBy"]
        // console.log(results[i]["media"])
        var tempMedia=results[i]["media"]
        var img=[]
        if (tempMedia.length==0)
        {
               img[0]="";
               img[1]="";
               img[2]="";
               img[3]="";
        }
        else{            
            for(j=0;j<tempMedia.length;j++)
            {
                console.log(process.env.DOMAIN+'/'+tempMedia[j])
               img[j]='http://'+process.env.DOMAIN+'/'+tempMedia[j]
            }

            if(j==1) //1 image
            {
                img[1]=""
                img[2]=""
                img[3]=""
            }

            else if(j==2) //2 images
            {
                img[2]=""
                img[3]=""
            }

            else if(j==3) //3 images
            {
                img[3]=""
            }

        }


        var contentTemp="";
        var gifTemp="";
        

        if(results[i]["content"])
                 contentTemp=results[i]["content"];
      
        if(results[i]["gifs"])         
                 gifTemp=results[i]["gifs"];

        var results2 = await user.findById(theId,projection2)
        .catch(error => {
            return res.status(400).send("error: problem with finding current user");;
        }) 
        
        const Obj= ({
            id:results[i]["_id"],
            userName: results2["username"],
            displayName: results2["name"],
            content: contentTemp,
            img1:img[0],
            img2:img[1],
            img3:img[2],
            img4:img[3],
            gifs:gifTemp,
            isLiked:Liked,
            isRetweeted:Retweeted,
            noOfLike:numLikes,
            noOfReplies:countReplies,
            noOfRetweets:numRetweets,
           });


        finalArray.push(Obj)

              
        }
    }
// }
// catch (error) {
//     return res.status(400).send("problem with page parameters size/number");
// }

        if(finalArray.length==0)
        {
            return res.status(200).send([]); 
        }
        return res.status(200).send(finalArray);    
})

//////////////////////////////////////////////////////////////////////////////Posting and replying
router.post("/",auth, async function(req,res){

    //A tweet can have content or images or gifs, but it can not be empty 
    //A tweet can have maximum 4 images/1 gif.
    //number of characters in a tweet is maximum: 
    //same goes for a reply


    //If there is an error with uploading the images, send a 400 status
    //an error is not the same as not uploading images
    upload(req,res,async function(err){
        // console.log(req.files);
        // console.log(req.body);
    if(err){
        console.log(err);
        return res.sendStatus(400)
    } 
    else{

    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)     
    }
    catch(error) //error with finding (invalid id)
    {
        console.log(err);
         return res.sendStatus(400);
    }

    // console.log(req.body.content)
    if(userInfo==null || req.body.content==null || req.files==null || req.body.gifs==null || req.body.replyId==null) //the id of the user is not found
    {
        return res.status(400).send("1 of the body parameters could not be read.");
        
    }
    
    
    //initialising images,gifs,content,reply as empty
     mediaTemp=[]
     contentTemp=""
     replyTemp=undefined //represents an empty object
     gifTemp=""
     console.log("here")   
     
     //if the tweet has content 
     if(req.body.content!="")
     {
         contentTemp=req.body.content
         //checking that the tweet is maximum 280 charcters
         if(contentTemp.length>280)
            return res.status(400).send("the tweet is longer than 280 characters")
     }
 
    //if the tweet has images
     if(req.files)
     {
         m=req.files
         
         for(i=0;i<m.length;i++)
          {
                 mediaTemp.push(req.files[i].path.replace("\\","/"))
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
                return res.sendStatus(400)  //can not have more than 1 gif    
            } 

        
        if(mediaTemp.length!=0) //can not have images and a gif
            {
                 return res.sendStatus(400)
            }
              

     }


     //if the tweet is a reply to another tweet
     if(req.body.replyId!="") 
     {
        replyTemp = req.body.replyId

        //checking if the id of the tweet we are repling to is valid.
        try
        {
            originalTweet=await tweet.findById(req.body.replyId)
        }
        catch(error) //error with finding (invalid id)
        {
             return res.sendStatus(400);
        }
    
        if(!originalTweet) //the id of the tweet is not found
        {
            return res.sendStatus(400);
            
        }

     }
               
             
    //The tweet/reply has to have at least one of these to be valid
     if(contentTemp!="" || mediaTemp!="" || gifTemp!="")
     {  

            const userTweet= new tweet({
             content: req.body.content,
             postedBy: token,
             media: mediaTemp,
             replyTo:replyTemp,
             gifs:gifTemp
            });
            

             userTweet.save(async function(err,theTweet){
             if(err)
             {
                return res.sendStatus(400);
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
                     return res.sendStatus(400);
                    })  
                 }

                 //if it is a reply
                 else 
                 {
                   //add the tweet to the user's replies
                   await user.findByIdAndUpdate(token,{$addToSet:{replies: userTweet["_id"]}},{new:true})
                   .catch(error => {
                      console.log(error);
                      return res.sendStatus(400);
                }) 
                 }
                 return res.sendStatus(200);
             }
         });
     }
     else{
        
         return res.sendStatus(400);
     }  
        }
  });

});
 
 
 //////////////////////////////////////////////////////////////////////////////Deleting a tweet:
 router.delete("/:id",auth, async function(req, res){

    try
    {
        userInfo=await user.findById(req.user._id)
    }
    catch(error) //error with finding (invalid id)
    {
         return res.sendStatus(400);
    }

    if(!userInfo) //the id of the user is not found
    {
        return res.sendStatus(400);
        
    }

    try
    {
        deletedTweet=await tweet.findByIdAndDelete(req.params.id)
    }
    catch(error) //error with deleting
    {
         return res.sendStatus(400);
    }

    if(!deletedTweet) //the id of the tweet in the path parameters is not found
    {
        return res.sendStatus(400);
    }
    else
    {
        //deleting the tweet's images from the uploads file
        if(deletedTweet.media.length!=0)
        {
            for(i=0;i<deletedTweet.media.length;i++)
            {
                //from index 5 till the end
                fileName= deletedTweet.media[i].substring(8,deletedTweet.media[i].length)
                fs.unlinkSync("./uploads/"+fileName)
            }
        }

        return res.sendStatus(200);
    }
     
 })




//////////////////////////////////////////////////////////////////////////////Liking and unliking posts:
router.put("/:id/like",auth,async(req,res)=>{
    console.log("aywa")
    console.log(req.params.id); //post id
    var postId=req.params.id;
    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)
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

    //if the tweet is liked, unlike it
    if(foundLike.length!=0){

        await user.findByIdAndUpdate(token,{$pull:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        await tweet.findByIdAndUpdate(postId,{$pull:{likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
    //if the tweet is unliked,like it.
    else{
        await user.findByIdAndUpdate(token,{$addToSet:{likes: postId}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })
        await tweet.findByIdAndUpdate(postId,{$addToSet: {likes: token}},{new:true})
        .catch(error => {
            console.log(error);
            return res.sendStatus(400);
        })

    }
        return res.sendStatus(200);

})



//////////////////////////////////////////////////////////////////////////////Retweeting and unretweeting:
router.post("/:id/retweet",auth,async(req,res)=>{

    console.log(req.params.id); //post id
    var postId=req.params.id; 
    token=req.user._id
    try
    {
        userInfo=await user.findById(req.user._id)
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
    if(tweetFound.length==0){ //tweet not found
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
            await tweet.findByIdAndUpdate(postId,{$addToSet:{retweeters: token}},{new:true})
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
            await tweet.findByIdAndUpdate(postId,{$pull:{retweeters: token}},{new:true})
            .catch(error => {
                console.log(error);
                return res.sendStatus(400);
            })

        }

        return res.sendStatus(200)

})



module.exports =router;
