//Input línea
let lineaCredito = document.querySelector("#linea-credito")
// Inputs de preaprobado
let montoPreaprobado = document.querySelector("#monto")
let montoNum = document.querySelector("#monto-num")
let rangoPreaprobado = document.querySelector("#monto-range")
// Botón Simular
let btnSimular = document.querySelector("#simular-btn")
// Campo de la card con la cuota
let numCard = document.querySelector("#card-value")
// Inputs de meses
let mesesCampo = document.querySelector("#meses")
let mesesRange = document.querySelector("#meses-range")
// Valores máximos
let preaprobado = 5000000;
let meses = 60;


// Formateo de numeros 
preaprobado.toLocaleString('es-CO')
// Mostrar preaprobado en el textos
montoNum.textContent = `$ ${preaprobado.toLocaleString('es-CO')}` 
// Limites máximo rango
rangoPreaprobado.setAttribute("max", preaprobado)
rangoPreaprobado.setAttribute("step", 500000)
mesesRange.setAttribute("max", meses)
mesesRange.setAttribute("min", 12)
mesesRange.setAttribute("step", 12)
//Mostrar rango en los inputs de preaprobado
rangoPreaprobado.value =  preaprobado
montoPreaprobado.value =  preaprobado.toLocaleString('es-CO')
mesesCampo.value = mesesRange.value;
//Capturar valor de los inputs preaprobado
rangoPreaprobado.addEventListener('input', function(e) {
    montoPreaprobado.value = e.target.value
})
montoPreaprobado.addEventListener('input', function(e) {
    rangoPreaprobado.value = e.target.value
})
//Capturar valor de los inputs meses
mesesRange.addEventListener('input', function(e) {
    mesesCampo.value = e.target.value
})
mesesCampo.addEventListener('input', function(e) {
    mesesRange.value = e.target.value
})

function calculateSimulator (monto, meses, tasa, seguro) {
    let formula = monto / meses + ((monto / meses) * (tasa / 100)) + seguro
    return formula
}
btnSimular.addEventListener('click', (datos) => {
    printData()
})

function total() {
    let monto = parseInt(montoPreaprobado.value) 
    let meses = parseInt(mesesRange.value)
    let tasa = 1.5
    let seguro = 5000
    let total = Math.round(calculateSimulator(monto, meses, tasa, seguro))
    return total
}

function printData() {
    let newCuote = total().toLocaleString("es-CO")
    numCard.textContent = newCuote
}

printData()