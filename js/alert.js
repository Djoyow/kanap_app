 /**
 * 
 * This loading will be displaye while the data are downloading
 * 
 */
let loader =()=>{

let loader='<div id="loader"></div>';

return loader;


}

let alertDanger = ()=>{
  let alert= `<div class="alert alert-danger">
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>Une erreur s'est produite, réessayez plus tard</p>
</div>`;
return alert;
}

let alertSuccess = (msg)=>{
  let alert= `<div class="alert alert-success">
  <i class="fa-solid fa-circle-check"></i>
  <p>${msg}</p>
</div>`;
return alert;
}

let alertColorInvalid =(msg)=>{
  let alert= `<div class="alert alert-danger">
  <i class="fa-solid fa-triangle-exclamation"></i>
  <p>${msg}</p>
</div>`;
return alert;

}

let removealert = () => {

    alert = document.querySelector(".alert");
    alert.parentElement.removeChild(alert);

}


/*Move me in Cart file*/
let setAlertProductAdd = () => {
    
  document
      .querySelector('.item__content__addButton')
      .insertAdjacentHTML("beforebegin", alertSuccess("Votre produit a bien été ajouté au panier."));

  setTimeout(() => removealert(), 3000)
}

let setAlertProductUpdated = (id) => {
  
  document
      .getElementById('quantity'+id)
      .insertAdjacentHTML("beforebegin", alertSuccess(" Votre produit a bien été madifié."));

  setTimeout(() => removealert(), 3000)
}
