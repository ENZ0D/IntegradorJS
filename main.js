/* HECHA CORRECCIONES Y ALGUNOS CAMBIOS RESPECTO AL ORIGINAL */ 
/* POR ESO ESTA HECHO EN UN REPO DESDE 0 (para más comodidad) */
/* TODO FUE REORGANIZADO RESPECTO AL ANTERIOR, AGREGANDO Y ELIMINANDO COSAS */
/* PRINCIPAL CAMBIO: USO VARIABLES EN ESPAÑOL (NO RECOMENDADO) PERO ESTA VEZ SE ME HIZO MÁS FÁCIL DE ESA MANERA */
/* TODO EL CÓDIGO DE AQUÍ SALE DE LO APRENDIDO EN EL MÓDULO DE JS Y DOCUMENTACIÓN DEL CAMPUS */
/* TAMBIÉN BUSQUÉ INFORMACIÓN Y DOCUMENTACIÓN DE INTERNET */
/* REVISAR RENDERIZADO, SIGUE SIN FUNCIONAR Y NO ENCUENTRO EL MOTIVO */

/*
===============================================================================
                         MENÚ HAMBURGUESA 
===============================================================================
*/

const nav = document.getElementById ("NavBar");
const abrir = document.getElementById ("abrir");
const cerrar = document.getElementById ("cerrar");

abrir.addEventListener("click", () => {
    nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
    nav.classList.remove("visible");
})

/*
===============================================================================
                         CONTENEDOR DE LAS CATEGORIAS 
===============================================================================
*/

const categoriesContainer = document.querySelector(".categorias");

/*
===============================================================================
                         BOTÓN VER MÁS 
===============================================================================
*/

const btnVerMas = document.querySelector(".btnVerMas");

/*
===============================================================================
                         CONTENEDOR DE PRODUCTOS
===============================================================================
*/

const productosContainer = document.querySelector(".productososContainer");

/*
===============================================================================
                      TODO LO RELACIONADO AL CARRO DE COMPRAS
===============================================================================
*/

const carritoBtn = document.querySelector(".cartIcon"); 

const cartProductos = document.querySelector(".cart");

const cartBurbuja = document.querySelector(".cartIndicadorBurbuja");

const total = document.querySelector(".total");

const btnComprar = document.querySelector(".btn-comprar"); 

const btnDelete = document.querySelector(".btn-delete"); 

const productosCart = document.querySelector(".cart-container");

const MostrarCarrito = () => {
    cartProductos.classList.toggle("abrirCarrito");
};

const createProductoTemplate =  (productoCart) =>{
    const {id, title, price, img, quantity} = productoCart; 
    
     return `
         <div class="cart-item">
             <img src="${img}" alt="${title}">
             <div class="item-info">
                 <h3 class="item-title">${title}</h3>
                 <p class="item-precio"> ${price} $</p>
             </div>
             <div class="item-handler">
             <span class="quantity-handler menos" data-id="${id}">-</span>
             <span class="item-quantity">${quantity}</span>
             <span class="quantity-handler mas" data-id="${id}">+</span>
            </div>
         </div>    
     `
 }
 
 const renderizadoCart = () => {
    if (!cart.length){
        productosCart.innerHTML = `<p class="emptyCart"> Para iniciar la compra debes agregar algún producto al carrito!.</p>`;
        return;
    }

    productosCart.innerHTML = cart.map(createProductooTemplate).join("");
}

const valorDelCarrito = () => {
    return cart.reduce( (total, producto) => total + Number(lproducto.precio)  * producto.quantity, 0); 
}

const mostrarTotal = () => {
    total.innerHTML = `${getTotalCart().toFixed(2)} $`;  
}

const sumarBurbuja = () => { 
    cartBurbuja.textContent = cart.reduce( (acc, cur) => acc + cur.quantity, 0);
}

const quitarBtn = (btn) => {
    if(!cart.length){
        btn.classList.add("deshabilitar"); 
    }else{
        btn.classList.remove("deshabilitar"); 
    }
}

const updateCartState = () => {
    saveCart();
    renderCart();
    mostrarTotal();
    sumarBurbuja();
    quitarBtn (btnDelete);
    quitarBtn (btnComprar);
}

const agregarProductos = (e) =>{
    if (!e.target.classList.contains("btnComprarProducto")) return; 
    const producto = e.target.dataset;   
    
    if (existeProductoo(producto.id)) {  
          agregarProductoAlCarro(producto);
      }else {
          crearProductoEnCarrito(producto);
      }
      
      updateCartState();
}

const agregarProductoAlCarro = (producto) => {
    cart = cart.map((productoCart) =>
        productoCart.id === producto.id
            ? { ...productoCart, quantity: productoCart.quantity + 1 }
            : productoCart
    );
    
    renderCart();
    mostrarTotal();
    sumarBurbuja();
}

const existeProductoo = (productoId) => {
    return cart.find ((producto) => producto.id === productoId);
}

const crearProductoEnCarrito = (producto) =>{
    cart = [...cart, {...producto, quantity: 1}]; 
}

const handleMasBtn = (id) => {
    const productoExistente = cart.find((producto) => producto.id === id);
    if (productoExistente) {
        agregarProductoAlCarro(productoExistente);
    }
}

const handlemenosBtn = (id) => {
    const productoExistente = cart.find((producto) => producto.id === id);

    if (productoExistente.quantity === 1){
        if(window.confirm("¿Desea eliminar el producto?")){
            eliminarProductoDelCarrito(productoExistente);
        }
        return;  
    }
    restarProducto(productoExistente);
}

const restarProducto  = (productoExistente) =>{
    cart = cart.map ((producto) =>{
        return producto.id === productoExistente.id 
        ? {...producto, quantity: producto.quantity - 1}
        : producto
    })
}

const eliminarProductoDelCarrito = (productoExistente) =>{
    cart = cart.filter((producto) => producto.id !== productoExistente.id);
    
    updateCartState();
}

const handleQuantity = (e) =>{
    if(e.target.classList.contains("MÁS")){
        handleMasBtn(e.target.dataset.id);
    }else if (e.target.classList.contains("MENOS")){
        handlemenosBtn(e.target.dataset.id);
    }
   
    updateCartState();
}

const carritoReseteado = () => {
    cart = [];
    updateCartState();
}

const completeCartAction = (confirmarMensaje, successMensaje) =>{
    if(!cart.length) return
    if(window.confirm(confirmarMensaje)){
        resetCarritoLibros(); 
        alert(successMensaje);
    }
}

const completarCompra = () =>{
    completeCartAction ("¿Deseas finalizar la compra?", "Muchas gracias por haber confiado en nosotros!");
    
}

const vaciarCarrito = () =>{
    completeCartAction ("¿Vaciar el carrito?", "Tu carrito ya está vacío.");
}

/*
===============================================================================
                         LOCAL STORAGE [LS] 
===============================================================================
*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCart = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
}

/*
===============================================================================
                    RENDERIZADOS DE LOS PRODUCTOS
===============================================================================
*/

const productoTemplate = (producto) => {

    return `
            <div class="item">
                <img src="${image}" alt="${title}" />
                
                <div class="info">
                    <h3 class="itemTitle"> ${title} /h3>
                    <p class="itemDescription> ${description} </p>
                    <p class="itemPrice"> $ ${price} </p>
                </div>

            </div>
    `
}

const renderProductos = (listado) => {
    productosContainer.innerHTML += listado.map(createProductTemplate).join("");
}

/*
===============================================================================
                         FILTROS 
===============================================================================
*/

const cambiarBtnEstadoActivo = (selectedCategory) => {
    const categories = [...categoriesList];
    

    categories.forEach((categoryBtn) => {
        if(categoryBtn.dataset.category !== selectedCategory){
            categoryBtn.classList.remove("btnActive");
            return
        }
        categoryBtn.classList.add("btnActive"); 
    })
}

const cambiarFiltroActivo = (btn) => {
    AppState.activeFilter = btn.dataset.category;
    cambiarBtnEstadoActivo(AppState.activeFilter);
    setShowMoreVisibility(AppState.activeFilter);
}

const renderFiltroProductos = () => {
    const filteredProductoss = objectData.filter(
        (producto) => producto.category === AppState.activeFilter
    );
    renderProductos(filteredProductoss);
}

const aplicacionFiltros = ({target}) => { 
    if(!isInactiveFilterBtn(target)) return;
    cambiarFiltroActivo(target);
    productosContainer.innerHTML = "";  
    if(AppState.activeFilter){
        renderFiltroProductos()
        AppState.currentProductosIndex = 0;
        return;
    }
    renderProductos(AppState.productos[0]);
    
}

/*
===============================================================================
                    FORMULARIOS Y VALIDACIONES
===============================================================================
*/

const registerForm = document.querySelector("#contacto-form");
const nameInput = document.querySelector("#name"); 
const emailInput = document.querySelector("#email"); 
const messageInput = document.querySelector("#mensaje"); 

let users = [];

const validation = (input) => {
    const valid = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return valid.test(input.value.trim());
}

const inputVacio = (input) =>{
    return !input.value.trim().length;
}

const  between = (input, min, max) =>{
    return input.value.length >= min && input.value.length <= max;
}

const errorInput = (input, mensaje) =>{
    const formField = input.parentElement;
    formField.classList.remove("success");
    formField.classList.add("error");
    const error = formField.querySelector("small");
    error.style.display = "block";
    error.textContent = mensaje;
};

const correctInput = (input) => {
    const formField = input.parentElement;
    formField.classList.remove("error");
    formField.classList.add("success");
    const error = formField.querySelector("small");
    error.textContent = "";
}

const checkEmail = (input) =>{
    let valid = false;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    if(!validateEmail(input)){
        showErrorInput(input, "- MAIL INVALIDO -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const checkInput = (input) =>{
    // código a revisar
    let valid = false;
    const MIN_CHARACTERS = 3;
    const MAX_CHARACTERS = 30;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    if(!isBetween(input, MIN_CHARACTERS, MAX_CHARACTERS)){
        showErrorInput(input, "- NOMBRE INVALIDO (MIN 3 - MAX 30) -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const checkMessage = (input) =>{
    let valid = false;
    if(isEmptyInput(input)){
        showErrorInput(input, "- CAMPO OBLIGATORIO -");
        return;
    }
    ShowSuccessInput(input);
    valid = true;
    return valid;
}

const formValidation = (e) =>{
    e.preventDefault();
    let nameValid = checkInput(nameInput);
    let emailValid = checkEmail(emailInput);
    let messageValid = checkMessage(messageInput);
    let isValidForm = nameValid && emailValid && messageValid;
    if(isValidForm){
        users.push({
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
        })
        alert("Gracias por contactarte con nosotros. Pronto nos comunicaremos con usted!");
    }
}

/*
===============================================================================
                             INNIT
===============================================================================
*/

const init = () => {

    renderProductos(AppState.producto [0]);
    categoriesContainer.addEventListener("click", aplicacionFiltros);
    carritoBtn.addEventListener("click", MostrarCarrito);

    btnComprar.addEventListener("click", completarCompra);
    btnDelete.addEventListener("click", vaciarCarrito);
    quitarBtn (btnDelete); 
    quitarBtn (btnComprar);
    sumarBurbuja(cart);

    registerForm.addEventListener("submit", formValidation);
    nameInput.addEventListener("input",() => checkInput(nameInput));
    emailInput.addEventListener("input",() => checkEmail(emailInput));
    messageInput.addEventListener("input",() => checkMessage(messageInput));
};

init();
