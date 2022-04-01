const chai = require('chai');
const chaiHttp = require('chai-http');
//Assertion style
chai.should();

const request = require('supertest');
const app = require('../app');
const userProfile = require('../routes/userProfile')

chai.use(chaiHttp);


describe('profileSettings',() =>{
    //Test post request
    describe("post /users/profile_settings", () =>{
        it("It should POST new user profile info", (done) => {
            const testprofile = {
                name:"Omar Abuelfadl",
                bio:"Studying software engineering",
                location:"Bedroom",
                birthDate:"27/10/1999"
            };
            chai.request(userProfile)
                .post("/users/profile_settings")
                .send(testprofile)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have,property('name').eq("Omar Abuelfadl");
                    res.body.should.have,property('bio').eq("Studying software engineering");
                    res.body.should.have,property('location').eq("Bedroom");
                    res.body.should.have,property('birthDate').eq("27/10/1999");

                });
        });
    });

    //Test Get user Info request
    describe("Get /users/:userProfileId/profile_settings",() =>{
        it("Should get user info",(done)=> {
            const userID = "624689cc5f11f8368d5bdeb5";
            chai.request(userProfile)
                .get("/users/" + userID + "/profile_settings")
                .end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have,property('id');
                    res.body.should.have,property('name');
                    res.body.should.have,property('location');
                    res.body.should.have,property('bio');
                    res.body.should.have,property('birthdate');
                    res.body.should.have,property('id').eq("624689cc5f11f8368d5bdeb5");
    
                done();
                });
        });
        it("It should Not Get user profile info beacuse ID doesnot exist", (done) =>  {
            const userID = "00";
            const user = {
                name:"Ahmed"
            };
            chai.request(userProfile)
                .get("/users/" + userID + "/profile_settings")
                .send(user)
                .end((err,res)=> {
                    res.should.have.status(400);
                    res.text.should.be.eq("Couldnot find ID")
                done();
                });
        });



    });

    //Test Patch user Info request
    describe("Patch /users/:userProfileId/profile_settings",() => {
        it("Should patch user profile info",(done) => {
            const userID = "624689cc5f11f8368d5bdeb5";
            const user = {
                name:"Abdullah mohamed"
            };
            chai.request(userProfile)
                .patch("/users/" + userID + "/profile_settings")
                .send(user)
                .end((err,res)=> {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have,property('name').eq("Abdullah mohamed");
                    res.body.should.have,property('bio').eq("playing football");
                    res.body.should.have,property('birthdate').eq("27/10/199999");
                    res.body.should.have,property('id').eq("624689cc5f11f8368d5bdeb5");
    
                done();
                });
        });
        it("It should Not patch user profile info beacuse ID doesnot exist", (done) =>  {
            const userID = "00";
            const user = {
                name:"Ahmed"
            };
            chai.request(userProfile)
                .patch("/users/" + userID + "/profile_settings")
                .send(user)
                .end((err,res)=> {
                    res.should.have.status(400);
                    res.text.should.be.eq("Couldnot find ID")
                done();
                });
        });



    })

    //Test Delete user Info request

    describe("Delete /users/:userProfileId/profile_settings",() => {
        it("It should DELETE existing user info", (done) =>  {
            const userID = "624689cc5f11f8368d5bdeb5";
            chai.request(userProfile)
                .delete("/users/" + userID + "/profile_settings")
                .send(user)
                .end((err,res)=> {
                    res.should.have.status(200);
                done();
                });
        });

        it("It should DELETE existing user info", (done) =>  {
            const userID = "00";
            chai.request(userProfile)
                .delete("/users/" + userID + "/profile_settings")
                .send(user)
                .end((err,res)=> {
                    res.should.have.status(400);
                    res.text.should.be.eq("Couldnot find ID")
                done();
                });
        });


    })
})