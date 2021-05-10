const sizes = document.querySelectorAll('.size');                /* 1° empezamos haciendo las animaciones de los size buttons, seleccionando todos los size buttons */
const colors = document.querySelectorAll('.color'); /* °° */
const shoes = document.querySelectorAll('.shoe'); /* $$ $$ */
/* lo último q vamos a hacer, es seleccionar el gradiente en el color q acabamos de clickear y seleccionarlo.PRimero seleecionamos todos los gradientes. Luego, nos iremos al css (linea 71) y crearemos la clase que se añadirá al grdiente q queremos q se muestre en pantalla. ENtonces, para poder mostrarlo, necesitamos setear su z-index a 0, porque todos los gradientes tienen z-index -2. Luego tenemos q crear la animación q se reproduzca cuando reproduzcamos el gradiente, eso lo haremos con @keyframes. sigue en la funcion changeColor :)  */
const gradients = document.querySelectorAll('.gradient');
const shoeBg = document.querySelector('.background-shoe');


let previouscolor = "blue"; /* :>) finalmente, en la ultima linea de la funcion changeColor, o sea donde nuestra función termina, seteamos el valor de la variable "previouscolor" al color que clickeamos */

let animationEnd = true;


/* así, cuando cliqueemos un size button, vamos a remover la clase ".active" de todods los otros size buttons. Luego, vamos a añadir la clase al size button que acabamos de cliquear */
function changeSize(){
    sizes.forEach(size => size.classList.remove('active'))
    this.classList.add('active');
}

function changeColor(){
    if (!animationEnd) return;

    /* °en esta prox línea obtenemos el valor del atributo "primary" del color button que clickeamos , lo que significa q obtendremos el código hexagesimal de dicho color ° °°  */
    let primary = this.getAttribute('primary');

    /* $$ lo q sigue ahora es seleccionar la zapatilla en el color que clickeamos y seleccionarla. Para eso, primero tenemos que obtener el valor del atributo "color" del color button que clickeamos (el codigo hexa q está en el html) $$*/
    let color = this.getAttribute('color');
    let shoe = document.querySelector(`.shoe[color="${color}"]`)
    let gradient = document.querySelector(`.gradient[color="${color}"]`) /* :) */
    
    /*style l. 77 :>)primero tenemos que seleccionar el último gradiente. Después, tenemos que agregar la clase(linea 40) */
    let previousgradient = document.querySelector(`.gradient[color="${previouscolor}"]`) /* :>) */

    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    /* °° finalmente vamos a cambiar el valor de la variable css "primary" al color que obtuvimos del atributo "primary" */
    document.documentElement.style.setProperty('--primary', primary)

    /* $$Luego, tenemos que seleccionar la imagen de la zapatilla cuyo atributo "color" tenga el mismo valor, pero antes, tenemos q seleccionar todas las imagenes de las zapatillas: eso lo hacemos creando la constante shoes al principio del documento, con un querySelectorAll() $$ */
    
    /*Posteriormente para mostrar una imagen de zapatilla, tiene que tener la clase "show", x lo tanto necesitamos remover la clase de todas las imagenes de las zapatillas  y añadirla a la shoe-image que queremos mostrar.  para seleccionar la zapatilla, simplemente usamos el atributo de css (selector). Esto último en línea 17 */
    shoes.forEach(s => s.classList.remove('show'));
    shoe.classList.add('show');

    /* :). Entonces cuando clikeamos un color, primero tenemos que remover la clase "first" de todos los gradientes de los elementos y luego añadirselo al gradiente que queremos mostrar. Ademas el gradient que queremos mostrar debe tener el mismo valor del atributo "color" del color button q clickeamos. Entonces para seleccionarlo simplemente usamos el atributo css selector. creamos arriba en la funcion el let gradient */
    gradients.forEach(g => g.classList.remove('first', 'second'));
    gradient.classList.add('first')

    /* :>) ahora, necesitamos saber el ultimo color "previouscolor" cada vez q cliqueemos un color. En un principio, el ultimo color es azul, porque ya tenemos el gradiente azul mostrandose en pantalla(a ese color le asignamos la clase gradient).linea 6 */
    previousgradient.classList.add('second');

    previouscolor = color;/* :>) así, cuando clikeemos un nuevo color la proxima vez, después de seleccionar el último gradiente usando este valor, se va a setear el valor de la variable "previouscolor" de nuevo al color q acabamos de clikear */

    animationEnd = false;
    gradient.addEventListener('animationend', () =>{
        animationEnd = true;
    })

    /* ultimo bug: cuando clikeamos un nuevo color y la animacion del
    gradiente actual se está reproduciendo, esta no llega a finalizar
    para arreglar esto, creamos un booleano y seteamos su valor a 
    false cuando clikeamos un color, y cuando la animacion termina,
    lo seteamos de nuevo a true. así cuando la animación se está reproduciendo,
    el booleano es falso y cuando clickeamos un nuevo color, se chequeará el valor del boleano. Si es verdader la función se ejecutará, de ser falso, no lo hará. (lineas 18 y 8)*/
}





sizes.forEach(size => size.addEventListener('click', changeSize));

/* primero añadimos la clase 'active' al color q acabamos de clickear y hacemos lo = q hicimos con size buttons creando una función para los colores(changeColor)*/
colors.forEach(c => c.addEventListener('click', changeColor));



/* ahora, tenemos q cambiar el Background-shoe height, donde su altura será casi la misma q la del shoe */
let x = window.matchMedia("(max-width: 1000px)");

function changeHeight(){
    /* x.matches, es como decir: @media (max-width:1000px{}) */
    if(x.matches){
        let shoeHeight = shoes[0].offsetHeight;   /* primero obtenemos el shoe height. Luego debemos seleccionar el elemento background-shoe(linea 6). Finalmente seteamos su height al height del zapato. Vamos a setear el heigth al 90% del shoe height */
        shoeBg.style.height = `${shoeHeight * 0.9}px`;
    }
    else{
        shoeBg.style.height = "470px";/* linea . 41 style.css */
    }
}

changeHeight();
window.addEventListener('resize', changeHeight);
