var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var prodcutCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var mainBtn = document.getElementById("mainBtn");
var productPriceError = document.getElementById("productPriceError");
var productCategoryError = document.getElementById("productCategoryError");
var productNameError = document.getElementById("productNameError");
var productContanier;

if (localStorage.getItem("productList") == null) {
    productContanier = [];
}
else {
    productContanier = JSON.parse(localStorage.getItem("productList"));
    displayProducts();
}

function addProduct() {
    if (validateProductCat() == true && validateProductPrice() == true && validateProductName() == true) {
        if (mainBtn.innerHTML == 'Add Product') {
            console.log('inside if');
            if (checkEmptyFields() == true) {
                var product = {
                    name: productName.value,
                    price: productPrice.value,
                    category: prodcutCategory.value,
                    desc: productDesc.value,
                };
                productContanier.push(product);
                localStorage.setItem("productList", JSON.stringify(productContanier));
                displayProducts();
                clearForm();
            }
            else {
                window.alert('Please enter values for all given fields');
            }
        }
        else if (mainBtn.innerHTML == 'Update') {
            updateProduct();
            clearForm();
        }
    }
    else if(validateProductCat()==false || validateProductName()==false || validateProductPrice()==false){
        window.alert("Please write the data in the correct in the right format in order to able to add or update a product")
  }
}

function clearForm() {
    productName.value = '';
    productPrice.value = '';
    prodcutCategory.value = '';
    productDesc.value = '';
    productName.classList.remove("is-valid");
    prodcutCategory.classList.remove("is-valid");
    productPrice.classList.remove("is-valid");
}
function displayProducts() {
    var container = '';
    for (var i = 0; i < productContanier.length; i++) {
        container += `
        <tr>
          <td>${i} </td>
          <td> ${productContanier[i].name} </td>
          <td>${productContanier[i].price} </td>
          <td>${productContanier[i].category} </td>
          <td>${productContanier[i].desc} </td>
          <td> <button onclick='upadteProductForm(${i});' class="btn btn-outline-warning">Update</button></td>
          <td> <button onclick='deleteProduct(${i});' class="btn btn-outline-danger">Delete</button></td>
        </tr>
        `
    }
    document.getElementById("tableBody").innerHTML = container;
}
function checkEmptyFields() {
    if (productName.value != '' && productPrice.value != ''
        && prodcutCategory.value != '' && productDesc.value != '') {
        return true;
    }
    else {
        return false;
    }
}
function deleteProduct(productIndex) {

    productContanier.splice(productIndex, 1);
    localStorage.setItem("productList", JSON.stringify(productContanier));
    displayProducts();

}
function searchProduct(searchWord) {
    var container = ``;

    for (var i = 0; i < productContanier.length; i++) {
        console.log("inside loop");
        if (productContanier[i].name.toLowerCase().includes(searchWord.toLowerCase()) == true) {
            container += `
            <tr>
              <td>${i} </td>
              <td> ${productContanier[i].name} </td>
              <td>${productContanier[i].price} </td>
              <td>${productContanier[i].category} </td>
              <td>${productContanier[i].desc} </td>
              <td> <button class="btn btn-outline-warning">Update</button></td>
              <td> <button onclick='deleteProduct(${i});' class="btn btn-outline-danger">Delete</button></td>
            </tr>
            `
        }
        else {
            console.log("Not Found");
        }
    }
    document.getElementById("tableBody").innerHTML = container;
}
var updateIndex;
function upadteProductForm(productIndex) {
    productName.value = productContanier[productIndex].name;
    productPrice.value = productContanier[productIndex].price;
    prodcutCategory.value = productContanier[productIndex].category;
    productDesc.value = productContanier[productIndex].desc;
    mainBtn.innerHTML = 'Update';
    updateIndex = productIndex;
}
function updateProduct() {
    console.log(updateIndex);
    productContanier[updateIndex].name = productName.value;
    productContanier[updateIndex].price = productPrice.value;
    productContanier[updateIndex].category = prodcutCategory.value;
    productContanier[updateIndex].desc = productDesc.value;
    localStorage.setItem("productList", JSON.stringify(productContanier));
    displayProducts();
    mainBtn.innerHTML = 'Add Product';
}
function validateProductName() {

    var regex = /^[A-Z][a-z]{3,10}$/;
    if (regex.test(productName.value) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        productNameError.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productNameError.classList.replace("d-none", "d-block");
        return false;
    }

}
function validateProductCat() {

    var regex = /^[A-Z][a-z]{3,10}$/;
    if (regex.test(prodcutCategory.value) == true) {
        prodcutCategory.classList.add("is-valid");
        prodcutCategory.classList.remove("is-invalid");
        productCategoryError.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        prodcutCategory.classList.add("is-invalid");
        prodcutCategory.classList.remove("is-valid");
        productCategoryError.classList.replace("d-none", "d-block");
        return false;
    }

}
function validateProductPrice() {
    var regex = /^([1-9][0-9][0-9][0-9]|10000)$/; // prices range from 1000 to 10000
    if (regex.test(productPrice.value) == true) {
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid");
        productPriceError.classList.replace("d-block", "d-none");
        return true;
    }
    else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productPriceError.classList.replace("d-none", "d-block");
        return false;
    }
}

productPrice.addEventListener("keyup", validateProductPrice);
prodcutCategory.addEventListener("keyup", validateProductCat);
productName.addEventListener("keyup", validateProductName);

// LocalStorage.setItem(key, value);
// LocalStorage stores limited data only ex. text.(related to specific browser)
// Array of objets is called JSON => JAVASCRIPT OBJECT NOTATION.
// var web="webdesign and development"; web.includes('and'); returns true;
