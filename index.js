// This loading will be displaye while the data are downloading

document.querySelector("#items").innerHTML = loader();
let baseUrl = "https://kanap-api-7e691b121bb9.herokuapp.com/api/products/";

/**
 *
 * loading getting data from back-end
 *
 */

fetch(baseUrl)
  .then((response) => {
    return response.json();
  })
  .then((products) => {
    products.forEach((product) => {
      document.querySelector("#items").insertAdjacentHTML(
        "afterbegin",
        `<a href="./html/product/product.html?id=${product._id}">
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
      .querySelector("#items")
      .insertAdjacentHTML("afterbegin", alertDanger());
  })
  .finally(() => {
    document.querySelector("#loader").remove();
  });
