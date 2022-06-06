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

app.use(express.json({limit: '50mb'}))

const PORT = process.env.PORT || 85

//start server 
app.listen(PORT, () => {
  console.log('server has been started')
})

//visited URLs 
let pageUrls = []

app.post('/parser', function(req,res){

  const keywords = req.body.keywords

  Promise.all(keywords.map((keyword) => runClicks(req, res, keyword))).then(() => {
    res.send(pageUrls)
  })
})


async function runClicks(req, res, keyword) {

  let options = req.body

  const browser = await puppeteer.launch(
    {
      headless: false,
      args: ['--no-sandbox']
    }
  );
  let page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0)
  

  await page.setRequestInterception(true);
  

  page.on('request', async (request) => {
    await puppeteerProxy.proxyRequest({
      page,
      proxy: 'http://lum-customer-c_1447ae37-zone-residential-country-us:xug116vo90pu@zproxy.lum-superproxy.io:22225',
      // proxyUrl: '',
      request,
    })      
  })

  
  await page.goto('https://www.homedepot.com/', {waitUntil: 'domcontentloaded'})

  // await page.screenshot({ path: 'main.png' });
  
  await page.type('#headerSearch', keyword, {delay: parseInt(options.searchTypingDelay)})

  
  await Promise.all([
    pageUrls.push(await page.url()),
    console.log(pageUrls),
    await page.keyboard.press('Enter', {delay: parseInt(options.searchBtnDelay)}),
    await page.waitForNavigation()
  ]).catch(e => console.log(e))


  const productsPage = await Promise.all([
    // getNewPage(),
    pageUrls.push(await page.url()),
    console.log(pageUrls),
    await page.setDefaultNavigationTimeout(0),
    await page.waitForSelector('.product-pod__title__product'),
    await page.click('.product-pod__title__product', {delay: parseInt(options.singleProductDelay)}),
    // await page.waitForNavigation()      
  ]).catch(e => console.log(e))


  const singleProductPage = await Promise.all([

    pageUrls.push(await page.url()),
    console.log(pageUrls),    
    await page.waitForSelector('.mediagallery__anchor'),
    await page.click('.mediagallery__anchor', {delay: 5000}),
    await page.click('.mediagallery__anchor', {delay: 1000}),
    await page.waitForSelector('.close-button'),
    await page.click('.close-button', {delay: 5000}),
    await page.waitForSelector('.increment'),
    await page.click('.increment', {delay: 3000}),
    await page.click('.increment', {delay: 1000})
  ]).catch(e => console.log(e))      

  await setTimeout(() => {
    browser.close()    
  }, 20000);
  

  // try {
  //   res.send(pageUrls)
  // }

  // catch(error) {
  //   console.log(error)
  // }

}















