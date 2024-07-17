// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    const addToCartButtons = document.querySelectorAll('.btn');
    let listProductHTML = document.querySelector('.addCarts');
    let listCartHTML = document.querySelector('.addCart'); // Ensure this is correctly selected
    let carts = [];

    // Function to add cart items to HTML
    const addCartToHTML = () => {
        if (!listCartHTML) return; // Check if listCartHTML is null or undefined
        listCartHTML.innerHTML = '';
        if (carts.length > 0) {
            carts.forEach(cart => {
                let newCart = document.createElement('div');
                newCart.classList.add('product');
                newCart.innerHTML = `
                    <img src="images/kebab.jpeg" alt="product1">
                    <h2>Chicken Kebab</h2>
                    <div class="arrow">
                        <p>Amount:  </p>
                        <i class="uil uil-angle-left"></i><p class="num">${cart.quantity}</p>
                        <i class="uil uil-angle-right"></i>
                    </div>
                    <p>Price: GH₵ 8</p>
                    <div class="button">
                        <button class="btns">Remove From Cart</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
            });
        }
    };

    // Function to add items to cart
    const addtoCart = (dataId) => {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == dataId);
        if (carts.length <= 0) {
            carts = [{
                product_id: dataId,
                quantity: 1
            }];
        } else if (positionThisProductInCart < 0) {
            carts.push({
                product_id: dataId,
                quantity: 1
            });
        } else {
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        }
        console.log(carts);
        addCartToHTML();
    };

    // Ensure addToCartButtons function is not changed
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let positionClick = event.target;
            if (positionClick.classList.contains('btn')) {
                // Find the closest parent element with the class 'product'
                const productElement = positionClick.closest('.product');
                // Get the data-id attribute value
                const dataId = productElement.getAttribute('data-id');

                // Call the addtoCart function with the data-id
                addtoCart(dataId);
            }
        });
    });

});




 // Function to add cart items to HTML
 const addCartToHTML = () => {
    // Retrieve carts array from localStorage
    let carts = JSON.parse(localStorage.getItem('cartItems')) || [];


    if (!listCartHTML) return; // Check if listCartHTML is null or undefined
    listCartHTML.innerHTML = '';
    if (carts.length > 0) {
        carts.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('product');
            newCart.innerHTML = `
                <img src="images/kebab.jpeg" alt="product1">
                <h2>Chicken Kebab</h2>
                <div class="arrow">
                    <p>Amount:  </p>
                    <i class="uil uil-angle-left"></i><p class="num">${cart.quantity}</p>
                    <i class="uil uil-angle-right"></i>
                </div>
                <p>Price: GH₵ 8</p>
                <div class="button">
                    <button class="btns">Remove From Cart</button>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }
};

// Function to add items to cart
const addtoCart = (dataId) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == dataId);
    if (carts.length <= 0) {
        carts = [{
            product_id: dataId,
            quantity: 1
        }];
    } else if (positionThisProductInCart < 0) {
        carts.push({
            product_id: dataId,
            quantity: 1
        });
    } else {
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }

    // Store carts array in localStorage
    localStorage.setItem('cartItems', JSON.stringify(carts));
    console.log(carts);
    addCartToHTML();
};

// Ensure addToCartButtons function is not changed
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        let positionClick = event.target;
        if (positionClick.classList.contains('btn')) {
            // Find the closest parent element with the class 'product'
            const productElement = positionClick.closest('.product');
            // Get the data-id attribute value
            const dataId = productElement.getAttribute('data-id');

            // Call the addtoCart function with the data-id
            addtoCart(dataId);
        }
    });
});










const addCartToHTML = () => {
    if (!listCartHTML) return;
    listCartHTML.innerHTML = '';
    if (carts.length > 0) {
        carts.forEach(cart => {
            let newCart = document.createElement('div');
            newCart.classList.add('product');
            newCart.innerHTML = `
                <img src="images/kebab.jpeg" alt="product1">
                <h2>Chicken Kebab</h2>
                <div class="arrow">
                    <p>Amount:  </p>
                    <i class="uil uil-angle-left"></i><p class="num">${cart.quantity}</p>
                    <i class="uil uil-angle-right"></i>
                </div>
                <p>Price: GH₵ 8</p>
                <div class="button">
                    <button class="btns">Remove From Cart</button>
                </div>`;
            listCartHTML.appendChild(newCart);
        });
    }
};





<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="homepage.css">
    <link rel="stylesheet" href="oursales.css">
    <link rel="stylesheet" href="cart.css">
    <!-- font awesome icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <!-- iconscout icons -->
    <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">

    <!-- google font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton+SC&family=Ga+Maamli&family=Playwrite+DE+Grund:wght@100..400&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
</head>
<body>
    <header class="">
        <div class="nav">
            <div class="nav1">
                <div class="set">
                    <a href=""><i class="uil uil-bars"></i></a>
                    <a href=""><i class="uil uil-location-point"></i></a>
                </div>

                <div class="set">
                    <a href=""><h1 class="logo">dp1 CAS project</h1></a>
                </div>

                <div class="set">
                    <a href=""><i class="uil uil-user"></i></a>
                    <i class="uil uil-search" id="searchIcon"></i>
                    <a href="cart.html" class="cart-icon">
                        <i class="uil uil-shopping-cart-alt"></i>
                        <span class="cart-number">5</span>
                    </a>
                </div>
            </div>
            <div class="navlinks">
                <ul>
                    <li class="navlink"><a href="homepage.html">Home</a></li>
                    <li class="navlink"><a href="oursales.html">Our Sales</a></li>
                    <li class="navlink"><a href="aboutpage.html">About</a></li>
                    <li class="navlink"><a href="">Contact</a></li>
                    <li class="navlink"><a href="" id="log">Signout</a></li>
                </ul>
            </div>
        </div>

        <div class="search-container" id="searchContainer">
            <input type="text" id="searchInput" placeholder="Search...">
        </div>
    </header>

    <div class="cartpage">
        <h1 class="product_h1">Your Cart</h1>
        <div class="items" id="productContainer">
            <div class="mainItem tagline">
                <!-- <h1 class="">Items Added To Cart</h1> -->
                <div class="addCarts">

                    <!-- <div >
                        <img src="images/kebab.jpeg" alt="product1">
                        <h2>Chicken Kebab</h2>
                        <div class="arrow">
                            <p>Amount:  </p>
                            <i class="uil uil-angle-left"></i><p class="num">2</p>
                            <i class="uil uil-angle-right"></i>
                        </div>
                        <p>Price: GH₵ 8</p>
                        <div class="button">
                            <button class="btns">Remove From Cart</button>
                        </div>
                    </div> -->
                    <!-- <div class="product">
                        <img src="images/skebab.jpeg" alt="product1">
                        <h2>Sausage Kebab</h2>
                        <div class="arrow">
                            <p>Amount: </p>
                            <i class="uil uil-angle-left"></i><p class="num">2</p>
                            <i class="uil uil-angle-right"></i>
                        </div>
                        <p>Price: GH₵ 8</p>
                        <div class="button">
                            <button class="btns">Remove From Cart</button>
                        </div>
                    </div> -->
                </div>        
            </div>
        </div> 
    </div>

    <div class="check">
        <p class="total">Total: $<span class="totalmoney">100</span></p>
        <button class="button">Check Out</button>
    </div>

    <footer class="">
        <h3>Contact</h3>
        <div class="contact">
            <a href=""><i class="uil uil-facebook-f"></i></a>
            <a href=""><i class="uil uil-twitter"></i></a>
            <a href=""><i class="uil uil-instagram"></i></a>
            <a href=""><i class="uil uil-telegram"></i></a>
            <i class="uil uil-phone"> +234 816935207</i>
        </div>
    </footer>

    <script type="module">
        let userCreds = JSON.parse(localStorage.getItem("user-creds"))
        let userInfo = JSON.parse(localStorage.getItem("user-info"))

        let MsgHead = document.querySelector("#msg")
        let GreetHead = document.querySelector("#greet")
        let SignoutBtn = document.querySelector("#log")


        let Signout = ()=>{
            localStorage.removeItem("user-creds")
            localStorage.removeItem("user-info")
            window.location.href = "./account/login.html"
        }

        let Checkcred = ()=>{
            if (!localStorage.getItem("user-creds"))
                window.location.href = "./account/login.html"
            else{
                MsgHead.innerHTML = `user with email "${userCreds.email}" logged in`
                GreetHead.innerHTML = `welcome ${userInfo.firstName} ${userInfo.lastName}!`
            }
        }

        window.addEventListener("load", Checkcred);
        SignoutBtn.addEventListener("click", Signout);
    </script>

    <script src="cart.js"></script>
</body>
</html>


document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchIcon = document.getElementById('searchIcon');
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.getElementById('searchContainer');
    const productContainer = document.getElementById('productContainer');
    const allProducts = Array.from(productContainer.querySelectorAll('.product'));
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results-container');
    productContainer.parentNode.insertBefore(searchResultsContainer, productContainer);

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
        searchResultsContainer.innerHTML = '';
        const filteredProducts = allProducts.filter(product => {
            const productName = product.querySelector('h2').textContent.toLowerCase();
            return productName.includes(query);
        });
        if (filteredProducts.length > 0) {
            filteredProducts.forEach(product => {
                searchResultsContainer.appendChild(product.cloneNode(true));
            });
        } else {
            searchResultsContainer.innerHTML = '<p>No results found</p>';
        }
        productContainer.style.display = 'none';
        searchResultsContainer.style.display = 'grid';
    }

    function clearSearchResults() {
        searchResultsContainer.innerHTML = '';
        productContainer.style.display = 'block';
        searchResultsContainer.style.display = 'none';
    }

    // Cart Functionality
    const cartIcon = document.querySelector('.cart-icon');
    const cartContainer = document.getElementById('cartContainer');
    const closeCartButton = document.getElementById('closeCart');
    const addToCartButtons = document.querySelectorAll('.btn');
    let listCartHTML = document.querySelector('.cart-container');
    let carts = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartIcon.addEventListener('click', () => {
        cartContainer.style.display = cartContainer.style.display === 'none' || cartContainer.style.display === '' ? 'block' : 'none';
    });

    closeCartButton.addEventListener('click', () => {
        cartContainer.style.display = 'none';
    });

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            let positionClick = event.target;
            if (positionClick.classList.contains('btn')) {
                const productElement = positionClick.closest('.product');
                const dataId = productElement.getAttribute('data-id');
                addToCart(dataId);
            }
        });
    });

    const addToCart = (dataId) => {
        let positionThisProductInCart = carts.findIndex((value) => value.product_id == dataId);
        if (carts.length <= 0) {
            carts = [{
                product_id: dataId,
                quantity: 1
            }];
        } else if (positionThisProductInCart < 0) {
            carts.push({
                product_id: dataId,
                quantity: 1
            });
        } else {
            carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
        }
        localStorage.setItem('cartItems', JSON.stringify(carts));
        console.log(carts);
        addCartToHTML();
    };

    const addCartToHTML = () => {
        if (!listCartHTML) return;
        listCartHTML.innerHTML = '';
    
        if (carts.length > 0) {
            carts.forEach(cart => {
                // Create elements for each cart item
                let newCart = document.createElement('div');
                newCart.classList.add('cartproduct');
                newCart.innerHTML = `
                    <img src="images/kebab.jpeg" alt="product1">
                    <h2>Chicken Kebab</h2>
                    <div class="arrow">
                        <p>Amount: </p>
                        <i class="uil uil-angle-left"></i><p class="num">${cart.quantity}</p>
                        <i class="uil uil-angle-right"></i>
                    </div>
                    <p>Price: GH₵ 8</p>
                    <div class="button">
                        <button class="btns">Remove From Cart</button>
                    </div>`;
                listCartHTML.appendChild(newCart);
            });
        }
    };
    

    addCartToHTML();
});
