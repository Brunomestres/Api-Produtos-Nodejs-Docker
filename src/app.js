require('dotenv').config();
const express = require('express');
const productModel = require('./models/product');

const app = express();

app.use(express.json());

app.get('/product', async (req, res)=>{
  try {
    const products = await productModel.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/product', async (req,res) => {
  try {
    const { name, price, description } = req.body;
    await productModel.create(name, price, description);
    res.status(200).json({ message: 'Produto Criado'});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/product/:id', async (req,res)=>{
  try {
    const product = await productModel.findOne(req.params.id);
    if (product.length > 0 )
    {
      res.status(200).json(product);
    }else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/product/:id', async (req,res) => {
  try {
    const { name, price, description } = req.body;
    await productModel.update(name, price, description, req.params.id);

    res.status(200).json({ message: 'Produto atualizado com sucesso'});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.listen(process.env.NODE_DOCKER_PORT, () => {
  console.log(`runnning on port ${process.env.NODE_DOCKER_PORT}`);
});
