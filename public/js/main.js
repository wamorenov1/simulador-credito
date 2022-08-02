"use strict";

//Input línea
var lineaCredito = document.querySelector("#linea-credito"); // Inputs de preaprobado

var montoPreaprobado = document.querySelector("#monto");
var montoNum = document.querySelector("#monto-num");
var rangoPreaprobado = document.querySelector("#monto-range"); // Botón Simular

var btnSimular = document.querySelector("#simular-btn"); // Campo de la card con la cuota

var numCard = document.querySelector("#card-value"); // Inputs de meses

var mesesCampo = document.querySelector("#meses");
var mesesRange = document.querySelector("#meses-range"); // Valores máximos

var preaprobado = 5000000;
var meses = 60; // Formateo de numeros 

preaprobado.toLocaleString('es-CO'); // Mostrar preaprobado en el textos

montoNum.textContent = "$ ".concat(preaprobado.toLocaleString('es-CO')); // Limites máximo rango

rangoPreaprobado.setAttribute("max", preaprobado);
rangoPreaprobado.setAttribute("step", 500000);
mesesRange.setAttribute("max", meses);
mesesRange.setAttribute("min", 12);
mesesRange.setAttribute("step", 12); //Mostrar rango en los inputs de preaprobado

rangoPreaprobado.value = preaprobado;
montoPreaprobado.value = preaprobado.toLocaleString('es-CO');
mesesCampo.value = mesesRange.value; //Capturar valor de los inputs preaprobado

rangoPreaprobado.addEventListener('input', function (e) {
  montoPreaprobado.value = e.target.value;
});
montoPreaprobado.addEventListener('input', function (e) {
  rangoPreaprobado.value = e.target.value;
}); //Capturar valor de los inputs meses

mesesRange.addEventListener('input', function (e) {
  mesesCampo.value = e.target.value;
});
mesesCampo.addEventListener('input', function (e) {
  mesesRange.value = e.target.value;
});

function calculateSimulator(monto, meses, tasa, seguro) {
  var formula = monto / meses + monto / meses * (tasa / 100) + seguro;
  return formula;
}

btnSimular.addEventListener('click', function (datos) {
  printData();
});

function total() {
  var monto = parseInt(montoPreaprobado.value);
  var meses = parseInt(mesesRange.value);
  var tasa = 1.5;
  var seguro = 5000;
  var total = Math.round(calculateSimulator(monto, meses, tasa, seguro));
  return total;
}

function printData() {
  var newCuote = total().toLocaleString("es-CO");
  numCard.textContent = newCuote;
}

printData();