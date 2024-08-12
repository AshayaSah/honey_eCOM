let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", function () {
  if (document.querySelector(".cart-items")) {
    displayCart();
  }

  // Add event listener to quantity inputs if they exist
  document.querySelectorAll(".cart-quantity").forEach(function (input) {
    input.addEventListener("input", function () {
      updateCart();
    });
  });
});

function addToCart(productName) {
  const quantity = document.getElementById("quantity")
    ? document.getElementById("quantity").value
    : 1;
  const type = document.getElementById("type")
    ? document.getElementById("type").value
    : "500g";

  const product = {
    name: productName,
    quantity: quantity,
    type: type,
    price: 15.99,
  }; // Example price

  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert(`${productName} added to cart`);
}

function displayCart() {
  const cartItemsSection = document.querySelector(".cart-items");
  cartItemsSection.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
            <div class="cart-image">
                <img src="honey1.jpg" alt="${item.name}">
            </div>
            <div class="cart-details">
                <h3>${item.name}</h3>
                <p class="price" data-price="${
                  item.price
                }">$${item.price.toFixed(2)}</p>
                <label for="cart-quantity-${index}">Quantity:</label>
                <input type="number" id="cart-quantity-${index}" class="cart-quantity" value="${
      item.quantity
    }" min="1">
                <p class="subtotal">Subtotal: $${(
                  item.price * item.quantity
                ).toFixed(2)}</p>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
    cartItemsSection.appendChild(cartItem);
  });

  updateCart(); // Update cart summary
}

function updateCart() {
  let total = 0;

  document.querySelectorAll(".cart-item").forEach(function (item) {
    const priceElement = item.querySelector(".price");
    const price = parseFloat(priceElement.getAttribute("data-price"));
    const quantityInput = item.querySelector(".cart-quantity");
    const quantity = parseInt(quantityInput.value);
    const subtotal = price * quantity;

    item.querySelector(
      ".subtotal"
    ).textContent = `Subtotal: $${subtotal.toFixed(2)}`;

    total += subtotal;
  });

  document.querySelector(
    ".cart-summary h3"
  ).textContent = `Total: $${total.toFixed(2)}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function proceedToCheckout() {
  // Redirect to the checkout page (assuming you have a checkout.html page)
  window.location.href = "checkout.html";
}
