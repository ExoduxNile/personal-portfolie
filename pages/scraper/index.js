import React, { useEffect } from 'react';
const chromium = require('@sparticuz/chromium-min');
const puppeteer = require('puppeteer-core');

let _page;

async function getBrowser() {
  // local development is broken for this 👇
  // but it works in vercel so I'm not gonna touch it
  return puppeteer.launch({
    args: [...chromium.args, '--hide-scrollbars', '--disable-web-security'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(
      `https://github.com/Sparticuz/chromium/releases/download/v116.0.0/chromium-v116.0.0-pack.tar`
    ),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}


async function getPage() {
  if (_page) return _page;

  const browser = await getBrowser();
  _page = await browser.newPage();
  return _page;
}

function checkUrl(string) {
  var url = '';
  try {
    url = new URL(string);
  } catch (error) {
    return false;
  }
  return true;
}


const Maps = () => {
  useEffect(() => {
    const getMapsData = async () => {
      const browser = await puppeteer.launch({
        headless: false,
        args: ['--disabled-setuid-sandbox', '--no-sandbox'],
      });
      const [page] = await browser.pages();
      await page.setExtraHTTPHeaders({
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_10) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4882.194 Safari/537.36',
      });

      await page.goto('https://www.google.com/maps/search/Starbucks/@26.8484046,75.7215344,12z/data=!3m1!4b1', {
        waitUntil: 'domcontentloaded',
        timeout: 60000,
      });

      await page.waitForTimeout(5000);

      let data = await scrollPage(page, '.m6QErb[aria-label]', 2);

      console.log(data);

      await browser.close();
    };

    getMapsData();
  }, []);

  const extractItems = async (page) => {
    let maps_data = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('.Nv2PK')).map((el) => {
        const link = el.querySelector('a.hfpxzc').getAttribute('href');
        return {
          title: el.querySelector('.qBF1Pd')?.textContent.trim(),
          avg_rating: el.querySelector('.MW4etd')?.textContent.trim(),
          reviews: el.querySelector('.UY7F9')?.textContent.replace('(', '').replace(')', '').trim(),
          address: el.querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:last-child')?.textContent.replaceAll('·', '').trim(),
          description: el.querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(2)')?.textContent.replace('·', '').trim(),
          website: el.querySelector('a.lcr4fd')?.getAttribute('href'),
          category: el.querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(1) > span:first-child')?.textContent.replaceAll('·', '').trim(),
          timings: el.querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:first-child')?.textContent.replaceAll('·', '').trim(),
          phone_num: el.querySelector('.W4Efsd:last-child > .W4Efsd:nth-of-type(3) > span:last-child')?.textContent.replaceAll('·', '').trim(),
          extra_services: el.querySelector('.qty3Ue')?.textContent.replaceAll('·', '').replaceAll('  ', ' ').trim(),
          latitude: link.split('!8m2!3d')[1].split('!4d')[0],
          longitude: link.split('!4d')[1].split('!16s')[0],
          link,
          dataId: link.split('1s')[1].split('!8m')[0],
        };
      });
    });
    return maps_data;
  };

  const scrollPage = async (page, scrollContainer, itemTargetCount) => {
    let items = [];
    let previousHeight = await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight`);
    while (itemTargetCount > items.length) {
      items = await extractItems(page);
      await page.evaluate(`document.querySelector("${scrollContainer}").scrollTo(0, document.querySelector("${scrollContainer}").scrollHeight)`);
      await page.evaluate(`document.querySelector("${scrollContainer}").scrollHeight > ${previousHeight}`);
      await page.waitForTimeout(2000);
    }
    return items;
  };

  return (
    <div>
      <h1>Google Maps Data</h1>
      {mapsData.map(item => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <h2>{item.avg_rating}</h2>
          <h2>{item.reviews}</h2>
          <h2>{item.address}</h2>
          <h2>{item.description}</h2>
          <h2>{item.website}</h2>
          <h2>{item.category}</h2>
        </div>
      ))}
    </div>
  );
};

export default Maps;
