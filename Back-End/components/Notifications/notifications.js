const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const User = require('../User/userSchema');
const Tweet=require('../Tweets/tweetsSchema');  
const Notification = require('./notificationsShema'); 

const admin = require('firebase-admin');
const serviceAccount = require('../../twitterclone-66e05-firebase-adminsdk-t1w1p-12386329f8.json');
  
const SaveNotification =async function SaveNotification(notification)
 {
    if (!admin.apps.length) { // this to check if there's app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://twitterclone-66e05-default-rtdb.firebaseio.com',
      });
    }
    const FIREBASE_DATABASE = admin.database();
  
    const doc = await FIREBASE_DATABASE.ref('/notifications').push(notification);
    if (doc) { return doc; }
  };
///////////////////////////////////////////////////////////////////
const getNotifications = async function getNotifications(userId) {
  if (!admin.apps.length) { // this to check if there's app
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://twitterclone-66e05-default-rtdb.firebaseio.com',
    });
  }
  const FIREBASE_DATABASE = admin.database();
  
  try{
    snapshot = await FIREBASE_DATABASE.ref('/notifications').orderByChild('to').equalTo(userId)
    .once('value');
    if (snapshot.val()
    && snapshot.val()[   Object.keys(snapshot.val()) [0]   ] === undefined) { return null; }
    if (!snapshot.val()) {return null;}

    const notifications = [];
  
    const size = Object.keys(snapshot.val()).length;
    for (let i = 0; i < size; i += 1) {
      notifications.push(snapshot.val()[Object.keys(snapshot.val())[i]]);
    }
    return notifications;
  }
  catch(err){
      console.log(err);
  }
  
  
};
///////////////////////////////////////////////////////////////////////
const SendNotificationToUser = async function SendNotificationToUser(notification) {

    if (!admin.apps.length) { // this to check if there's app
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: 'https://twitterclone-66e05-default-rtdb.firebaseio.com',
      });
    }
    const FIREBASE_MESSAGING = admin.messaging();
    const FIREBASE_DATABASE = admin.database();
    
    
    // creating my Own notification that will be (pushed-up)
    const newNotification = notification;
  
    newNotification.title = 'Whisper App';
    if (notification.reason === 'like') {
      newNotification.body = `${notification.senderName} liked your tweet`;
    } else if (notification.reason === 'reply') {
      newNotification.body = `${notification.senderName} replied on your photo`;
    } else if (notification.reson === 'retweet') {
      newNotification.body = `${notification.senderName} retweeted your tweet`;
    } else if (notification.reson === 'follower tweeted'){
        newNotification.body = `${notification.senderName} tweeted`;
    }else if (notification.reson === 'block'){
        newNotification.body = `whisper admin has blocked you for ${notification.blockDuration}`;
    }
    newNotification.icon = 'https://files.softicons.com/download/social-media-icons/free-social-media-icons-by-uiconstock/png/256x256/Twitter-Icon.png';
   
    const {
      from,
      to,
      recieverName,
      senderName,
      id,
      reason,
      entityId,
      title,
      body,
      icon,
    } = notification;
  
    // querying database searching for reciever token
    // if found therefore he will be online and send him notification
    // else exit
    const tokensRef = FIREBASE_DATABASE.ref('/tokens');
    const tokenSnapshot = await tokensRef.orderByChild('userId').equalTo(to).once('value');
    if (!tokenSnapshot.val()) {
      return;
    }
  
    // accessing token as its returned as
    // we will make array of tokens as if user is logged in in mobile and web
    // at same time so to send to both
    const tokensValue = [];// tokenSnapshot.val()[Object.keys(tokenSnapshot.val())[0]].token;
  
    const size = Object.keys(tokenSnapshot.val()).length;
    for (let i = 0; i < size; i += 1) {
      tokensValue.push(tokenSnapshot.val()[Object.keys(tokenSnapshot.val())[i]].token);
    }

    const payload = {
      notification: {
        title: newNotification.title,
        body: newNotification.body,
        icon: newNotification.icon,
      },
      data: { // real data must be sent ( whole notification)
        sender:from,
        to,
        recieverName,
        senderName,
        id,
        reason,
        entityId,
        title,
        body,
        icon,
      },
    };
    console.log("yarab");
    
    // so now we have token of reciever and we just need to send
    try{
        const response = await FIREBASE_MESSAGING.sendToDevice(tokensValue, payload);
        console.log(response);
    }
    catch(err)
    {
        console.log(err);

    }
    // will do here some database cleanups if token fails !!!
    ////await clearInvalidToken(tokenSnapshot, response.results);
    // so if he unsubscribe or token changed --> delete it from db
  };
const createLikeNotification = async function createLikeNotification (tweetId, likingUserId)  {  
    try {
      const tweet = await Tweet.findById(tweetId);
      let reciever; // tweet writer
      if (tweet) {
        reciever = tweet.postedBy;
      } else {
        return 'tweet not found';
      }
      const recieverInfo = await User.findById(reciever);
      const senderInfo = await User.findById(likingUserId);
      if (likingUserId.toString() !== reciever.toString()) {
        // checking sender != reciever as we cant notify that you liked yourself
        let senderName = senderInfo.username;
        let recieverName = recieverInfo.username;
        const newNotification = new Notification({
          from: likingUserId,
          senderName,
          to: reciever, 
          recieverName,
          reason: 'like',
          entityId : tweetId,
          //senderImageUrl: senderInfo.profilePic,
        });
        await newNotification.save()
        senderName = senderName === undefined ? null : senderName;
        recieverName = recieverName === undefined ? null : recieverName;
  
        const id = newNotification._id;
        const firebaseNotification = { 
          from: newNotification.from.toString(),
          senderName,
          to: newNotification.to.toString(),
          recieverName,
          id: id.toString(),
          reason: newNotification.reason,
          entityId: newNotification.entityId.toString(),
          //senderImageUrl: senderInfo.profilePic,
        };
        await SaveNotification(firebaseNotification); 
        await SendNotificationToUser(firebaseNotification); 
        return 'success';
      }
    
    } catch (err) {
     console.log(err);
     return 'failure';
    }
  };
const createBlockNotification = async function createBlockNotification (blockedUserId,AdminId,blockDuration)  {
  
    try {
      const user = await User.findById(blockedUserId);
      let reciever; // the blocked user
      if (user) {
        reciever = user;
      } else {
        console.log('user Not Found');
        return 'user not found';
      }
      const admin = await User.findById(AdminId);
      let sender; // the admin
      if (admin && admin.role =='Admin') {
        sender = admin;
      } else {
        console.log('admin Not Found');
        return  'admin not found';
      }
     
        
    let senderName = sender.username;
    let recieverName = reciever.username;
    const newNotification = new Notification({
        from: AdminId,
        senderName,
        to: blockedUserId, 
        recieverName,
        reason: 'block',
        blockDuration,
        //entityId : tweetId,
        //senderImageUrl: senderInfo.profilePic,
    });
        
        senderName = senderName === undefined ? null : senderName;
        recieverName = recieverName === undefined ? null : recieverName;
  
        const id = newNotification._id;
        const firebaseNotification = { // due to firebase constrictions
          from: newNotification.from.toString(),
          senderName,
          to: newNotification.to.toString(),
          recieverName,
          id: id.toString(),
          reason: newNotification.reason,
          blockDuration:newNotification.blockDuration.toString(),
          //entityId: newNotification.entityId.toString(),
          //senderImageUrl: senderInfo.profilePic,
        };
        await SaveNotification(firebaseNotification); 
        await SendNotificationToUser(firebaseNotification);
        return 'success';
    
    } catch (err) {
     console.log(err);
     return 'failure';
    }
  };
const createFollowerTweetingNotification = async function createFollowerTweetingNotification (tweetingUserId,tweetId)  {
  
    try {
        let sender;
        const senderInfo = await User.findById(tweetingUserId);
        if (senderInfo) {
            sender = senderInfo._id;
        } else {
            return 'user not found';
        }
        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return 'tweet not found';
        }
        let recievers = senderInfo.followers;
        for (i=0; i< recievers.length;i++)
        {
            const recieverInfo= await User.findById(recievers[i]);
            if (!recieverInfo) return 'user not found';
            let senderName = senderInfo.username;
            let recieverName = recieverInfo.username;
            console.log(recieverName);
            const newNotification = new Notification({
                from: sender,
                senderName,
                to: recievers[i]._id, 
                recieverName,
                reason: 'follower tweeted',
                entityId : tweetId,
                //senderImageUrl: senderInfo.profilePic,
                });
            senderName = senderName === undefined ? null : senderName;
            recieverName = recieverName === undefined ? null : recieverName;
    
            const id = newNotification._id;
            const firebaseNotification = { 
            from: newNotification.from.toString(),
            senderName,
            to: newNotification.to.toString(),
            recieverName,
            id: id.toString(),
            reason: newNotification.reason,
            entityId: newNotification.entityId.toString(),
            //senderImageUrl: senderInfo.profilePic,
            };
            await SaveNotification(firebaseNotification); 
            await SendNotificationToUser(firebaseNotification);
        }
        return 'success';
    } catch (err) {
            console.log(err);
            return 'failure';
    }
  };
  //createLikeNotification("6260a395711f5ce89d8b54b0","6248c3b66ad307b6e8623c57");
  //result = getNotifications("6257129df18fcd7147c6c825");
  //result = getNotifications("6248c3b66ad307b6e8623c57");
  //createBlockNotification("6248c3b66ad307b6e8623c57","6249921db35e4fa55a5da228","2 days");
  //createFollowerTweetingNotification("6249921db35e4fa55a5da228","6260a395711f5ce89d8b54b0");
  module.exports = {
    createLikeNotification, createBlockNotification, createFollowerTweetingNotification,getNotifications
  };  