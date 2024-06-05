import data from './data/articles.js';
const buttonsOpenCar = document.querySelectorAll('[data-accion="open-car"]');
const buttonsCloseCar = document.querySelectorAll('[data-accion="close-car"]');
const buttonDelateItem = document.querySelectorAll('[data-accion="delate-item-car"]');
const buttonBuy = document.querySelectorAll('[data-accion="car-btn-buy"]');
const carAlertNoArticles = document.querySelector('.car-alert-no-articles');
const carContainerBtnBack = document.querySelector('.car-container-btn-back');
const carContainerTotal = document.querySelector('.car-container-total');
const windowCar = document.getElementById('car');
const btnAddCar = document.getElementById('add-to-cart');
const article = document.getElementById('article');
const formatCurrency = new Intl.NumberFormat('es-MX', {style: 'currency', currency: 'MXN'});
const notification = document.getElementById('notification');

let car = [];
//Guardar el carrito en localStorage cada vez que se modifique
const saveCarToLocalStorage = () => {
    localStorage.setItem('car', JSON.stringify(car));
};

//Cargar el carrito desde localStorage al cargar la página
const loadCarFromLocalStorage = () => {
    const storedCar = localStorage.getItem('car');
    if(storedCar) {
        car = JSON.parse(storedCar);
    }
};

loadCarFromLocalStorage();

const renderCar = () => {
    windowCar.classList.remove('hidden');

    //Elimina todos los productos anteriores para construir el carrito desde cero
    const articlesPrevious = windowCar.querySelectorAll('.car-article');
    articlesPrevious.forEach(article => article.remove());

    let total = 0;

    //Comprueba si hay productos
    if(car.length < 1) {
        carAlertNoArticles.classList.remove('hidden');
        carContainerBtnBack.classList.remove('hidden');
        carContainerTotal.classList.add('hidden');
    }else {
        carAlertNoArticles.classList.add('hidden');
        carContainerBtnBack.classList.add('hidden');
        carContainerTotal.classList.remove('hidden');

        //Itera sobre cada articulo del carrito y lo mostramos
        car.forEach((articleCar)=> {
            data.articles.forEach((articleDTB) => {
                if(articleDTB.id === articleCar.id) {
                    articleCar.price =  articleDTB.price;

                    total += articleDTB.price * articleCar.amount;
                }
            })

            //Plantilla HTML
            const templateArticle = `
                <div class="flex gap-5 items-center car-article-info">
                    <img src="${articleCar.img}" alt="" class="w-16 rounded-sm car-thumb" />
                    <div>
                        <p class="font-semibold mb-1 car-article-name">
                            <span class="font-normal car-article-amount">${articleCar.amount} x </span>${articleCar.name}
                        </p>
                    </div>
                </div>
                <div class="flex flex-col items-end justify-center car-article-container-price">
                    <button class="bg-none border-none cursor-pointer mb-2 text-txt-200 transition-all duration-300 hover:text-red-700 hover:bg-white rounded-md car-btn-delate-item" data-accion="delate-item-car">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>
                    </button>
                    <p class="text-lg car-article-price">${formatCurrency.format(articleCar.price * articleCar.amount)}</p>
                </div>`;

            //Crear un div
            const itemCar = document.createElement('div');

            //Agregar clase car-article y estilos css
            itemCar.classList.add(...['car-article', 'flex', 'justify-between', 'gap-5', 'pb-5', 'border-b', 'border-bg']);

            //Insertar plantilla dentro del elemento
            itemCar.innerHTML = templateArticle;

            //Agrega el articulo a la ventara del carrito
            windowCar.querySelector('.car-body').appendChild(itemCar);
        });
    }

    windowCar.querySelector('.car-total').innerText = formatCurrency.format(total);
}

//Abrir carrito
buttonsOpenCar.forEach((button) => {
    button.addEventListener('click', (e) => {
        renderCar();
    });
});

//Cerrar carrito
buttonsCloseCar.forEach((button) => {
    button.addEventListener('click', (e) => {
        windowCar.classList.add('hidden');
    });
});

//Agregar al carrito
btnAddCar.addEventListener('click', (e) => {
    const id = article.dataset.articleId;
    const name = article.querySelector('.article--name').innerText;
    const amount = 1;

    //Establece la ruta de la imagen que se mostrara en la alerta
    let thumbSrc = document.querySelector('.article-thumb-img').src;

    if(car.length > 0) {
        let articleInCar = false;

        car.forEach(item => {
            if(item.id === id && item.name === name){
                item.amount += amount;
                articleInCar = true;
            }
        })

        if(!articleInCar) {
            car.push({
                id: id,
                name: name,
                amount: amount,
                img: thumbSrc
            });
        }
    }else {
        car.push({
            id: id,
            name: name,
            amount: amount,
            img: thumbSrc
        });
    }

    //Guardar el carrito en localStorage
    saveCarToLocalStorage();

    notification.querySelector('img').src = thumbSrc;

    //Muestra la notificación
    notification.classList.add('md:right-20', 'opacity-100', 'max-md:right-2');

    setTimeout(() => {
        notification.classList.remove('md:right-20', 'opacity-100', 'max-md:right-2');
    }, 5000);
});

//Botones para eliminar articulos del carrito
windowCar.addEventListener('click', (e) => {
    if(e.target.closest('button')?.dataset.accion === 'delate-item-car') {
        const article = e.target.closest('.car-article');
        const indexArticle = [...windowCar.querySelectorAll('.car-article')].indexOf(article);

        car = car.filter((item, index) => {
            if(index !== indexArticle) {
                return item;
            }
        });

        //Guardar el carrito en localStorage
        saveCarToLocalStorage();

        renderCar();
    }
});

//Boton de enviar carrito
buttonBuy.forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log('Enviando petición de compra!');
        car = []; //Vaciar el carrito
        saveCarToLocalStorage();
        renderCar();
    });
});