const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()

const port = 3000
const catalog_path = path.resolve(__dirname, './data/showcase.json')
const cart_path = path.resolve(__dirname, './data/cart.json')
const static_dir = path.resolve(__dirname, '../dist/')

app.use(express.static(static_dir))
app.use(express.json())

// app.use((req, res, next) => {
//   res.append('Access-Control-Allow-Origin', ['*']);
//   res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.append('Access-Control-Allow-Headers', 'Content-Type');
//   next();
// })

app.get('/api/v1/showcase', (req, res) => {
  fs.readFile(catalog_path, 'utf-8', (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      res.status(500).send(err)
    }
  })
})

app.get('/api/v1/cart', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if(!err) {
      res.send(data);
    } else {
      res.status(500).send(err)
    }
  })
})

app.post('/api/v1/cart', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if(!err) {
      console.log(req.body)
      const cart = JSON.parse(data);
      cart.push(req.body);
      fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
        res.sendStatus(201)
      })
    } else {
      res.status(500).send(err)
    }
  })
})

app.delete('/api/v1/cart', (req, res) => {
  fs.readFile(cart_path, 'utf-8', (err, data) => {
    if(!err) {
      let cart = JSON.parse(data);
      const idx = cart.findIndex((good) => req.body.id === good.id);
      cart.splice(idx, 1);
      
      fs.writeFile(cart_path, JSON.stringify(cart), 'utf-8', (err, data) => {
        res.sendStatus(200)
      })
    } else {
      res.status(500).send(err);
    }
  })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

