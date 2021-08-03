const express = require('express');
const pretty = require('pretty')
const cheerio = require('cheerio');
const download = require('node-image-downloader');
const request = require('request');
const PORT = process.env.PORT || 4040

const app = express()

app.get('/', (req, res) => {
	const url = 'https://www.propertypro.ng/property-for-sale/in/abuja'

    request(url, (error, response, html) => {
        if(!error) {
            const $ = cheerio.load(html)
            
            const imgSrc = $('.result-img img')

            imgSrc.each((idx, el) => {
                const img = $(el).attr('src')
                  console.log(img.length)
              download({
                imgs: [
                    {
                        uri: img
                    }
                ],
                dest: './img'
            })
            .then((info) => {
                console.log("Download complete!")
                res.send("Image Downloaded")
                // process.exit(1)
            })
            .catch((err) => console.error(err))
            })
          
        }
    })
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})

