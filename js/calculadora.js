const botonesNumeros = document.querySelectorAll('.opciones-numeros button')
const input = document.getElementById('calc-resultado')
const limpiar = document.getElementById('limpiar');
const resultado = document.getElementById('resultado');
const operadores = document.querySelectorAll('.operador')
let ultimoOperador = '';
let calculadora = [];
let mostrarResultado = false;


function agregarNumeros(botonNumero){
    input.value += botonNumero.innerText;
    ultimoOperador = botonNumero.innerText;
}

function agregarOperador(operador){
    const operadoresValidos = ultimoOperador !== '+' && ultimoOperador !== '-' && ultimoOperador !== '÷' && ultimoOperador !== '×';
    if(operadoresValidos){
        input.value += operador.innerText;
        ultimoOperador = operador.innerText
    }
}

//Obtener Numeros
for(let botonNumero of botonesNumeros){
    botonNumero.addEventListener("click", function(){
        agregarNumeros(botonNumero)
    });
}

//Obtener Operadores
for(let operador of operadores){
    operador.addEventListener("click", function(){
       agregarOperador(operador)
    });
}



resultado.addEventListener("click", function(){
    const expresion = input.value;
    
    const numeros = expresion.split(/\+|\-|\×|\÷/g);

    const operadores = expresion.replace(/[0-9]|\./g, "").split("");


    //Dividir 
    let dividir =operadores.indexOf('÷');
    while(dividir != -1){
        numeros.splice(dividir, 2, numeros[dividir] / numeros[dividir + 1]);
        operadores.splice(dividir, 1);
        dividir = operadores.indexOf("÷")
    }

    let multiplicar = operadores.indexOf('×');
    while(multiplicar != -1) {
        numeros.splice(multiplicar, 2, numeros[multiplicar] * numeros[multiplicar + 1]);
        operadores.splice(multiplicar, 1);
        multiplicar = operadores.indexOf('×')
    }


    let restar = operadores.indexOf('-');
    while(restar != -1){
        numeros.splice(restar, 2, numeros[restar] - numeros[restar + 1]);
        operadores.splice(restar, 1);
        restar = operadores.indexOf('-');
    }


    let suma = operadores.indexOf('+');
    while(suma != -1){
        numeros.splice(suma, 2, parseFloat(numeros[suma]) + parseFloat(numeros[suma + 1]));
        operadores.splice(suma, 1);
        suma = operadores.indexOf('+');
    }

    input.value = numeros[0];

    mostrarResultado = true


    console.log(expresion)
    // Utilizar una expresión regular para dividir la cadena en números y operadores
    //const partes = expresion.match(/(\d+|\+|\-|\*|\/)/g);
    //console.log(partes)
});




//Limpiar Calculadora
limpiar.addEventListener("click", function(){
    input.value = '';
    ultimoOperador = '';
});






