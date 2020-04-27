const puppeteer = require('puppeteer')
require('dotenv/config')

require('../database/db')(process.env.MONGO_URL)

async function getDados(page) {
  const result = await page.evaluate(() => {
    let books = []
    document.querySelectorAll('body > div > div > div > div > ul[class="products"]')
      .forEach(book => {
        books = Object.values(book.getElementsByTagName('h3'))
      })

    const tittle = books.map(value => value.innerText)
    return tittle
  })
  return result
}

async function nextPage(page) {
  const url = await page.evaluate(() => {
    const value = {}
    document.querySelectorAll('body > div[id="page"] > div[id="primary"] > div > div[id="content"] > div[class="wp-pagenavi"] > a[class="nextpostslink"]')
      .forEach(next => {
        value.url = next.getAttribute('href')
        console.log(value.url)
      })
    return value.url
  })
  return url
}

async function Scrapping(link = '') {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = link || process.env.URL
  await page.goto(url);

  const result = await slaveScrap(page)
  const haveNextPage = await nextPage(page)

  if (haveNextPage) {
    return Scrapping(haveNextPage)
  }


  browser.close()
  return result
}

module.exports = { Scrapping }