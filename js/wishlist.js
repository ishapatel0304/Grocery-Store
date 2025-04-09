document.addEventListener("DOMContentLoaded", function () {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    updateWishlistCount();
    updateHeartIcons(); // ✅ Ensure hearts are updated on page load

    document.body.addEventListener("click", function (event) {
        let target = event.target;

        if (target.classList.contains("like-btn") || target.closest(".like-btn")) {
            let button = target.closest(".like-btn");

            let productId = button.getAttribute("data-id");
            let productName = button.getAttribute("data-name");
            let productPrice = button.getAttribute("data-price");
            let productImage = button.getAttribute("data-image");

            toggleWishlist({ id: productId, name: productName, price: productPrice, image: productImage }, button);
        }
    });

    function toggleWishlist(product, button) {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        let index = wishlist.findIndex(item => item.id === product.id);

        if (index === -1) {
            wishlist.push(product);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            button.innerHTML = `<i class="fas fa-heart"></i>`; // ❤️ Filled heart
            button.style.color = "red"; // ✅ Make heart red
            alert("Added to Wishlist! ❤️");
        } else {
            wishlist.splice(index, 1);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            button.innerHTML = `<i class="far fa-heart"></i>`; // 🤍 Empty heart
            button.style.color = "gray"; // ✅ Make heart gray
            alert("Removed from Wishlist!");
        }

        updateWishlistCount();
    }

    function updateWishlistCount() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        
        let wishlistCountElement = document.getElementById("wishlist-count");
        let wishlistLinkCount = document.querySelector(".like span"); // ✅ Also update in header
    
        if (wishlistCountElement) {
            wishlistCountElement.textContent = wishlist.length;
        }
    
        if (wishlistLinkCount) {
            wishlistLinkCount.textContent = wishlist.length;
        }
    
        if (!wishlistCountElement && !wishlistLinkCount) {
            console.error("❌ Wishlist count element not found on this page!");
        }
    }
    

    function updateHeartIcons() {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        document.querySelectorAll(".like-btn").forEach(button => {
            let productId = button.getAttribute("data-id");

            if (wishlist.some(item => item.id === productId)) {
                button.innerHTML = `<i class="fas fa-heart"></i>`; // ❤️ Filled heart
                button.style.color = "red"; // ✅ Make heart red
            } else {
                button.innerHTML = `<i class="far fa-heart"></i>`; // 🤍 Empty heart
                button.style.color = "gray"; // ✅ Make heart gray
            }
        });
    }
});
