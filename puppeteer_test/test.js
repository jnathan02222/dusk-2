var puppeteer = require('puppeteer');
var fs = require('node:fs/promises');

const dashboard_url = 'https://developer.spotify.com/dashboard/3396197e1137496bb77ceaa11b0d4a50/users'
const spotify_username = process.env.SPOTIFY_USERNAME;
const spotify_password = process.env.SPOTIFY_PASSWORD;
const dusk_username = process.env.DUSK_USERNAME;
const dusk_password = process.env.DUSK_PASSWORD;

async function addSpotifyUser(){
    var browser = await puppeteer.launch({headless:false});
    var page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1024});
    

    //Load cookies
    var cookiesString = await fs.readFile('./cookies.json');
    var cookies = JSON.parse(cookiesString);
    await page.setCookie(...cookies); //... syntax spreads into individual cookies, instead of an array
    //Delete user on dashboard
    await page.goto(dashboard_url);
    try{
        await page.locator('.Button-sc-1dqy6lx-0').setTimeout(3000).click();
        await page.locator('#login-username').setTimeout(3000).fill(spotify_username);
        await page.locator('#login-password').setTimeout(3000).fill(spotify_password);
        await page.locator('.ButtonInner-sc-14ud5tc-0').setTimeout(3000).click();
        await page.waitForNavigation();
        await page.goto(dashboard_url);
    }catch{
    }
    try {
        await page.locator(`::-p-xpath(//tr[td[p[contains(text(), "${dusk_username}")]]]//button)`).setTimeout(3000).click();
        await page.locator('.Link-sc-1v366a6-0').setTimeout(3000).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch {

    }
    //Save cookies
    cookies = await page.cookies();
    await fs.writeFile('./cookies.json', JSON.stringify(cookies))
    

    //New session
    browser.close();
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1024});
    //Get cookies
    cookiesString = await fs.readFile('./dusk_cookies.json');
    cookies = JSON.parse(cookiesString);
    console.log(cookies)
    await page.setCookie(...cookies); 
    
    //Login to Dusk
    await page.goto("https://duskmusic.live/");
    await page.locator('.rounded-md').setTimeout(3000).click();
    try{
        await page.locator('#login-username').setTimeout(3000).fill(dusk_username);
        await page.locator('#login-password').setTimeout(3000).fill(dusk_password);
        await page.locator('.ButtonInner-sc-14ud5tc-0').setTimeout(3000).click();
    }catch{

    }
    //Save cookies
    cookies = await page.cookies();
    console.log(cookies)
    await fs.writeFile('./dusk_cookies.json', JSON.stringify(cookies))

    //Submit form
    await page.waitForNavigation();
    await page.reload();
    await page.waitForNavigation();
    await page.locator('.rounded-md').setTimeout(3000).fill(dusk_username);
    await page.locator('.rounded-md.mt-5').setTimeout(3000).click();
    await page.locator('a').setTimeout(60000).click();
    console.log("OK!")
  }
  addSpotifyUser() 