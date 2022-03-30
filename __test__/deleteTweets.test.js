const server=require('../app');
const request=require('supertest');

describe("Deleting tweets test cases:",() =>{
    it('Valid existing tweet ID: should respond with a 202 status code',async() =>{
      const rs=await request(server).delete('/tweets/623ee1672949e1270065d719')
      expect(rs.statusCode).toEqual(202);
      
        });


    it('Unvalid id, tweet does not exist: should respond with a 400 status code',async() =>{
          const rs=await request(server).delete('/tweets/6575756ty5yhfffff6645r54')
          expect(rs.statusCode).toEqual(400);
          
        });   
        
        
    it('No id is provided: should respond with a 400 status code',async() =>{
          const tweetId="" 
          const rs=await request(server).delete('/tweets/'+tweetId)
          expect(rs.statusCode).toEqual(404);
          
        });    
    
    });