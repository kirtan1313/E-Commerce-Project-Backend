const ProSchema = require('../models/modual.js')

const GetProdct = async (req, res) => {
    try {
        const ProductFind = await ProSchema.find();
        res.status(200).json(ProductFind)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const GetProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {}; 
    const products = await ProSchema.find(filter);
    res.status(200).json(products); 
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};


const PostProduct = async (req, res) => {

    try {
        const { productName, category, price, stock } = req.body;
        const img = req.file.path;
        if (!["Kids", "Men", "Women"].includes(category)) {
            return res.status(400).json({ error: "Invalid category" });
        }

        const CreateProduct = new ProSchema({ img, productName, category, price, stock });
        const saveProduct = await CreateProduct.save()
        res.status(200).json(saveProduct)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const ProductId = async (req, res) => {
    try {

        const { id } = req.params;
        const ProductId = await ProSchema.findById(id);
        res.status(200).json(ProductId)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const UpdateProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const { img, productName, category, price, stock } = req.body;

        const ProductUpdate = await ProSchema.findByIdAndUpdate({ _id: id }, { img, productName, category, price, stock }, { new: true })
        res.status(200).json(ProductUpdate);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const DeleteProduct = async (req, res) => {
    try {

        const { id } = req.params;
        const ProductDelete = await ProSchema.findByIdAndDelete(id)
        res.status(200).json(ProductDelete);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { GetProdct, GetProductsByCategory, PostProduct, ProductId, UpdateProduct, DeleteProduct }