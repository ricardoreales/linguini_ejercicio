// FILTRAR ELEMENTOS POR NOMBRE O PRECIO

// en este ejercicio ya debemos tener previamente creado un JSOM con nuestros productos de manera local y a ese Jason lo llamamos a travez de un fetch

// APLICANDO UN FETCH

// creamos un array vacio que va a ser igual a la data
let productos = []
// creamos otro array que es el array que vamos a utilizar para aplcarle las modificaciones como el filter. el foreach. etc este array se usa para no sobre escribir la data.
let productosGaleria = []

fetch("./productos.json")
    .then((res) => res.json())
    .then((data) => {
        productos = data
        productosGaleria = productos
        ordenarProductos()
    })


// CREANDO UNA FUNCION, que nos va a permitir filtrar los productos por precio o nombre, ademas definiremos dentro de ella la estructura de nuestra card.

function ordenarProductos() {


    // // APLICANDO UN SORT PARA odernar productos POR PRECIO O NOMBRE

    const opcion = document.getElementById("opcionOrdenar").value
    switch (opcion) {
        case 'precio':
            productosGaleria.sort((a, b) => (a.precio > b.precio) ? 1 : ((b.precio > a.precio) ? -1 : 0))
            break
        default:
            productosGaleria.sort((a, b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0))
    }

    // variable para obtener el elemto del HTML por id,  id = "galeira"

    const cardProducto = document.getElementById('galeria')

    // esta linea de codigo nos permite vaciar el div para que cada vez que se inicie la funcion no se replique la galeria de productos

    cardProducto.innerHTML = ''

    // aplicamos un foreach que nos permite imprimir en panatalla nuestros productos 

    productosGaleria.forEach(producto => {
        const cardContainer = document.createElement('div')

        // classlist.add....   esta linea de codigo es para poder agregarle la clase a nuestro div. 

        cardContainer.classList.add('card');

        // agregado nuestra estructura para el card de los productos

        cardContainer.innerHTML = `
                             <img src="${producto.imagen}" alt="producto">
                              <h2 class="h2Card">${producto.nombre}</h2>
                             <h2 class="h2Card">${producto.precio}$</h2>
                                <form>
                                   <select>
                                      <option disabled selected>Seleccionar color</option>
                                      <option value="negro">negro</option>
                                     <option value="plateado">blanco</option>
                                     <option value="blanco">plateado</option>
                                 </select>
                              </form>
                             <button class="btn_enviar">comprar</button>
                                    `

        // agregamos el elemento creado a nuestro div que va a contener nuestro galeria de productos  
        cardProducto.append(cardContainer)
    });
}







// LUPA DE BUSQUEDA

let inputBuscar = document.getElementById("buscar")

inputBuscar.onchange = () => {
    productosGaleria = productos.filter((element) => element.nombre.includes(inputBuscar.value))
    ordenarProductos()
}
