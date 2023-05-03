// const Product = require("../models/Product");

const { getProductServices, createProductServices, updateProductService, bulkUpdateProductService, deleteProductService, bulkDeletePrductService } = require("../services/product.services");

exports.getProducts = async (req, res, next) => {
    try {
      // and
      // const products = await Product.find({_id: "644b93f40de6446a9ca2a180"});
      // or operation
      // const products = await Product.find({ $or: [{_id: "644b93f40de6446a9ca2a180"}, {name: "dfdfdf"}] });
      // not equal opearation
      // const products = await Product.find({ status: {$ne: "out-of-stock"} });
      // greater than operation
      // const products = await Product.find({  quantity: {$gt: 100} });
      // in operation
      // const products = await Product.find({ name : { $in:["chal", "dhal"]}});
      // projection with
      // const products = await Product.find({}, 'name quantity');
      // projection without
      // const products = await Product.find({}, '-name -quantity');
      // const products = await Product.find({}).limit(1);
      // const products = await Product.find({}).sort({quantity: -1});
    //   const products = await Product.find({}).select({name: 1});

    let filters = {...req.query};
    const exludeFields = ['sort', 'page', 'limit'];
    exludeFields.forEach(field => delete filters[field]);

    let filterString = JSON.stringify(filters);
    filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);
    filters = JSON.parse(filterString);
    console.log(filters)

    const queries = {};

    if(req.query.sort){
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ');
      queries.fields=fields;
      console.log(fields);
    }

    if(req.query.page){
      const {page=1, limit=10} = req.query;
      const skip = (page-1)*parseInt(limit);
      queries.skip = skip;
      queries.limit = parseInt(limit);
    }

    const products = await getProductServices(filters, queries);
  
    //   const products = await Product.where("name").equals("chal").where("quantity").gt(100);
  
      res.status(200).json({
          status: 'success',
          data: products, 
      })
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Data can not find",
        error: error.message,
      });
    }
  }
  

  exports.createProduct = async (req, res, next) => {
    try {
      // save or create
      // const product = new Product(req.body);
      // const result = await product.save();
      const result = await createProductServices(req.body);
      result.logger();
      res.status(200).json({
        status: "success",
        message: "Data inserted successfully!",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: "Data is not insrted",
        error: error.message,
      });
    }
  }

  exports.updateProduct = async(req, res, next) => {
    try {
      const { id } = req.params;
      const result = await updateProductService(id, req.body);

      res.status(200).json({
        status: 'success',
        message: 'Successfully updated the product'
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'product couldn\'t upadated',
        error: error.message
      })
    }
  }


  exports.bulkUpdateProduct = async(req, res, next) => {
    try {
      const result = await bulkUpdateProductService(req.body);

      res.status(200).json({
        status: 'success',
        message: 'Successfully updated the product'
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'product couldn\'t upadated',
        error: error.message
      })
    }
  }

  exports.deleteProduct = async(req, res, next) => {
    try {
      const {id} = req.params;
      const result = await deleteProductService(id);

      // if(!result.deletedCount){
      //   return res.status(400).json({
      //     status: 'fail',
      //     error: "Couldn't delete the product"
      //   })
      // }

      res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the product'
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'product couldn\'t deleted',
        error: error.message
      })
    }
  }

  exports.bulkDeleteProduct = async(req, res, next) => {
    try {
      const result = await bulkDeletePrductService(req.body.ids);

      res.status(200).json({
        status: 'success',
        message: 'Successfully deleted the selected product'
      })
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        message: 'product couldn\'t deleted',
        error: error.message
      })
    }
  }