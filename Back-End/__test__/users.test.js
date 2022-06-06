const request = require('supertest');
const server = require('../app');
const userSchema = require('../components/User/userSchema');
const tweetSchema = require('../components/Tweets/tweetsSchema');

let token = 0;

describe('GET: /users/gToken/{id}',()=>{
    test('Get token: should respond with a 200 status code', async ()=>{
        randomUser = await userSchema.findOne({role:"User"});
        randomUserId = randomUser._id;
        
        const res = await request(server).get('/users/gToken/'+randomUserId);
        token = res.body;
        console.log(token)
        expect(res.statusCode).toEqual(200);
    });
});


// """Bookmarks endpoints"""
// List of bookmarked tweets of the user ID : GET /users/:id/bookmarks/
describe('GET: /users/{id}/bookmarks/',()=>{
    test('List of bookmarked tweets of the user ID: should respond with a 200 status code', async ()=>{
        randomUser = await userSchema.findOne({role:"User"});
        randomUserId = randomUser._id;
    
        const res = await request(server).get('/users/'+randomUserId+'/bookmarks');
        expect(res.statusCode).toEqual(200);
    });
});

// Allows an user to bookmark tweet : POST /users/{id}/bookmarks/{tweet_id}
describe('POST /users/{id}/bookmarks/{tweet_id}',()=>{

    test('Allows an user to bookmark tweet: should respond with a 200 status code', async ()=>{
        user = await userSchema.findOne({"role": "User"}, "_id");
        user_id = user._id;
        tweet = await tweetSchema.findOne({"role": "User"}, "_id");
        tweet_id = tweet._id;

        const res = await request(server).post('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        user_id = "FakeUserId";
        tweet = await tweetSchema.findOne({"role": "User"}, "_id");
        tweet_id = tweet._id;



        const res = await request(server).post('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(500);
    });

    test('Undefined Tweet Id: should respond with a 500 status code', async ()=>{
        user_id = await userSchema.findOne({"role": "User"}, "_id");
        user_id = user_id._id;
        tweet_id = "FakeTweetId";

        const res = await request(server).post('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(500);
    });

});

// Allows an user to unbookmark tweet : DEL /users/{id}/bookmarks/{tweet_id}
describe('DEL /users/{id}/bookmarks/{tweet_id}',()=>{
    test('Allows an user to unbookmark tweet: should respond with a 200 status code', async ()=>{
        user = await userSchema.findOne({"role": "User"}, "_id");
        user_id = user._id;
        tweet = await tweetSchema.findOne({"role": "User"}, "_id");
        tweet_id = tweet._id;

        const res = await request(server).delete('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        user_id = "FakeUserId";
        tweet_id = await tweetSchema.findOne({"role": "User"}, "_id");
        tweet_id = tweet_id._id;

        const res = await request(server).delete('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(500);
    });

    test('Undefined Tweet Id: should respond with a 500 status code', async ()=>{
        user_id = await userSchema.findOne({"role": "User"}, "_id");
        user_id = user_id._id;
        tweet_id = "FakeTweetId";

        const res = await request(server).delete('/users/'+user_id+'/bookmarks/'+tweet_id);
        expect(res.statusCode).toEqual(500);
    });
});

//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
describe('GET: users/:id/followers',()=>{
    test('List of users who are followers of the user ID: should respond with a 200 status code', async ()=>{
        randomUserId = await userSchema.findOne({"role":"User"});
        randomUserId = randomUserId._id;

        const res = await request(server).get('/users/'+randomUserId+'/followers');
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        errorRandomUserId = "fakeId"
        
        const res = await request(server).get('/users/'+errorRandomUserId+'/followers')
        expect(res.statusCode).toEqual(500)
    });
});

// List of users the specified user ID is following : GET /users/{id}/following
describe('GET: users/:id/following',()=>{
    test('List of users the specified user ID is following: should respond with a 200 status code', async ()=>{
        randomUserId = await userSchema.findOne({"role":"User"});
        randomUserId = randomUserId._id;
        
        const res = await request(server).get('/users/'+randomUserId+'/following');
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        errorRandomUserId = "fakeId"
        const res = await request(server).get('/users/'+errorRandomUserId+'/following');
        expect(res.statusCode).toEqual(500);
    });
});

// Allows a user ID to follow another user : POST /users/{source_user_id}/following/{target_user_id}
describe('POST /users/{source_user_id}/following/{target_user_id}',()=>{

    test('Allows a user ID to follow another user: should respond with a 200 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id
        target_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        target_user_id = target_user_id[1]._id

        const res = await request(server).post('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(200);
    });

    test('User ID follows itself: should respond with a 500 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id

        const res = await request(server).post('/users/'+source_user_id+'/following/'+source_user_id);
        expect(res.statusCode).toEqual(500);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        source_user_id = "fakeId1"
        target_user_id = "fakeId2"

        const res = await request(server).post('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(500);
    });
});

// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
describe('DEL /users/{source_user_id}/following/{target_user_id}',()=>{
    test('Allows a user ID to unfollow another user: should respond with a 200 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id
        target_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        target_user_id = target_user_id[1]._id

        const res = await request(server).delete('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        source_user_id = "fakeId1"
        target_user_id = "fakeId2"

        const res = await request(server).delete('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(500);
    });
});