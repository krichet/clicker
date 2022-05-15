const express = require('express')

const path = require('path')
const https = require('https')

const puppeteer = require('puppeteer')
const puppeteerProxy =  require('puppeteer-proxy')

const proxyChain = require('proxy-chain')
  

const http = require('http')
const url = require('url')
const cors = require('cors')

const app = express()

app.use(cors({
  origin: '*'
}));

const PORT = process.env.PORT || 85

//start server 
app.listen(PORT, () => {
  console.log('server has been started')
})



app.get('/parser', function(req,res){

  // let serfOptions = {
  //   keywords: ["lexora bathroom", "faucet lexora"],
  //   delay: 5
  // }

  (async () => {
    const browser = await puppeteer.launch(
      {
        headless: false,
        args: ['--no-sandbox']
      }
    );
    let page = await browser.newPage();
    // page.setDefaultNavigationTimeout(0)
    

    await page.setRequestInterception(true);
    
  
    page.on('request', async (request) => {
      await puppeteerProxy.proxyRequest({
        page,
        // proxyUrl: 'http://lum-customer-c_1447ae37-zone-mobile-mobile:kcmsr6iz4bvo@zproxy.lum-superproxy.io:22225',
        // proxyUrl: 'http://go:dgtht9@108.168.148.93:7675',
        proxyUrl: '',
        request,
      });
    });

    
    await page.goto('https://www.homedepot.com/', {waitUntil: 'domcontentloaded'})

    // await page.screenshot({ path: 'main.png' });
    
    await page.type('#headerSearch', 'lexora bathroom', {delay: 20})

    await Promise.all([
      console.log(await page.url()),
      await page.keyboard.press('Enter', {delay: 100}),
      await page.waitForNavigation(),
    ]).catch(e => console.log(e))

    //

    const productsPage = await Promise.all([
      // getNewPage(),
      console.log(await page.url()),
      // page.screenshot({ path: 'products.png' }),
      await page.click('.product-pod__title__product')
      
    ]).catch(e => console.log(e))

    
    const singleProductPage = await Promise.all([

      console.log(await page.url()),    
      
      await page.waitForSelector('.super-sku__inline-tile'),
      await page.screenshot({ path: 'single.png' }),
      await page.click('.increment')

    ]).catch(e => console.log(e))    

    await browser.close()



    








    

    function getNewPage() {
      return new Promise((resolve) => {
        browser.on('targetcreated', checkNewTarget);
  
        function checkNewTarget(target) {
          if (target.type() === 'page') {
            browser.off('targetcreated', checkNewTarget)
            resolve(target.page())
          }
        }
      });
    }    
  
  })(); 

});















