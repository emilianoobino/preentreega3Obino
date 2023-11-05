let cdDeMusica = {
    artistas: {},
};

const artistaInput = document.getElementById("artista");
const tituloInput = document.getElementById("titulo");
const duracionInput = document.getElementById("duracion");
const agregarArtistaBtn = document.getElementById("agregarArtista");
const agregarCancionBtn = document.getElementById("agregarCancion");
const mostrarCancionesBtn = document.getElementById("mostrarCanciones");
const eliminarArtistaBtn = document.getElementById("eliminarArtista");
const eliminarCancionBtn = document.getElementById("eliminarCancion");
const mostrarTodasLasCancionesBtn = document.getElementById("mostrarTodasLasCanciones");
const resultadosDiv = document.getElementById("resultados");
const avisosDiv = document.getElementById("avisos");
const listaCanciones = document.getElementById("listaCanciones");

if (localStorage.cdDeMusica) {
    cdDeMusica = JSON.parse(localStorage.cdDeMusica);
    artistaInput.value = "";
}

function guardarEnLocalStorage() {
    localStorage.cdDeMusica = JSON.stringify(cdDeMusica);
}

function mostrarAviso(mensaje) {
    avisosDiv.textContent = mensaje;
}

agregarArtistaBtn.addEventListener("click", () => {
    const artista = artistaInput.value;

    if (!cdDeMusica.artistas[artista]) {
        cdDeMusica.artistas[artista] = [];
        guardarEnLocalStorage();
        mostrarAviso("Artista \"" + artista + "\" guardado con éxito.");
        artistaInput.value = "";
    } else {
        mostrarAviso("El artista ya existe.");
    }
});

agregarCancionBtn.addEventListener("click", () => {
    const artista = artistaInput.value;
    const titulo = tituloInput.value;
    const duracion = duracionInput.value;

    if (cdDeMusica.artistas[artista]) {
        cdDeMusica.artistas[artista].push({ titulo, duracion });
        guardarEnLocalStorage();
        mostrarAviso("Canción \"" + titulo + "\" agregada al artista \"" + artista + "\" con éxito.");
        tituloInput.value = "";
        duracionInput.value = "";
    } else {
        mostrarAviso("El artista no existe en la lista.");
    }
});

mostrarCancionesBtn.addEventListener("click", () => {
    const artista = artistaInput.value;
    const canciones = cdDeMusica.artistas[artista];

    listaCanciones.innerHTML = "";

    if (canciones && canciones.length > 0) {
        canciones.forEach((cancion, index) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${index + 1}. ${cancion.titulo} - Duración: ${cancion.duracion}`;
            listaCanciones.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement("li");
        listItem.textContent = "No hay canciones para el artista seleccionado.";
        listaCanciones.appendChild(listItem);
    }
});

eliminarArtistaBtn.addEventListener("click", () => {
    const artista = artistaInput.value;

    if (cdDeMusica.artistas[artista]) {
        delete cdDeMusica.artistas[artista];
        guardarEnLocalStorage();
        mostrarAviso("Artista \"" + artista + "\" eliminado con éxito.");
        artistaInput.value = "";
    } else {
        mostrarAviso("El artista no existe en la lista.");
    }
});

eliminarCancionBtn.addEventListener("click", () => {
    const artista = artistaInput.value;
    const titulo = tituloInput.value;

    if (cdDeMusica.artistas[artista]) {
        const canciones = cdDeMusica.artistas[artista];
        const index = canciones.findIndex(cancion => cancion.titulo === titulo);
        if (index !== -1) {
            canciones.splice(index, 1);
            guardarEnLocalStorage();
            mostrarAviso("Canción \"" + titulo + "\" eliminada del artista \"" + artista + "\" con éxito.");
            tituloInput.value = "";
            duracionInput.value = "";
        } else {
            mostrarAviso("Canción no encontrada en el artista seleccionado.");
        }
    } else {
        mostrarAviso("El artista no existe en la lista.");
    }
});

mostrarTodasLasCancionesBtn.addEventListener("click", () => {
    listaCanciones.innerHTML = "";

    for (const artista in cdDeMusica.artistas) {
        const canciones = cdDeMusica.artistas[artista];
        if (canciones && canciones.length > 0) {
            const artistaHeader = document.createElement("h3");
            artistaHeader.textContent = artista;
            listaCanciones.appendChild(artistaHeader);

            canciones.forEach((cancion, index) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${index + 1}. ${cancion.titulo} - Duración: ${cancion.duracion}`;
                listaCanciones.appendChild(listItem);
            });
        }
    }
});
mostrarTodasLasCancionesBtn.click();
