let cartWithPrices = [];
cart = getCart();


let loadCart = async () => {

    cart = getCart();

    const cartWithPriceP = cart.map(async (product) => {

        const apiProduct = await fetch('http://localhost:3000/api/products/' + product.id)
            .then((response) => { return response.json() });

        return {
            ...product,
            price: apiProduct.price
        }
    })

    await Promise.all(cartWithPriceP).then(function (results) {
        cartWithPrices = results;
    })

    displayCart(cartWithPrices);
    setTotalPriceAndQuantity();

}

/*let submitOrder = () => {

}*/

let displayCart = (cart) => {

    const items = document.querySelector('#cart__items');
    items.innerHTML="";


    cart.forEach(item => {
        items.insertAdjacentHTML('beforeend',
                `
            <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
       
            <div class="cart__item__img">
            
               <img src="${item.imageUrl}" alt="${item.altTxt}">
                                    
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                    <h2>${item.name}</h2>
                    <p>${item.color}</p>
                    <p>${item.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity" id="quantity${item.id + item.color}">
                        <p>Qté :  </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id="${item.id + item.color}" value="${item.quantity}" data-id="${item.id}" data-color="${item.color}" onchange="updateQauntityItem(dataset.id, dataset.color,this.value)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" data-id="${item.id}" data-color="${item.color}" onclick="deletItem(dataset.id, dataset.color)">Supprimer</p>
                    </div>
                    </div>
                </div>
            </article>`
            );
    });

}

let deletItem = (id, color) => {
    removeCartItem(id, color);
    loadCart();
}

/**
 * 
 * Set the total price the quantity
 * 
 */

let updateQauntityItem = (id, color, quantity) => {

    let q = document.getElementById(`${id + color}`).value;

    if (q <= 0 || q > 100) {

        document.querySelector("#quantity" + id + color).insertAdjacentHTML("beforebegin", alertColorInvalid("Veuillez choisir une valeur comprise entre 1 et 100"));
        setTimeout(() => removealert(), 3000);
        return 0;
    }
    updateCartItem(id, color, quantity);
    setTotalPriceAndQuantity();

}

/**
 * 
 * Set the total price the quantity
 * 
 */

let setTotalPriceAndQuantity = () => {

    document
        .querySelector('#totalPrice')
        .innerHTML = getTotalPrice(cartWithPrices);

    document
        .querySelector('#totalQuantity')
        .innerHTML = getTotalArticle(cartWithPrices);

}
loadCart();

/**
 * 
 * Send Order
 * 
 */

let sendOrder = () => {

    let nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/; // Used to validate a person name!

    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g; // Validate email

    let firstName = document.querySelector("#firstName").value;
    let lastName = document.querySelector("#lastName").value;
    let address = document.querySelector("#address").value;
    let city = document.querySelector("#city").value;
    let email = document.querySelector("#email").value;

    let products = getCart().map((product) => { return product.id });

    if (!products.length > 0) {
        document.querySelector('#cart__items').insertAdjacentHTML("beforebegin", alertColorInvalid("Votre cart est vide"));
        setTimeout(() => removealert(), 3000)
        return 0;
    }

    if (nameRegex.test(firstName)) {

        document.getElementById('firstNameErrorMsg').innerText = ""

    } else {
        document.getElementById('firstNameErrorMsg').innerText = "prénom invalide";
        return 0;
    }

    if (!(nameRegex.test(lastName))) {
        document.getElementById('lastNameErrorMsg').innerText = "Nom invalide";
        return 0;
    }
    else {
        document.getElementById('lastNameErrorMsg').innerText = "";
    }
    if (!address.length > 0) {
        document.getElementById('addressErrorMsg').innerText = "le champ adresse ne doit pas être null";
        return 0;
    }
    else {
        document.getElementById('addressErrorMsg').innerText = "";
    }
    if (!city.length > 0) {
        document.getElementById('cityErrorMsg').innerText = "le champ ville ne doit pas être vide "
        return 0;
    }
    else {
        document.getElementById('cityErrorMsg').innerText = ""
    }
    if (!email.match(emailRegex)) {
        document.getElementById('emailErrorMsg').innerText = "adresse email invalide"
        return 0;
    }
    else {
        document.getElementById('emailErrorMsg').innerText = ""

    }

    let data = {
        "contact": { lastName, firstName, address, city, email },
        products
    };

    document.querySelector(".msg").innerHTML = loader();

    fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();

        })

        .then((orderDetail) => {
            localStorage.removeItem('cart');
            window.location.replace("../confirmation/confirmation.html?orderId=" + orderDetail.orderId);

        })
        .catch(error => {
            document.querySelector('.msg').insertAdjacentHTML("beforeend", `<p id="submitErrorMsg"> "Une erreur s'est produite, réessayez plus tard" </p>`)
        })
        .finally(() => {

            document
                .querySelector('#loader')
                .remove();
        });

}

document.querySelector('#order').addEventListener('click', (event) => {
    event.preventDefault();// stop form submission
    sendOrder();
});

