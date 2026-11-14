// leemos los favoritos del localStorage 
function leerFavoritos() {
    var favoritos = localStorage.getItem("favoritos") || "[]";
    return JSON.parse(favoritos);
}

// pintamos la lista de favoritos dentro del contenedor #favoritos

function pintarFavoritos() {
    // Leemos los favoritos guardados
    var favoritos = leerFavoritos();

    // Buscamos el contenedor
    var contenedor = document.querySelector("#favoritos");
    if (!contenedor) return;

    // Limpiamos el contenedor
    contenedor.innerHTML = "";

    // Creamos una lista
    var ul = document.createElement("ul");

    for (var x = 0; x < favoritos.length; x++) {

        var li = document.createElement("li");

        // Creamos el enlace del favorito
        var a = document.createElement("a");
        a.href = favoritos[x].url;
        a.textContent = favoritos[x].nombre;

        // Creamos el botón X
        var eliminar = document.createElement("button");
        eliminar.textContent = "×";
        eliminar.classList.add("eliminar-favorito");
        eliminar.title = "Eliminar favorito";

        // Guardamos el ID del producto
        eliminar.dataset.id = favoritos[x].id;

        // Cuando se pulsa la X
        eliminar.addEventListener("click", function (e) {

            // Evita que Bootstrap cierre el menú
            e.stopPropagation();
            e.preventDefault();

            var id = this.dataset.id;

            // Leemos los favoritos
            var favoritos = leerFavoritos();

            // Buscamos el favorito que queremos eliminar
            favoritos = favoritos.filter(function (favorito) {
                return favorito.id != id;
            });

            // Guardamos la nueva lista
            localStorage.setItem("favoritos", JSON.stringify(favoritos));

            // Actualizamos el listado
            pintarFavoritos();
        });

        // Añadimos el enlace y la X
        li.appendChild(a);
        li.appendChild(eliminar);

        ul.appendChild(li);
    }

    contenedor.appendChild(ul);
}




// usamos querySelectorAll porque hay un botón por cada producto
document.querySelectorAll(".agregar-favoritos").forEach(function (boton) {

    boton.addEventListener("click", function (e) {

        // hacemos que no se ejecute el enlace
        e.preventDefault();

        // la tarjeta (section) que contiene el botón pulsado
        var tarjeta = this.closest("section");
        if (!tarjeta) return;

        // leemos los datos clave del producto y los guardamos en un objeto
  var datos = {
    id: tarjeta.dataset.id,
    nombre: tarjeta.querySelector(".card-title").textContent.trim(),

    // Guardamos el enlace de Wikipedia
    url: tarjeta.querySelector(".Info").href
};

        // leemos los favoritos del localStorage
        var favoritos = leerFavoritos();

        // buscamos el producto en la lista de favoritos
        var posLista = favoritos.findIndex(function (e) { return e.id == datos.id; });
        if (posLista > -1) {
            // si está, lo quitamos
            favoritos.splice(posLista, 1);
        } else {
            // si no está, lo añadimos
            favoritos.push(datos);
        }

        // guardamos la lista de favoritos
        localStorage.setItem("favoritos", JSON.stringify(favoritos));

        // se vuelve a armar la lista para que el cambio se vea al momento
        pintarFavoritos();
    });
});


// leemos los favoritos del localStorage para no perderlos al refrescar la pagina
pintarFavoritos();
