const request = require('supertest');
const server = require('../app');
const userSchema = require('../components/User/userSchema')
const tweetSchema = require('../components/Tweets/tweetsSchema');
const { ObjectId, Admin } = require('mongodb');



// GET: admins/users/ -> Retrieve all users
describe('GET: admins/users/',()=>{

    test('Retrieve all users: should respond with a 200 status code', async ()=>{
        const res = await request(server).get('/admins/users')
        expect(res.statusCode).toEqual(200)
    });

    test('Retrieve Users Page=1&Size=3: should respond with a 200 status code',async ()=>{
        const res = await request(server).get('/admins/users/?page=1&size=3')
        expect(res.statusCode).toEqual(200)
    });

});



// GET: admins/users/ -> Retrieve all users
describe('GET: admins/statistics/',()=>{

    test('Retrive statistics data about users: should respond with a 200 status code', async ()=>{
        const res = await request(server).get('/admins/statistics/')
        expect(res.statusCode).toEqual(200)
    });

});



// POST: admins/:id/banning/:target_user_id/ -> Ban a user by admin
describe('POST: admins/:id/banning/:target_user_id/',()=>{

    test('Ban a user by admin: should respond with a 200 status code', async ()=>{
        // Set start_date, end_date
        start_date = new Date();
        let thisMonth = start_date.getMonth();
        let thisYear = start_date.getFullYear();
        end_date = new Date(thisYear, thisMonth+3, 5);
        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id;
        
        // Get User id
        let UserId = await userSchema.find({"role":"User"},"_id").limit(1);
        UserId = UserId[0]._id;
        
        const res = await request(server).post('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(200);
    });

    test('Fail response: The one makes ban is a User => should respond with a 500 status code', async ()=>{
        // Set start_date, end_date
        start_date = new Date();
        end_date = new Date();

        // Get Admin id
        let AdminId = await userSchema.find({"role":"User"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
        
        // Get User id
        let UserId = await userSchema.find({"role":"User"},"_id").limit(1);
        UserId = UserId[0]._id.toString();
        
        const res = await request(server).post('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
    });

    test('Fail response: Admin ban another admin => should respond with a 500 status code', async ()=>{
        // Set start_date, end_date
        start_date = new Date();
        let thisMonth = start_date.getMonth();
        let thisYear = start_date.getFullYear();
        end_date = new Date(thisYear, thisMonth+3, 1);

        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
        
        // Get User id
        let UserId = await userSchema.find({"role":"Admin"},"_id").limit(2);
        UserId = UserId[1]._id.toString();
        
        const res = await request(server).post('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
        
    });

    test('Fail response: The duration is negative => should respond with a 500 status code', async ()=>{
        // Set start_date, end_date
        start_date = new Date();
        end_date = new Date();

        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
        
        // Get User id
        let UserId = await userSchema.find({"role":"User"},"_id").limit(1);
        UserId = UserId[0]._id.toString();
        
        const res = await request(server).post('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
    });

});
