const express = require('express')

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

const PORT = process.env.PORT || 85;

//start server 
app.listen(PORT, () => {
  console.log('server has been started')
})



app.get('/parser', function(req,res){

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