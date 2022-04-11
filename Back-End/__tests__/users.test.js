const request = require('supertest');
const server = require('../app');
const userSchema = require('../components/User/userSchema');


// users ||Test||
describe('GET: users/',()=>{

    test('Test users route: should respond with a 200 status code', async ()=>{
        const res = await request(server).get('/users/')
        expect(res.statusCode).toEqual(200)
    });

});


//"""Follow endpoints"""
// List of users who are followers of the user ID : GET /users/{id}/followers
describe('GET: users/:id/followers',()=>{
    test('List of users who are followers of the user ID: should respond with a 200 status code', async ()=>{
        randomUserId = await userSchema.findOne({"role":"User"});
        randomUserId = randomUserId._id.toString();

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
        randomUserId = randomUserId._id.toString();
        
        const res = await request(server).get('/users/'+randomUserId+'/following');
        expect(res.statusCode).toEqual(200);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        errorRandomUserId = "fakeId"
        const res = await request(server).get('/users/'+errorRandomUserId+'/following');
        expect(res.statusCode).toEqual(500);
    });
});


// Allows a user ID to follow another user : PATCH /users/{source_user_id}/following/{target_user_id}
describe('PATCH /users/{source_user_id}/following/{target_user_id}',()=>{

    test('Allows a user ID to follow another user: should respond with a 200 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id
        target_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        target_user_id = target_user_id[1]._id

        console.log(source_user_id)
        console.log(target_user_id)

        const res = await request(server).patch('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(200);
    });

    test('User ID follows itself: should respond with a 500 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id

        const res = await request(server).patch('/users/'+source_user_id+'/following/'+source_user_id);
        expect(res.statusCode).toEqual(500);
    });

    test('Undefined User Id: should respond with a 500 status code', async ()=>{
        source_user_id = "fakeId1"
        target_user_id = "fakeId2"

        const res = await request(server).patch('/users/'+source_user_id+'/following/'+target_user_id);
        expect(res.statusCode).toEqual(500);
    });
});


// Allows a user ID to unfollow another user : DEL /users/{source_user_id}/following/{target_user_id}
describe('DEL /users/{source_user_id}/following/{target_user_id}',()=>{
    test('Allows a user ID to follow another user: should respond with a 200 status code', async ()=>{
        source_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        source_user_id = source_user_id[0]._id
        target_user_id = await userSchema.find({"role": "User"},"_id").limit(2);
        target_user_id = target_user_id[1]._id

        console.log(source_user_id)
        console.log(target_user_id)

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