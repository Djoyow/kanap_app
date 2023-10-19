let params = new URLSearchParams(document.location.search);

document.querySelector("#orderId").insertAdjacentText("afterbegin",params.get('orderId'))