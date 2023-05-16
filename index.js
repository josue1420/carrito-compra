//variable de la visibilidad del carro
var carritoVisible = false;


if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

function ready(){
    //funcionalidad de los botones
    var botonesEliminarItem = document.getElementsByClassName('btn-eliminar');
    for(var i=0; i < botonesEliminarItem.length;i++){
        var button = botonesEliminarItem[i];
        button.addEventListener('click', eliminarItemCarrito);
    }

    //agrego funcionalidad sumar cantidad 
    var botonesSumarCantidad = document.getElementsByClassName('sumar-cantidad');
    for(var i=0; i < botonesSumarCantidad.length;i++){
        var button = botonesSumarCantidad[i];
        button.addEventListener('click', sumarCantidad);
    }

        //agrego funcionalidad restar cantidad 
        var botonesRestarCantidad = document.getElementsByClassName('restar-cantidad');
        for(var i=0; i < botonesRestarCantidad.length;i++){
            var button = botonesRestarCantidad[i];
            button.addEventListener('click', restarCantidad);
        }

        //agrego funcionalidad al carrito
        var botonesAgregarAlCarrito = document.getElementsByClassName('boton-item');
        for(var i=0; i < botonesAgregarAlCarrito.length;i++){
            var button = botonesAgregarAlCarrito[i];
            button.addEventListener('click', agregarAlCarritoClicked);
        }

        //agregar funcionalidad al boton pagar
        document.getElementsByClassName('btn-pagar')[0].addEventListener('click', pagarClicked)
}

//eliminar item seleccionar carrito
function eliminarItemCarrito(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();

   actualizarTotalCarrito();
   //controlador de elemento una vez eliminada
   ocultarCarrito();
}


//ctualizar total carrito
function actualizarTotalCarrito(){
    //contenedor del carrito
    var carritoContenedor = document.getElementsByClassName('carrito')[0];
    var carritoItems = carritoContenedor.getElementsByClassName('carrito-item');
    var total = 0;

    //recorrer elemento del carrito
    for(var i=0; i < carritoItems.length;i++){
        var item = carritoItems[i];
        var precioElemento = item.getElementsByClassName('carrito-item-precio')[0];
        console.log(precioElemento);
        //quitamos el signo peso y el de milesimo
        var precio = parseFloat(precioElemento.innerText.replace('$','').replace('.',''));
        console.log(precio);
        var cantidadItem = item.getElementsByClassName('carrito-item-cantidad')[0];
        var cantidad = cantidadItem.value;
        console.log(cantidad);
        total = total + (precio * cantidad);
    }
    total= Math.round(total*100)/100;
    document.getElementsByClassName('carrito-precio-total')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}
function ocultarCarrito(){
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    if(carritoItems.childElementCount==0){
        var carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        //maximizar el contador
        var items = document.getElementsByClassName('contenedor-items')[0];
        items.style.width = '100%';
    }
}

//aumento de a uno los elementos
function sumarCantidad(event){
    var buttonClicked = event.target;
    var selector= buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual++;
    selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
    //actualizamos el precio
    actualizarTotalCarrito();
}

function restarCantidad(event){
    var buttonClicked = event.target;
    var selector= buttonClicked.parentElement;
    var cantidadActual = selector.getElementsByClassName('carrito-item-cantidad')[0].value;
    console.log(cantidadActual);
    cantidadActual--;
    //controlamos que no sean menos
    if(cantidadActual>=1){
        selector.getElementsByClassName('carrito-item-cantidad')[0].value = cantidadActual;
        //actualizamos el precio
        actualizarTotalCarrito();
    }
  
}

function agregarAlCarritoClicked(event){
    var button = event.target;
    var item = button.parentElement;
    var titulo = item.getElementsByClassName('titulo-item')[0].innerText;
    console.log(titulo);
    var precio = item.getElementsByClassName('precio-item')[0].innerText;
    var imagenSrc = item.getElementsByClassName('img-item')[0].src;
    console.log(imagenSrc);

    //la siguiente funcion para agregar al carrito
    agregarItemAlCarrito(titulo, precio, imagenSrc);
    //hacer visible carrito una ves 
    hacerVisibleCarrito();
}

function agregarItemAlCarrito(titulo, precio, imagenSrc){
    var item = document.createElement('div');
    item.classList.add = 'item';
    var itemsCarrito = document.getElementsByClassName('carrito-items')[0];

    //items ingresado esto lo vera
    var nombresItemsCarrito = itemsCarrito.getElementsByClassName('carrito-item-titulo');
    for(var i=0; i < nombresItemsCarrito.length; i++){
        if(nombresItemsCarrito[i].innerText==titulo){
            alert("el item ya se encuentra en el carrito");
            return;
        }
    }

    var itemCarritoContenido = `    <div class="carrito-item">
    <img src="${imagenSrc}" alt="" width="80px">
    <div class="carrito-item-detalles">
        <span class="carrito-item-titulo">${titulo}</span>
        <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-cantidad"></i>
            <input type="text" value="2" class="carrito-item-cantidad" disabled>
            <i class="fa solid fa-plus sumar-cantidad"></i>
        </div>
        <span class="carrito-item-precio">${precio}</span>
    </div>
    <span class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
    </span>
    </div>`

    
    item.innerHTML = itemCarritoContenido;
    itemsCarrito.append(item);  

   //agregamos funcionalidad al eliminar 
   item.getElementsByClassName('btn-eliminar')[0].addEventListener('click',eliminarItemCarrito);

   //agregar funcionalidad al sumar
   var botonSumarCantidad = item.getElementsByClassName('sumar-cantidad')[0];
   botonSumarCantidad.addEventListener('click', sumarCantidad);

      //agregar funcionalidad al restar
      var botonRestarCantidad = item.getElementsByClassName('restar-cantidad')[0];
      botonRestarCantidad.addEventListener('click', restarCantidad);

}

function pagarClicked(event){
    alert("Gracias por su Compra");

    //elimino los elementos del carrito
    var carritoItems = document.getElementsByClassName('carrito-items')[0];
    while(carritoItems.hasChildNodes()){
    carritoItems.removeChild(carritoItems.firstChild);
    }
    actualizarTotalCarrito();
    // funcion ocultar carrito
    ocultarCarrito();
}

function hacerVisibleCarrito(){
    carritoVisible = true;
    var carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    var items = document.getElementsByClassName('contenedor-items')[0];
    items.style.width = '60%';
}