document.addEventListener("DOMContentLoaded", function () {
    updateCartCount(); // ✅ Ensure cart count updates when any page loads

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("add-to-cart")) {
            const button = event.target;
            const productId = button.getAttribute("data-id");
            const productName = button.getAttribute("data-name");
            const productPrice = parseFloat(button.getAttribute("data-price"));
            const productImage = button.getAttribute("data-image");

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            let existingItem = cart.find(item => item.id === productId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1,
                    image: productImage
                });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount(); // ✅ Update cart count across all pages
            alert(`${productName} added to cart!`);
        }
    });

    function updateCartCount() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        let cartCountElement = document.getElementById("cart-count");

        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    }
});
