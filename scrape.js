const axios = require("axios");
const cheerio = require("cheerio");

const url = "https://outfitters.com.pk/collections/men-sale-2020";
const table = "div[class='product-collection products-grid row']";
const row = "div[class*='grid-item']";
const productinfo = "div[class='inner-top'] div[class='product-bottom']";

async function parse(url, table, row, productinfo) {
  const response = await axios(url);

  try {
    const html = response.data;
    const $ = cheerio.load(html);

    let productsList = [];

    $(table).each((i, ele) => {
      let products = $(ele)
        .find(row)
        .each((i, ele) => {
          let product = $(ele).find(productinfo);

          let image = product.find("a").attr("href");

          let oldPrice = product
            .find("span[class='old-price']  span[class='money']")
            .text();

          let NewPrice = product
            .find("span[class='special-price'] > span[class='money']")
            .text();

          productsList.push({
            image,
            oldPrice,
            NewPrice,
          });
        });
    });
    return productsList;
  } catch (error) {
    console.log(error);
  }
}

module.exports.parse = parse;
