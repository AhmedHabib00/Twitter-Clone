// /*const chai = require('chai');
// const chaiHttp = require('chai-http');
// //Assertion style
// chai.should();*/

// //const { async } = require('jshint/src/prod-params');
// const request = require('supertest');
// const app = require('../../../app');
// const User = require('../../User/userSchema');
// const { name } = require('ejs');


// describe('profileSettings',() =>{
//     //Test Get request
//     describe("Get /user/:userID/profile_settings", () =>{
//         it("It should GET new user profile info", async() => {
//             const response = await request(app).get('/user/6248a661b871949e56e40ee1/profile_settings' ).field("name","Omar")
//             // const profile = response.json(User)
//             // .expect(name).toEqual("Omar")
//             expect(response.statusCode).toEqual(200);
//         });

//         it("It should NOT GET new user profile info", async() => {
//             const response = await request(app).get('/user/fds4a8f1ds5a6/profile_settings' );
//             expect(response.statusCode).toEqual(400);
//         });
//     });

//     //Test Patch request

//     describe("Patch /user/:userID/profile_settings", () =>{
//         it("It should PATCH user profile info", async() => {
//             const response = await request(app).patch('/user/6248a661b871949e56e40ee1/profile_settings');
//             expect(response.statusCode).toEqual(200);
//         });

//         it("It should NOT PATCH new user profile info", async() => {
//             const response = await request(app).patch('/user/fds4a8f1ds5a6/profile_settings');
//             expect(response.statusCode).toEqual(400);
//         });
//     });
// /*
//     //Test Get user Info request
//     describe("Get /users/:userProfileId/profile_settings",() =>{
//         it("Should get user info",(done)=> {
//             const userID = "624689cc5f11f8368d5bdeb5";
//             chai.request(userProfile)
//                 .get("/users/" + userID + "/profile_settings")
//                 .end((err,res)=> {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have,property('id');
//                     res.body.should.have,property('name');
//                     res.body.should.have,property('location');
//                     res.body.should.have,property('bio');
//                     res.body.should.have,property('birthdate');
//                     res.body.should.have,property('id').eq("624689cc5f11f8368d5bdeb5");
    
//                 done();
//                 });
//         });
//         it("It should Not Get user profile info beacuse ID doesnot exist", (done) =>  {
//             const userID = "00";
//             const user = {
//                 name:"Ahmed"
//             };
//             chai.request(userProfile)
//                 .get("/users/" + userID + "/profile_settings")
//                 .send(user)
//                 .end((err,res)=> {
//                     res.should.have.status(400);
//                     res.text.should.be.eq("Couldnot find ID")
//                 done();
//                 });
//         });



//     });

//     //Test Patch user Info request
//     describe("Patch /users/:userProfileId/profile_settings",() => {
//         it("Should patch user profile info",(done) => {
//             const userID = "624689cc5f11f8368d5bdeb5";
//             const user = {
//                 name:"Abdullah mohamed"
//             };
//             chai.request(userProfile)
//                 .patch("/users/" + userID + "/profile_settings")
//                 .send(user)
//                 .end((err,res)=> {
//                     res.should.have.status(200);
//                     res.body.should.be.a('object');
//                     res.body.should.have,property('name').eq("Abdullah mohamed");
//                     res.body.should.have,property('bio').eq("playing football");
//                     res.body.should.have,property('birthdate').eq("27/10/199999");
//                     res.body.should.have,property('id').eq("624689cc5f11f8368d5bdeb5");
    
//                 done();
//                 });
//         });
//         it("It should Not patch user profile info beacuse ID doesnot exist", (done) =>  {
//             const userID = "00";
//             const user = {
//                 name:"Ahmed"
//             };
//             chai.request(userProfile)
//                 .patch("/users/" + userID + "/profile_settings")
//                 .send(user)
//                 .end((err,res)=> {
//                     res.should.have.status(400);
//                     res.text.should.be.eq("Couldnot find ID")
//                 done();
//                 });
//         });



//     })

//     //Test Delete user Info request

//     describe("Delete /users/:userProfileId/profile_settings",() => {
//         it("It should DELETE existing user info", (done) =>  {
//             const userID = "624689cc5f11f8368d5bdeb5";
//             chai.request(userProfile)
//                 .delete("/users/" + userID + "/profile_settings")
//                 .send(user)
//                 .end((err,res)=> {
//                     res.should.have.status(200);
//                 done();
//                 });
//         });

//         it("It should DELETE existing user info", (done) =>  {
//             const userID = "00";
//             chai.request(userProfile)
//                 .delete("/users/" + userID + "/profile_settings")
//                 .send(user)
//                 .end((err,res)=> {
//                     res.should.have.status(400);
//                     res.text.should.be.eq("Couldnot find ID")
//                 done();
//                 });
//         });


//     })*/
// })