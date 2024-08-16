var puppeteer = require('puppeteer');

const dashboard_url = 'https://developer.spotify.com/dashboard/3396197e1137496bb77ceaa11b0d4a50/users'
const spotify_username = process.env.SPOTIFY_USERNAME;
const spotify_password = process.env.SPOTIFY_PASSWORD;
const dusk_username = process.env.DUSK_USERNAME;
const dusk_password = process.env.DUSK_PASSWORD;

async function addSpotifyUser(){
    var browser = await puppeteer.launch({headless:false});
    var page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1024});
    
    //Delete user on dashboard
    await page.goto(dashboard_url);
    await page.locator('.Button-sc-1dqy6lx-0').setTimeout(3000).click();
    await page.locator('#login-username').setTimeout(3000).fill(spotify_username);
    await page.locator('#login-password').setTimeout(3000).fill(spotify_password);
    await page.locator('.ButtonInner-sc-14ud5tc-0').setTimeout(3000).click();
    await page.waitForNavigation();
    await page.goto(dashboard_url);

    
    try {
        await page.locator(`::-p-xpath(//tr[td[p[contains(text(), "${dusk_username}")]]]//button)`).setTimeout(3000).click();
        await page.locator('.Link-sc-1v366a6-0').setTimeout(3000).click();
        await new Promise(resolve => setTimeout(resolve, 3000));
    } catch {

    }
    
    //Login to Dusk
    
    browser.close();
    browser = await puppeteer.launch({headless:false});
    page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1024});
    await page.goto("https://duskmusic.live/");
    await page.locator('.rounded-md').setTimeout(3000).click();
    await page.locator('#login-username').setTimeout(3000).fill(dusk_username);
    await page.locator('#login-password').setTimeout(3000).fill(dusk_password);
    await page.locator('.ButtonInner-sc-14ud5tc-0').setTimeout(3000).click();
   
    //Submit form
    await page.waitForNavigation();
    await page.reload();
    await page.waitForNavigation();
    await page.locator('.rounded-md').setTimeout(3000).fill(dusk_username);
    await page.locator('.rounded-md.mt-5').setTimeout(3000).click();
    await page.locator('a').setTimeout(60000).click();
  }
  addSpotifyUser() 