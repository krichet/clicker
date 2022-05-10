const express = require('express')
const { MongoClient } = require('mongodb')
const bodyParser = require('body-parser');
const path = require('path')
const https = require('https');

const puppeteer = require('puppeteer');
const puppeteerProxy =  require('puppeteer-proxy')

const proxyChain = require('proxy-chain');
  

const http = require('http');
const url = require('url');
const cors = require('cors');

const app = express()

app.use(cors({
  origin: '*'
}));

// for parsing post request
app.use(express.json({limit: '50mb'})) // for parsing application/json
// app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const PORT = process.env.PORT || 85;

let newCards;






//start server 
app.listen(PORT, () => {
  console.log('server has been started')
})



app.get('/parser', function(req,res){

//   (async () => {    

//     // change username & password
//     const oldProxyUrl = 'http://lum-customer-c_1447ae37-zone-mobile-mobile:kcmsr6iz4bvo@zproxy.lum-superproxy.io:22225';
//     const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

//     const browser = await puppeteer.launch({
//         headless: false,
//         args: [
      
//             '--no-sandbox',
//             '--disable-setuid-sandbox',
//             `--proxy-server=${newProxyUrl}`
//         ]
//     });

//     const page = await browser.newPage();
//     await page.goto('https://www.whatismyip.com/');
//     await page.screenshot({ path: 'example.png' });

//     await browser.close();
// })();



  // (async () => {
  //   const browser = await puppeteer.launch({
  //     // Launch chromium using a proxy server on port 9876.
  //     // More on proxying:
  //     //    https://www.chromium.org/developers/design-documents/network-settings
  //     args: [
  //       '--proxy-server=zproxy.lum-superproxy.io:22225',
  //       // Use proxy for localhost URLs
  //       '--proxy-bypass-list=<-loopback>',
  //     ],
  //   });
  //   const page = await browser.newPage();

  //   await page.authenticate({        
  //     username: 'lum-customer-c_1447ae37-zone-data_center-country-us',
  //     password: '22zgjxia60aq'
  //     })


  //   await page.goto('https://google.com');
  //   await page.screenshot({ path: 'example.png' });    
  //   await browser.close();
  // })();


  // const proxy = 'zproxy.lum-superproxy.io:22225';
  // const username = 'lum-customer-c_1447ae37-zone-data_center-country-us';
  // const password = '22zgjxia60aq';
  
  // (async () => {
  //     // Pass proxy URL into the --proxy-server arg
  //     const browser = await puppeteer.launch();
  
  //     const page = await browser.newPage()

  //     console.log('connection started')
  //     console.log(page)
  
  //     // Authenticate our proxy with username and password defined above
  //     // await page.authenticate({ username, password });
  
  //     await page.goto('https://www.google.com');
  //     await page.screenshot({ path: 'example.png' });
  
  //     await browser.close();
  // })();


  
  (async () => {
    const browser = await puppeteer.launch(
      {
        headless: true,
        args: ['--no-sandbox']
      }
    );
    const page = await browser.newPage();

    await page.setRequestInterception(true);
  
    page.on('request', async (request) => {
      await puppeteerProxy.proxyRequest({
        page,
        proxyUrl: 'http://lum-customer-c_1447ae37-zone-mobile-mobile:kcmsr6iz4bvo@zproxy.lum-superproxy.io:22225',
        request,
      });
    });

    
    
    // await page.goto('https://krichet.com');
    // await page.screenshot({ path: 'krichet.png' });

    await page.goto('https://techoverflow.net', {waitUntil: 'domcontentloaded'});
    // Wait for 5 seconds
    console.log(await page.content());
    // Take screenshot
    await browser.close();    
  
  })(); 

  
  

});





//add new account


/////////////////////
// add new user request
/////////////////////
// app.get('/add/:user', function(req,res){

//   let newCards;

//   let collectionName = req.params.user;
  
//   let userProfileUrl = 'https://api2.splinterlands.com/cards/collection/' + req.params.user
    
//     //initialize pulling user cards
//     https.get(userProfileUrl, (resp) => {
//     let data = '';
  
//     // A chunk of data has been received.
//     resp.on('data', (chunk) => {
//       data += chunk;      
//     });

//     const dburl = "mongodb+srv://sl_user:123qweasdzxc@cluster0.1tjie.mongodb.net/myFirstDatabase";
//     const client = new MongoClient(dburl);
     
//      // The database to use
//     const dbName = "splinterlands";
                          

//         try {
//             client.connect(() => {
//             console.log("Connected correctly to server");
//             const db = client.db(dbName);

//             db.createCollection(req.params.user);

//             const col = db.collection(collectionName);
                                                                                                                                                           

//             let allCards = JSON.parse(data);
//             col.insertMany(allCards.cards);

//             col.updateMany( {}, {"$set": { "read": false }}, false, true );

//             col.find( { } ).toArray().then(response => getNewCards(response));
            
//             function getNewCards(cards) {
//               newCards = cards;
//               console.log(newCards);
//             }
                                    

//             });          

//             } catch (err) {
//              console.log(err.stack);
//          }
     
//          finally {
//              client.close();
//         }
    
//         res.send(newCards);
  
//     resp.on('end', () => {



//     });
  
//   }).on("error", (err) => {
//     // console.log("Error: " + err.message);
//   });
// });


///////////////////////
// mark cards read
///////////////////////
app.post('/toread/', function(req,res){
  
  let cardsToRead = req.body.cards;
  
  // console.log(req.body)

  const dburl = "mongodb+srv://sl_user:123qweasdzxc@cluster0.1tjie.mongodb.net/myFirstDatabase";
  const client = new MongoClient(dburl);
   
   // The database to use
  const dbName = "splinterlands";
                        

      try {
          client.connect(() => {
          console.log("Connected correctly to server");
          const db = client.db(dbName);

          // db.createCollection(req.params.user);

          const col = db.collection(req.body.user);
                                                                                                                                                         

            // let allCards = JSON.parse(data);
            // col.insertMany(allCards.cards);

            console.log(cardsToRead);

            col.updateMany( {uid: {$in : cardsToRead}}, {"$set": { "read": true }}, false, true );                                                      

          }).then(
            console.log(result),
            console.log(error)
          )

          } catch (err) {
           console.log(err.stack);
       }
   
       finally {
           client.close();
      }

  res.json(req.body)
});





///////////////////////
// regular update of cards
///////////////////////
app.get('/update/:user', function(req,res){






  let collectionName = req.params.user;
  
  let userProfileUrl = 'https://api2.splinterlands.com/cards/collection/' + req.params.user
    
    //initialize pulling user cards
    https.get(userProfileUrl, (resp) => {
    let data = '';
  
    // A chunk of data has been received.
    resp.on('data', (chunk) => {
      data += chunk;      
    });

    let cardsToRead = ['4324111']

    const dburl = "mongodb+srv://sl_user:123qweasdzxc@cluster0.1tjie.mongodb.net/myFirstDatabase";
    const client = new MongoClient(dburl);
     
     // The database to use
    const dbName = "splinterlands";
                          

        try {
            client.connect(() => {
            console.log("Connected correctly to server");
            const db = client.db(dbName);                   

            const col = db.collection(collectionName);
                                                                                                                                                           
            let allCards = JSON.parse(data);
            
            allCards.cards.forEach(element => {
              col.update(
                {uid: element.uid}, 
                {
                  $set: {
                    player: element.player,
                    card_detail_id: element.card_detail_id,
                    delegated_to: element.delegated_to,
                    level: element.level,
                    gold: element.gold,
                    edition: element.edition
                  },
                  $setOnInsert: {
                    read: false
                  }              
                }, 
                {upsert: true, multi: true}          
              );                              
            });            
            
            // function getNewCards(cards) {
            //   newCards = cards;
            //   // console.log(newCards);
            // }
                                    

            });          

            } catch (err) {
             console.log(err.stack);
         }
     
         finally {
             client.close();
        }
    
        res.send('cards updated');
  
    resp.on('end', () => {



    });
  
  }).on("error", (err) => {
    // console.log("Error: " + err.message);
  });
});



///////////////////////
// pull new cards
///////////////////////
app.get('/newcards/:user', function(req,res){

  let collectionName = req.params.user;
  
  // let userProfileUrl = 'https://api2.splinterlands.com/cards/collection/' + req.params.user
    
    // //initialize pulling user cards
    // https.get(userProfileUrl, (resp) => {
    // let data = '';
  
    // // A chunk of data has been received.
    // resp.on('data', (chunk) => {
    //   data += chunk;      
    // });

    const dburl = "mongodb+srv://sl_user:123qweasdzxc@cluster0.1tjie.mongodb.net/myFirstDatabase";
    const client = new MongoClient(dburl);
     
     // The database to use
    const dbName = "splinterlands";
                          

        try {
            client.connect(() => {
            console.log("Connected correctly to server");
            const db = client.db(dbName);            

            const col = db.collection(collectionName);                                                                                                                                                        

            col.find( { "read": false } ).toArray((err, cards) => {
              res.send(cards)
            });

            // console.log(cards);
            
            // function getNewCards(cards) {              
            //   res.send(cards);              
            // }
                        

            }); 




            } catch (err) {
             console.log(err.stack);
         }
     
         finally {
             client.close();
        }
    
        
  
    // resp.on('end', () => {
      
    // });
  
  // }).on("error", (err) => {
  //   // console.log("Error: " + err.message);
  // });
});


// app.get('/set-cookie', (req, res) => {
//   res.cookie('token2', '12345ABCDE')
//   res.send('Set Cookie')
// })  