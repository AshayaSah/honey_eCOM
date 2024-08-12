let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productName) {
  const quantity = document.getElementById("quantity")
    ? document.getElementById("quantity").value
    : 1;
  const type = document.getElementById("type")
    ? document.getElementById("type").value
    : "500g";

  const product = { name: productName, quantity: quantity, type: type };

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${productName} added to cart`);
}

function displayCart() {
  const cartItemsSection = document.querySelector(".cart-items");
  cartItemsSection.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
            <p>${item.name} - ${item.type} - ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItemsSection.appendChild(cartItem);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  alert("Proceeding to checkout");
}

if (document.querySelector(".cart-items")) {
  displayCart();
}
