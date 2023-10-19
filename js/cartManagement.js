/**
 * 
 * Management of cart: Get,Save,Remove item in localStorage 
 * 
 */


/**
 * @function getCart
 * @function saveCart
 * 
 */

/**
 * 
 * Get the cart
 * 
 */

getCart = () => {
    let cart = localStorage.getItem("cart");

    if (cart == null) {
        return [];
    }
    else {
        return JSON.parse(cart);
    }
}

/*

getCartWithPrices = () => {
    let cartWithPrices = localStorage.getItem("cartWithPrices")

    if (cartWithPrices == null) {
        return [];
    }
    else {
        return JSON.parse(cartWithPrices);
    }
}*/

/**
 * 
 * Update cart with prices
 * 
 */

/**
 * 
 * Update cart with prices
 * 

saveCartwithPrice = (cartWithPrices) => {
    localStorage.setItem('cartWithPrices', JSON.stringify(cartWithPrices));
}


 

updateCartwithPrice= (id, color, q)=>{
    cartWithPrices=getCartWithPrices();


    let index=cartWithPrices.findIndex((prod=>(prod.id==id&&prod.color==color)));    
    if (index!=-1) {
        cartWithPrices[index].quantity=q;
        cartWithPrices[index].totalPrice=q*cartWithPrices[index].price
    }
    saveCartwithPrice(cartWithPrices);

}*/

/**
 * 
 * Update cart the new quantity 
 * 
 */

saveNewCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

/**
 * 
 * Remove article in the cart
 * 
 */

removeCartItem = (id, color) => {
    let cart = getCart();
    let nCart = cart.filter(item => item.id != id || item.color != color);
    saveNewCart(nCart);
}

/**
 * 
 * Update cart's item quantity 
 * 
 */

updateCartItem = (id, color, q) => {

    let cart = getCart();
    let index = cart.findIndex(obj => obj.id == id && obj.color == color);

    if (!(index == -1)) {
        cart[index].quantity = q;
    }

    saveNewCart(cart);
    loadCart();

}

/**
 * 
 * Calculate the total of the cart 
 * 
 */

getTotalPrice = (cartWithPrices) => {
    let totalCart = 0;

    if (cartWithPrices.length != 0) {
        totalCart = cartWithPrices.reduce((totalPrice,product) => totalPrice+product.quantity*product.price,0);
    }

    return totalCart;

}

/**
 * 
 * Calculate the number of articles in the cart 
 * 
 */


getTotalArticle = (cartWithPrices) => {
    let totalArticle = 0;

    if (cartWithPrices.length != 0) {
        //TODO: remove the reduce
        totalArticle = cartWithPrices.map(product => product.quantity).reduce((a, b) => Number(a) + Number(b))
    }

    return totalArticle;

}

