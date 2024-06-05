//Definimos un array de URLs de imágenes, para mantener el índice actual de la imagen mostrada, para controlar el cambio manual de la imagen
var imagenes = ['/haloinfinite.webp', '/gta6.webp','/COD6.webp', '/fortnite.webp', '/minecraft.webp'], cont = 0, manualChange = false;

//Función para manejar el comportamiento de la galería de imágenes
function gallery(container) {
    //Añadimos un evento 'click' al contenedor de la galería
    container.addEventListener('click', (e) => {
        //Seleccionamos los elementos relevantes dentro del contenedor
        const back = container.querySelector('.back');
        const forward = container.querySelector('.forward');
        const img = container.querySelector('img');
        const tgt = e.target;

        //Verificamos que se haya encontrado una imagen dentro del contenedor
        if(img) {
            //Marcamos que se realizó un cambio manual
            manualChange = true;

            //Manejamos el clic en el botón 'back'
            if(tgt === back) {
                if(cont > 0) {
                    cont--;
                }else {
                    cont = imagenes.length - 1;
                }
            }else if(tgt === forward) { //Manejamos el clic en el botón 'forward'
                if(cont < imagenes.length - 1) {
                    cont++;
                }else {
                    cont = 0;
                }
            }
            //Actualizamos la fuente de la imagen mostrada
            img.src = imagenes[cont];

            //Establecemos un temporizador para reiniciar el cambio manual después de 4 segundos
            setTimeout(() => { manualChange = false; }, 4000);
        }
    });
}

//Función para manejar el carrusel automático de imágenes
function carousel(container) {
    //Establecemos un intervalo para cambiar automáticamente la imagen cada 4 segundos
    setInterval(() => {
        //Verificamos que no se haya realizado un cambio manual
        if(!manualChange) {
            //Seleccionamos la imagen dentro del contenedor
            const img = container.querySelector('img');

            //Verificamos que la imagen sea un elemento HTMLImageElement válido
            if(img instanceof HTMLImageElement) {
                //Actualizamos la fuente de la imagen mostrada
                img.src = imagenes[cont];
            }

            //Avanzamos al siguiente índice de imagen en el array, con bucle al llegar al final
            cont = (cont + 1) % imagenes.length;
        }
    }, 4000); //Cambiamos la imagen cada 4 segundo
}

//Evento que se dispara cuando el DOM ha sido completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    //Seleccionamos el contenedor principal de la galería
    const container = document.querySelector(".container");

    //Verificamos que se haya encontrado el contenedor
    if(container) {
        //Iniciamos el comportamiento de la galería y el carrusel
        gallery(container);
        carousel(container);
    }
});