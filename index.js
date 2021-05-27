// User Name: nxbUser,
// password: nxbUser123
// Database Name: nxbRestaurantDb


const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
app.use(express.json());
const mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://nxbUser:nxbUser123@nodejscluster.wz9q9.mongodb.net/nxbRestaurantDb?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// //Get the default connection
var db = mongoose.connection;

db.on("error", () => {
  console.log("Db is Not Connected");
});

db.on("open", () => {
  console.log("Db is  Connected");
});



// Schema and Model of Collection
const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
})
const Product = mongoose.model("Product", productSchema);

// Get All products

app.get("/product", async (req, res) => {
    try {
      const product = await Product.find({});
      console.log(product);
      res.status(201).send(product)
    } catch (err) {
      res.status(400).send('Error to find products : ' + err.message);
    }
})

//Adding New Product
app.post("/product", async (req, res) => {
    const product = new Product(req.body);
    try {
      await product.save();
      res.status(201).send('product added successfully');
    } catch (error) {
      res.status(400).send('Error in adding new product : ' + error.message);
    }
})

//Delete Product
app.delete("/product/:id", async (req, res) => {
    try {
      const _id = req.params.id;
      const product = await Product.findByIdAndDelete(_id);
      if (!product) {
        return res.status(400).send("Bad Request");
      } else {
        return res.status(201).send(product);
      }
    } catch (error) {
      res.status(400).send('Error to find product : ' + error.message);
    }
})







app.get('/', (req, res) => {
    res.send("Wolcome to Node Js Server");
})



app.listen(port, (req, res) => {
    console.log(`Server is listening at the port -> ${port}`);
})