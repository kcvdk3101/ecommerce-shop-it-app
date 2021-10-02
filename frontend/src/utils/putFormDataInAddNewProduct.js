export default function putFormDataInAddNewProduct(productInfo, images) {
  let formData = new FormData();
  formData.set("name", productInfo.name);
  formData.set("brand", productInfo.brand);
  formData.set("price", productInfo.price);
  formData.set("description", productInfo.description);
  formData.set("category", productInfo.category);
  formData.set("stock", productInfo.stock);
  formData.set("seller", productInfo.seller);

  images.forEach((image) => {
    formData.append("images", image);
  });

  return formData
}