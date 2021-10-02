export default function putFormDataInUpdateProduct(name, brand, price, description, category, stock, seller, images) {
  let formData = new FormData();
  formData.set("name", name);
  formData.set("brand", brand);
  formData.set("price", price);
  formData.set("description", description);
  formData.set("category", category);
  formData.set("stock", stock);
  formData.set("seller", seller);

  images.forEach((image) => {
    formData.append("images", image);
  });

  return formData
}