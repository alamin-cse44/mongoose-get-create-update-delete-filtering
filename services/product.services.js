const Product = require("../models/Product");

exports.getProductServices = async (filters, queries) => {
  // const products = await Product.find({}).sort(queries.sortBy).select(queries.fields);
  
  const products = await Product.find(filters)
  .skip(queries.skip)
  .limit(queries.limit)
  .sort(queries.sortBy)
  .select(queries.fields);

  const totalProducts = await Product.countDocuments(filters);
  const pageCount = await Math.ceil(totalProducts/queries.limit);

  return {totalProducts,pageCount,products};
};

exports.createProductServices = async (data) => {
  const result = await Product.create(data);
  return result;
};

exports.updateProductService = async (productId, data) => {
  // const result = await Product.updateOne({ _id: productId }, {$set: data}, {runValidators: true});

  const product = await Product.findById(productId);
  const result = await product.set(data).save();
  return result;
};

exports.bulkUpdateProductService = async (data) => {
  //   const result = await Product.updateMany({ _id: data.ids }, data.data, {
  //     runValidators: true,
  //   });

  const products = [];

  data.ids.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);

  return result;
};

exports.deleteProductService = async (id) => {
  const result = await Product.deleteOne({ _id: id });

  return result;
};

exports.bulkDeletePrductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });

  return result;
};
