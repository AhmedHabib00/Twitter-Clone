const request = require('supertest');
const server = require('../app');
const userSchema = require('../components/User/userSchema')
const tweetSchema = require('../components/Tweets/tweetsSchema');
const { ObjectId, Admin } = require('mongodb');



// GET: admins/ -> Retrieve all admins
describe('GET: admins/',()=>{

    test('Retrieve all admins: should respond with a 200 status code', async ()=>{
        const res = await request(server).get('/admins')
        expect(res.statusCode).toEqual(200)
    });

    test('Retrieve Admins Page=1&Size=3: should respond with a 200 status code',async ()=>{
        const res = await request(server).get('/admins/?page=1&size=3')
        expect(res.statusCode).toEqual(200)
    });

});



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



// PATCH: admins/:id/banning/:target_user_id/ -> Ban a user by admin
describe('PATCH: admins/:id/banning/:target_user_id/',()=>{

    test('Ban a user by admin: should respond with a 200 status code', async ()=>{
        // Set start_date, end_date
        start_date = new Date();
        let thisMonth = start_date.getMonth();
        let thisYear = start_date.getFullYear();
        end_date = new Date(thisYear, thisMonth+3, 1);

        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
        
        // Get User id
        let UserId = await userSchema.find({"role":"User"},"_id").limit(1);
        UserId = UserId[0]._id.toString();
        
        const res = await request(server).patch('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(200);
        expect.objectContaining({
            "Ban": true,
            "bannedUser": ObjectId(AdminId),
            "bannedBy": ObjectId(UserId),
            "bannedStartDate": start_date,
            "bannedEndDate": end_date
        });
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
        
        const res = await request(server).patch('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "Ban": false
        });
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
        
        const res = await request(server).patch('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "Ban": false
        });
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
        
        const res = await request(server).patch('/admins/'+AdminId+'/banning/'+UserId).send({
            end_date: end_date
        });

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "Ban": false
        });
    });

});



// POST: admins/:id/adding/ -> Add a new admin
describe('POST: admins/:id/adding/',()=>{

    test('Add a new admin: Should respond with a 201 status code', async ()=>{
        // Delete if found to test 
        userSchema.deleteOne({"username":"testAdmin"}).exec();
        
        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
                
        const res = await request(server).post('/admins/'+AdminId+'/adding/').send({
            name: "testAdmin",
            username: "testAdmin",
            email: "testAdmin@gmail.com", 
            password: "1fds54dfa5531avsad"
        });

        expect(res.statusCode).toEqual(201);
        expect.objectContaining({
            "Add": true
        });
    });

    test('Add an existing admin: Should respond with a 500 status code', async ()=>{
        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(2);
        AdminId = AdminId[1]._id.toString();

        let testAdmin = await userSchema.findOne({"role":"Admin"}).limit(1);

        const res = await request(server).post('/admins/'+AdminId+'/adding/').send({
            name: testAdmin.name, 
            username: testAdmin.username, 
            email: testAdmin.email,
            password: "1fds54dfa5531avsad"
        });

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "Add": false
        });
    });
    
});



// DELETE: admins/:id/adding/ -> Delete user by admin
describe('DELETE: admins/:id/adding/',()=>{

    // test('Delete an user: Should respond with a 202 status code', async ()=>{
    //     // Get Admin id
    //     let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
    //     AdminId = AdminId[0]._id.toString();

    //     let testUserId = await userSchema.find({"role":"User"},"_id").limit(1);
    //     testUserId = testUserId[0]._id.toString();
                
    //     const res = await request(server).delete('/admins/'+AdminId+'/deleting/'+testUserId);

    //     expect(res.statusCode).toEqual(202);
    //     expect.objectContaining({
    //         "deleted": true,
    //         "user": testUserId,
    //         "by": AdminId
    //     });
    // });

    test('Delete not found user: Should respond with a 500 status code', async ()=>{
        // Get Admin id
        let AdminId = await userSchema.find({"role":"Admin"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();
        testUserId = 'fakeId'
                
        const res = await request(server).delete('/admins/'+AdminId+'/deleting/'+testUserId);

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "deleted": false,
        });
    });

    test('Delete user by another user: Should respond with a 500 status code', async ()=>{
        // Get Admin id
        let AdminId = await userSchema.find({"role":"User"},"_id").limit(1);
        AdminId = AdminId[0]._id.toString();

        let UserId = await userSchema.find({"role":"User"},"_id").limit(2);
        UserId = UserId[1]._id.toString();
        
        console.log('/admins/'+AdminId+'/banning/'+UserId)

        const res = await request(server).delete('/admins/'+AdminId+'/deleting/'+UserId);

        expect(res.statusCode).toEqual(500);
        expect.objectContaining({
            "deleted": false,
        });
    }); 
});