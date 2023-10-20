// This loading will be displaye while the data are downloading

document.querySelector('#items').innerHTML = loader();


/**
 * 
 * loading getting data from back-end
 * 
 */

fetch('http://localhost:3000/api/products')
    .then((response) => {

        return response.json();
    })
    .then((products) => {
        products.forEach(product => {

            document
                .querySelector('#items')
                .insertAdjacentHTML("afterbegin",
                    `<a href="../product/product.html?id=${product._id}">
                        <article>
                            <img src="${product.imageUrl}" alt="${product.altTxt}">
                            <h3 class="productName">${product.name}</h3>
                            <p class="productDescription">${product.description}</p>
                        </article>
                    </a>`
                );

        });
    })
    .catch((e) => {

        document
            .querySelector('#items')
            .insertAdjacentHTML('afterbegin', alertDanger());
    })
    .finally(() => {

        document
            .querySelector('#loader')
            .remove();
    });






