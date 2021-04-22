const nameInput = document.querySelector(".name");
const descriptionInput = document.querySelector(".description");
const priceInput = document.querySelector(".price");
const addButton = document.querySelector(".add-btn");
const listOfProducts = document.querySelector(".items-list");
const cartContent = document.querySelector(".cart-content");
const totalAmount = document.querySelector(".total-amount");

let products;
let cart;

!localStorage.products
  ? (products = [])
  : (products = JSON.parse(localStorage.getItem("products")));

!localStorage.cart
  ? (cart = [])
  : (cart = JSON.parse(localStorage.getItem("cart")));

function Product(name, description, price, count) {
  (this.name = name),
    (this.description = description),
    (this.price = price),
    (this.count = count);
  this.inStock = false;
}

const createListElement = (item, index) => {
  return `
    <li class="list-element">
        <div class="name">${item.name}</div>
        <div class="description">${item.description}</div>
        <div class="price">${item.price}</div>
        <div class="list-buttons">          
            <button onclick="deleteProduct(${index})" class="btn-delete">X</button>
            <button onclick="addToCart(${index})" class="btn-buy">Buy</button>            
        </div>
    </li>
    `;
};

const updateHtmlList = () => {
  listOfProducts.innerHTML = "";
  if (products.length > 0) {
    products.forEach((item, index) => {
      listOfProducts.innerHTML += createListElement(item, index);
    });
  }
};

updateHtmlList();

const updateHtmlCart = () => {
  cartContent.innerHTML = "";
  cart.forEach((product) => {
      cartContent.innerHTML += `<div>${product.count} X ${product.name}</div></br>`;
  });
};
updateHtmlCart();

const updateLocalstorage = () => {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("cart", JSON.stringify(cart));
};

addButton.addEventListener("click", (event) => {
  event.preventDefault();
  if (
    nameInput.value.length > 0 &&
    descriptionInput.value.length > 0 &&
    priceInput.value.length > 0
  ) {
    products.push(
      new Product(nameInput.value, descriptionInput.value, priceInput.value, 1)
    );
  } else {
    alert("Please enter valid info");
  }

  updateLocalstorage();
  updateHtmlList();

  nameInput.value = "";
  descriptionInput.value = "";
  priceInput.value = "";

});

const deleteProduct = (index) => {
  
  let deletedItem = products.splice(index, 1);
  console.log(deletedItem[0]);

  updateLocalstorage();
  updateHtmlList();
  deleteItemFromCart(deletedItem);
  updateHtmlCart();
  // totalPrice();
};

const deleteItemFromCart = (deletedItem) => {
  for (const i in cart) {
    if (cart[i].name === deletedItem[0].name) {
      cart.splice(i, 1);
      updateLocalstorage();
      console.log(cart);
    }
  }
  totalPrice();
};

const addToCart = (index) => {
  const addedProduct = products.slice(index, index + 1);
  const addedToCart = { ...addedProduct[0] };
  for (const i in cart) {
    if (cart[i].name === addedProduct[0].name) {
      cart[i].count += 1;
      updateLocalstorage();
      console.log(cart[i].count);
      return;
    }
  }

  cart.push(addedToCart);

  updateLocalstorage();
  updateHtmlCart();
  totalPrice();
};

const totalPrice = () => {
    let totalCart = 0;

    totalAmount.innerHTML = `<div>Total price: ${totalCart}</div>`;
    cart.forEach(product => {
        totalCart += product.price * product.count;
        totalAmount.innerHTML = `<div>Total price: ${totalCart}</div>`
    })
};

totalPrice();