const request=require('supertest');
const server=require('../app');

describe("POST /signUp" ,()=>{

    describe("user gives required signup information (name email and bithdate)", ()=>{
        //status code is 201
        test("should respond with 201 status code", async ()=> {
            const response = await request(server).post('/signUp').send({
                name:"emailtestuser",
                email:"user2@gmail.com",
                birthdate:"12-3-45"
            })
                
            expect(response.statusCode).toBe(201)
        })
        
    })
    describe("missing a signup inormation", ()=>{

        test("should respond with 400 status code", async ()=> {
            const response = await request(server).post("/signUp").send({
                name:"emailtestuser",
                email:"user2@gmail.com"
            })
            expect(response.statusCode).toBe(400)
        })
    })

 });





// describe("PATCH /signUp/verifyEmail" ,()=>{

//     describe("verifyEmail", ()=>{

//         //status code is 200
//         test("correct code entered and valid registerer", async ()=> {
//             const response = await request(server).patch('/signUp/verifyEmail').send({
//                 code:  276822,
//                 email: "user2@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(200)
//         })
//         test("Invalid registerer", async ()=> {
//             const response = await request(server).patch('/signUp/verifyEmail').send({
//                 code:  276822,
//                 email: "user5@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(400)
//         })
//         test("INcorrect code entered", async ()=> {
//             const response = await request(server).patch('/signUp/verifyEmail').send({
//                 code:  172133,
//                 email: "user2@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(400)
//         })
//     })    
// });




// describe("PATCH /signUp/setPassword" ,()=>{

//         describe("setPassword", ()=>{
    
//             //can set password only once
//             test("password field entered and valid registerer", async ()=> {
//                 const response = await request(server).patch('/signUp/setPassword').send({
//                     password:  "182133",
//                     email: "user2@gmail.com"
//                 })
                    
//                 expect(response.statusCode).toBe(200)
//             })
//             test("Invalid registerer", async ()=> {
//                 const response = await request(server).patch('/signUp/setPassword').send({
//                     password:  "182133",
//                     email: "user5@gmail.com"
//                 })
                    
//                 expect(response.statusCode).toBe(400)
//             })
//             test("password not entered", async ()=> {
//                 const response = await request(server).patch('/signUp/setPassword').send({
//                     email: "user2@gmail.com"
//                 })
                    
//                 expect(response.statusCode).toBe(400)
//             })
//         })
 
// });





// describe("POST /signUp/setUsername" ,()=>{

//     describe("setUsername", ()=>{

//         //can set password only once
//         test("username already taken", async ()=> {
//             const response = await request(server).post('/signUp/setUsername').send({
//                 username:  "firstUsername",
//                 email: "user2@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(400)
//         })
//         test("unique username and email in request ", async ()=> {
//             const response = await request(server).post('/signUp/setUsername').send({
//                 username:  "unique",
//                 email: "user2@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(201)
//         })
//         test("Invalid registerer", async ()=> {
//             const response = await request(server).post('/signUp/setUsername').send({
//                 username:  "unique",
//                 email: "user5@gmail.com"
//             })
                
//             expect(response.statusCode).toBe(404)
//         })
        
//     })

// });