import puppeteer from 'puppeteer'
import 'dotenv/config'

async function Scrapping(busca) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(process.env.URL);

  await page.evaluate(() => document.getElementById("s").value = "cronicas saxonicas")

  await page.click('input[id="searchsubmit"]');
  await page.waitFor(1000);

  const result = await page.evaluate(() => {
    let books = []
  document.querySelectorAll('body > div > div > div > div > ul[class="products"]')
            .forEach(book => {
                  books = Object.values(book.getElementsByTagName('h3'))
              })
              const tittle = books.map(value => value.innerText) 
              return tittle
})

  await page.screenshot({path: 'teste3.png'})
  
  browser.close()
  return result
}
Scrapping().then((value) => {
  console.log(value)
})