document.addEventListener("DOMContentLoaded", function () {
    displayCartItems();
    updateCartCount(); // ✅ Ensure cart count updates

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("decrease-qty")) {
            let productId = event.target.getAttribute("data-id");
            decreaseQuantity(productId);
        }

        if (event.target.classList.contains("increase-qty")) {
            let productId = event.target.getAttribute("data-id");
            increaseQuantity(productId);
        }
    });

    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let cartContainer = document.getElementById("cart-items");
        let totalPriceElement = document.getElementById("total-price");
        let totalItemsElement = document.getElementById("total-items");
    
        // ✅ Check if the cart elements exist on this page
        if (!cartContainer || !totalPriceElement || !totalItemsElement) {
            console.warn("❌ Cart elements not found on this page! Skipping cart update.");
            return;
        }
    
        cartContainer.innerHTML = ""; // ✅ Clear previous cart display
        let totalItems = 0;
        let totalPrice = 0;
    
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty!</p>";
            totalPriceElement.textContent = "Rs. 0";
            totalItemsElement.textContent = "0";
            return;
        }
    
        cart.forEach(item => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p><strong>${item.name}</strong></p>
                    <p>Price: Rs. ${item.price}</p>
                    <div class="quantity-controls">
                        <button class="decrease-qty" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="increase-qty" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
            cartContainer.appendChild(cartItem);
            totalItems += item.quantity;
            totalPrice += item.price * item.quantity;
        });
    
        totalPriceElement.textContent = `Rs. ${totalPrice}`;
        totalItemsElement.textContent = totalItems;
    }
    
    

    function decreaseQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let product = cart.find(item => item.id === productId);

        if (product) {
            if (product.quantity > 1) {
                product.quantity -= 1; // ✅ Reduce quantity by 1
            } else {
                cart = cart.filter(item => item.id !== productId); // ✅ Remove item if quantity is 1
            }
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }

    function increaseQuantity(productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let product = cart.find(item => item.id === productId);

        if (product) {
            product.quantity += 1; // ✅ Increase quantity by 1
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
        updateCartCount();
    }

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        let cartCountElement = document.getElementById("cart-count");

        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }
});
