// const server=require('../app');
// const request=require('supertest');
// const path=require('path')
// const TOKEN="623ee4ed8b88f2ec6366fe52"
// const imagePath1 = path.resolve(__dirname, `./TestImage1.JPG`);
// const imagePath2 = path.resolve(__dirname, `./TestImage2.JPG`);
// const imagePath3 = path.resolve(__dirname, `./TestImage3.JPG`);
// const imagePath4 = path.resolve(__dirname, `./TestImage4.JPG`);        
// const imagePath5 = path.resolve(__dirname, `./TestImage5.JPG`);


// //Test cases for deleting tweets:
// describe("Deleting tweets test cases:",() =>{
//     it('Valid existing tweet ID: should respond with a 202 status code',async() =>{
//       const rs=await request(server).delete('/tweets/6248b880df4de572481ab842')
//       expect(rs.statusCode).toEqual(202);
      
//         });


//     it('Unvalid id, tweet does not exist: should respond with a 400 status code',async() =>{
//           const rs=await request(server).delete('/tweets/6575756ty5yhfffff6645r54')
//           expect(rs.statusCode).toEqual(400);
          
//         });   
        
        
//     it('No id is provided: should respond with a 400 status code',async() =>{
//           const tweetId="" 
//           const rs=await request(server).delete('/tweets/'+tweetId)
//           expect(rs.statusCode).toEqual(404);
          
//         });    
    
//     });

// //Test cases for posting tweets:
// describe("Posting tweets test cases:",() =>{
//       it('Tweet content exists and media does not exist: should respond with a 200 status code',async() =>{
//         const rs=await request(server).post('/tweets/').send({tweetContent: "This is a tweet with content only"}).set('authorization', `Bearer ${TOKEN}`)

//         expect(rs.statusCode).toEqual(200);
//       });
  

//       it('Media exists and tweet content does not exist: should respond with a 200 status code',async() =>{
//         const rs=await request(server).post('/tweets/').field("tweetContent", "")
//         .attach('im',imagePath1)
//         .attach('im',imagePath2)
//         .set('authorization', `Bearer ${TOKEN}`) 

//         expect(rs.statusCode).toEqual(200);
//       });    
      
//       it('More than 4 images are attached: should respond with a 400 status code',async() =>{
        
//         const rs=await request(server).post('/tweets/').field("tweetContent", "")
//         .attach('im',imagePath1)
//         .attach('im',imagePath2)
//         .attach('im',imagePath3)
//         .attach('im',imagePath4)
//         .attach('im',imagePath5)
//         .set('authorization', `Bearer ${TOKEN}`) 

//         expect(rs.statusCode).toEqual(400);
//       });   
      
//       it('Neither media nor tweet content exist: should respond with a 400 status code',async() =>{     
//         const rs=await request(server).post('/tweets/').field("tweetContent", "").attach('im',"").set('authorization', `Bearer ${TOKEN}`)  
//         expect(rs.statusCode).toEqual(400);
//       });

//     });
          
