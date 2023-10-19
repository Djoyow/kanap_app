
let params = new URLSearchParams(document.location.search);
let prod = [];


fetch('http://localhost:3000/api/products/' + params.get('id'))
    .then((response) => { return response.json() })
    .then((product) => {

        document
            .querySelector('.item__img')
            .insertAdjacentHTML('beforeend',
                `<img src="${product.imageUrl}" alt="${product.altTxt}">`
            );

        document
            .querySelector('#title')
            .insertAdjacentText('beforeend', `${product.name}`);

        document
            .querySelector('#price')
            .insertAdjacentText('beforeend', `${product.price}`);

        document
            .querySelector('#description')
            .insertAdjacentText('beforeend', `${product.description}`);

        product.colors.forEach(color => {
            let option = document
                .createElement("option");

            option.text = color;

            document
                .querySelector('#colors')
                .add(option);
        });

        prod.push({ id: params.get('id'), name: product.name, color: null, quantity: Number(0), imageUrl: product.imageUrl, altTxt: product.altTxt });
    })
    .catch(e => { console.log("erreur: ", e); });

/**
 * 
 * Add product to Cart
 * 
 */


let addProductToCart = () => {

    let color = document.getElementById('colors').value;
    let quantity = Number(document.querySelector('#quantity').value);

    if (color.length === 0) {

        document.querySelector('#colors').insertAdjacentHTML("beforebegin", alertColorInvalid("Veuillez choisir une couleur"));
        setTimeout(() => removealert(), 3000)
        return 0;

    }

    if (quantity <= 0 || quantity > 100) {

        document.querySelector('#quantity').insertAdjacentHTML("beforebegin", alertColorInvalid("Veuillez choisir une valeur comprise entre 1 et 100"));
        setTimeout(() => removealert(), 3000)
        return 0;

    }
    prod[0].quantity =quantity;
    prod[0].color =color;

    // faire test ici

    cart = getCart();

    // If cart emputy just set cart
    if (cart.length == 0) {

        cart.push(prod[0]);

    } else { // If cart is not emputy, check if this item is already in the basket

        target = cart.findIndex((obj => (obj.id == prod[0].id) && (prod[0].color == obj.color)));

        if (!(target == -1)) { // if yes update quantity

            cart[target].quantity = prod[0].quantity + Number(cart[target].quantity);

        } else { // If no push the item

            cart.push(prod[0]);

        }
    }
    saveNewCart(cart);
    setAlertProductAdd();


}

document
    .querySelector('#addToCart')
    .addEventListener('click', addProductToCart);
