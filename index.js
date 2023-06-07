var productNameInput = document.getElementById('productName');
var productPriceInput = document.getElementById('productPrice');
var productCategoryInput = document.getElementById('productCategory');
var productDescriptionInput = document.getElementById('productDescription');
var addBtn = document.getElementById("addBtn");
var searchInput = document.getElementById("searchInput");
var inputs= document.getElementsByClassName("form-control");
var currentIndex=0;
var products = [];

if( JSON.parse(localStorage.getItem("productsList"))!==null)
{
products = JSON.parse(localStorage.getItem("productsList"));
displayProduct();

}
addBtn.onclick = function() {

  if (!validateProductName()) {
    return; // Stop execution if validation fails
  }

  if(addBtn.innerHTML=="Add product"){ 
       //add product  mood
       
    addProduct();   
  }
  else {
    updateProduct() ; //edit product
  }
  
  displayProduct();
  cleardata();
}
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value
    
  };

  products.push(product);
  products.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('productsList',JSON.stringify(products));
}
function displayProduct() {
  var cartona = "";
  for (var i = 0; i < products.length; i++) {
    cartona +=
      `<tr> 
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>  
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn bg-warning">Delete</button></td>
        <td><button onclick="getProductInfo(${i})" class="btn btn bg-info">Update</button></td>
      </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}
function deleteProduct(i) {
  products.splice(i, 1);
  displayProduct();
  localStorage.setItem('productsList',JSON.stringify(products));
}
function cleardata()
{
  for (var i =0 ;i<inputs.length ;i++) {
    inputs[i].value="";
  }
}
searchInput.onkeyup=function(){
  var cartona = "";
  
  for (var i = 0; i < products.length; i++) {
    if(products[i].name.toLowerCase().includes(searchInput.value.toLowerCase()))
    {
      cartona +=
      `<tr> 
        <td>${products[i].name}</td>
        <td>${products[i].price}</td>  
        <td>${products[i].category}</td>
        <td>${products[i].description}</td>
        <td><button onclick="deleteProduct(${i})" class="btn btn bg-warning">Delete</button></td>
        <td><button class="btn btn bg-info">Update</button></td>
      </tr>`;
  
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;

} 
function serach(searchTxt){
  console.log(searchTxt)
}


function getProductInfo(index){
  currentIndex=index;
    var currentProduct=products[index];
  
     productNameInput.value=currentProduct.name;
     productPriceInput.value=currentProduct.price;
     productCategoryInput.value=currentProduct.category;
    productDescriptionInput.value=currentProduct.description;
    addBtn.innerHTML="update Product"
}
function updateProduct() {
  
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value 
    
  };
  products[currentIndex]=product;
  localStorage.setItem('productsList',JSON.stringify(products));
  addBtn.innerHTML="Add Product"

}


// function validateProductName() {
//   var productName = productNameInput.value.trim();
//   if (productName === "") {
//     alert("Product name is required");
//     return false;
//   }
//   return true;
// }

function validateProductName() {
  var productName = productNameInput.value.trim();
  if (productName === "") {
    alert("Product name is required");
    return false;
  }
  
  // Check if the product name already exists in the products array
  var existingProduct = products.find(function(product) {
    return product.name.toLowerCase() === productName.toLowerCase();
  });
  
  if (existingProduct) {
    alert("Product with the same name already exists");
    return false;
  }
  
  return true;
}
