//-------------------------------CREO MIS VARIABLES A UTILIZAR---------------------------
//Definimos que solo utilizaremos 6 colores 
let NumSquares = 6

//Utilizamos el metodo que me permite generar cualquier tipo de color aleatorio en decimal
let colors = generateRandomColors(NumSquares)

//Utilizamos el metodo "document.querySelectorAll" para poder manipular el DOM y acceder al documento y sus elementos.
let square = document.querySelectorAll('.square')

let display = document.querySelector('#colorDisplay')

let title = document.querySelector('.title')

let message = document.querySelector('#message')

let buttonReset = document.querySelector('#reset')

let buttons= document.querySelectorAll(".buttons")

//Le asignamos a nuestra variable el color clickeado por el usuario
let pickedColor = pickColor()

//Le asignamos a nuestra variable el color ganador previamente seleccionado entre 6 colores aleatorios
let clickedColor= generateRandomColors(6)

//-------------------------------CREO MI CODIGO---------------------------------

//Funcion que me permite inicializar la pagina web para jugar devuelta
init()

function init(){
    TwoButtons()
    resetGame()
    reset()
    
}

//For Loop que me permite elegir los colores en cada vuelta,verificar y mostrar un mensaje por pantalla los resultados del juego
for (let i = 0; i < square.length; i++) {
    square[i].style.backgroundColor = colors[i];
    square[i].addEventListener('click', function(){

        clickedColor = square[i].style.backgroundColor

        if (clickedColor != pickedColor) {
            //Error-> Hay que volver a intentar
            this.style.backgroundColor = '#232323'
            message.textContent = 'Try again :('
        }else {
            //Correcto-> Jugar devuelta
            title.style.backgroundColor = clickedColor
            message.textContent = "Correct :)"
            changedColors(clickedColor)
            buttonReset.textContent = "Play Again?"
        }
    });
}

//Creo mis funciones que me permiten configurar el juego. Utilizo eventos para dar interactividad al juego
//Funcion que me permite cambiar todos los colores al color ganador
function changedColors (color){

    for (let i = 0; i < square.length; i++) {

        square[i].style.backgroundColor = color
    }
}

//Funcion que me permite generar numeros aleatorios junto al metodo Math.random
function pickColor() {

    let numero = Math.floor(Math.random()*colors.length)

    return colors[numero]
}

//Funcion que me selecciona 3 numeros al azar para formar el numero RGB de los colores decimal
function randomColor() {
    //RGB son siempre 3 numeros entre 0 y 255
    let numeroR = Math.floor(Math.random()*256);
    let numeroG = Math.floor(Math.random()*256);
    let numeroB = Math.floor(Math.random()*256);
    //Las template literals me permite concatenar la cadena de caracteres
    return `rgb(${numeroR}, ${numeroG}, ${numeroB})`
}

//Funcion que me permite generar colores aleatorios junto a un Array que me guarda los 3 numeros del RGB
function generateRandomColors(numero){

    let array = []
    for (let i = 0; i < numero; i++) {
       array.push(randomColor())
    }

    return array
}

//Funcion que me permite resetear el juego cuando el usuario seleccione la opcion New Colors
function resetGame() { 
    buttonReset.addEventListener("click", function(){
    title.style.backgroundColor = "#232323"
    colors = generateRandomColors(NumSquares)
    pickedColor = pickColor()
    display.textContent = pickedColor
    for (let i = 0; i < square.length; i++) {
        square[i].style.backgroundColor = colors[i];
    }
    
    buttonReset.textContent = "New Colors"
    message.textContent = ""
    
    })
}

//Funcion que me permite resetear el color ganador para el proximo juego
function reset() {
   colors = generateRandomColors(NumSquares)
   pickedColor = pickColor()
   display.textContent = pickedColor
   for(let i=0; i < square.length; i++){
    if (colors[i]) {

        square[i].style.backgroundColor = colors[i];
        square[i].style.display = "block"
    }else {
        square[i].style.display = "none"
    }

   }
    title.style.backgroundColor = "#232323"
    buttonReset.textContent = "New Colors"
}

//Funcion que le permite al usuario elegir la opcion de juego. En caso de que la opcion sea Easy se muestran 3 colores, caso contrario se muestran 6 colores
function TwoButtons() {
	for(let i = 0; i < buttons.length; i++){
        buttons[i].addEventListener("click", function(){
            buttons[0].classList.remove("selected");
            buttons[1].classList.remove("selected");
            this.classList.add("selected");
            if (this.textContent == 'Easy') {
                NumSquares = 3
             } else { NumSquares = 6 }
            reset()
        });
    }
}