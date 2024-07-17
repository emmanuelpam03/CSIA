document.addEventListener('DOMContentLoaded', () => {
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const productContainer = document.getElementById('productContainer');
    const allProducts = Array.from(productContainer.querySelectorAll('.product'));
    const cartIcon = document.querySelector('.cart-icon');
    const cartContainer = document.getElementById('cartContainer');
    const closeCartButton = document.getElementById('closeCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const addToCartButtons = document.querySelectorAll('.btn');
    const cartNumber = document.querySelector('.cart-number');

    let carts = JSON.parse(localStorage.getItem('cartItems')) || [];

    searchIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        searchContainer.classList.toggle('visible');
        if (searchContainer.classList.contains('visible')) {
            searchInput.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!searchContainer.contains(event.target) && event.target !== searchIcon) {
            searchContainer.classList.remove('visible');
        }
    });

    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();
        if (query.length > 0) {
            performSearch(query);
        } else {
            clearSearchResults();
        }
    });

    function performSearch(query) {
        const filteredProducts = allProducts.filter(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            return productName.includes(query);
        });
        if (filteredProducts.length > 0) {
            productContainer.innerHTML = '';
            filteredProducts.forEach(product => {
                productContainer.appendChild(product.cloneNode(true));
            });
        } else {
            productContainer.innerHTML = '<p>No results found</p>';
        }
    }

    function clearSearchResults() {
        productContainer.innerHTML = '';
        allProducts.forEach(product => {
            productContainer.appendChild(product);
        });
    }

    cartIcon.addEventListener('click', () => {
        cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
        displayCartItems(); // Update the cart display whenever the cart is opened
    });

    closeCartButton.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const dataId = productElement.getAttribute('data-id');
            addToCart(dataId, productElement);
            updateCartNumber();
            displayCartItems(); // Update the cart display after adding an item
        });
    });

    const addToCart = (dataId, productElement) => {
        const productName = productElement.querySelector('h2').textContent;
        const productPrice = parseFloat(productElement.querySelector('p').textContent.split(': ')[1].substring(3));
        const productImage = productElement.querySelector('img').src;

        let cartItem = carts.find(item => item.product_id === dataId);

        if (cartItem) {
            cartItem.quantity += 1;
        } else {
            cartItem = {
                product_id: dataId,
                name: productName,
                price: productPrice,
                image: productImage,
                quantity: 1
            };
            carts.push(cartItem);
        }

        localStorage.setItem('cartItems', JSON.stringify(carts));
    };

    const displayCartItems = () => {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';

        if (carts.length > 0) {
            carts.forEach(cart => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('product');
                cartItem.setAttribute('data-id', cart.product_id);
                cartItem.innerHTML = `
                    <img src="${cart.image}" alt="${cart.name}">
                    <h3>${cart.name}</h3>
                    <div class="arrow">
                        <p>Amount: </p>
                        <i class="uil uil-angle-left" data-action="decrease"></i><p class="num">${cart.quantity}</p>
                        <i class="uil uil-angle-right" data-action="increase"></i>
                    </div>
                    <p>Price: GH₵ ${cart.price * cart.quantity}</p>
                    <div class="button">
                        <button class="btns" data-action="remove">Remove item</button>
                    </div>`;
                cartItemsContainer.appendChild(cartItem);
            });

            cartItemsContainer.querySelectorAll('.uil-angle-left').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productElement = event.target.closest('.product');
                    const dataId = productElement.getAttribute('data-id');
                    adjustQuantity(dataId, -1);
                });
            });

            cartItemsContainer.querySelectorAll('.uil-angle-right').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productElement = event.target.closest('.product');
                    const dataId = productElement.getAttribute('data-id');
                    adjustQuantity(dataId, 1);
                });
            });

            cartItemsContainer.querySelectorAll('.btns').forEach(button => {
                button.addEventListener('click', (event) => {
                    const productElement = event.target.closest('.product');
                    const dataId = productElement.getAttribute('data-id');
                    removeFromCart(dataId);
                });
            });
        }
    };

    const adjustQuantity = (dataId, amount) => {
        const cartItem = carts.find(item => item.product_id === dataId);
        if (cartItem) {
            cartItem.quantity += amount;
            if (cartItem.quantity <= 0) {
                removeFromCart(dataId);
            } else {
                localStorage.setItem('cartItems', JSON.stringify(carts));
                updateCartNumber();
                displayCartItems();
            }
        }
    };

    const removeFromCart = (dataId) => {
        carts = carts.filter(item => item.product_id !== dataId);
        localStorage.setItem('cartItems', JSON.stringify(carts));
        updateCartNumber();
        displayCartItems();
    };

    const updateCartNumber = () => {
        const totalItems = carts.reduce((total, item) => total + item.quantity, 0);
        cartNumber.textContent = totalItems;
    };

    displayCartItems(); // Display cart items on page load
    updateCartNumber(); // Update cart number on page load
});
