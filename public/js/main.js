const data = [{
    id: 1,
    nameline: "Libre inversión",
    yearRate: 22,
    montRate: 1.8,
    maxTerm: 60,
    step: 100000,
    preaprobado: 1200000
},
{
    id: 2,
    nameline: "Vivienda",
    yearRate: 22,
    montRate: 1.8,
    maxTerm: 48,
    step: 500000,
    preaprobado: 5000000
},
{
    id: 3,
    nameline: "Compra de cartera",
    yearRate: 22,
    montRate: 1.8,
    maxTerm: 60,
    step: 500000,
    preaprobado: 15000000
}
]
// Selector campo select de las lineas de crédito
let lineaCredito = document.querySelector("#linea-credito")
// Crear las líneas de crédito según los datos
for (let i = 0; i<data.length; i++) {
    let opt = document.createElement('option');
    opt.value = data[i].nameline
    opt.innerHTML = data[i].nameline
    lineaCredito.appendChild(opt)
}
// Buscar Indice para pintar pantallas
const findIndex = () => {
    const index = data.findIndex((item) => {
        return item.nameline === lineaCredito.value
    })
    return index
}
// Espacio Preaprobado
let messagePreaprobado = document.querySelector('#monto-num')
let labelPreaprobado = document.querySelector('#monto')
let rangePreaprobado = document.querySelector('#monto-range')
// Espacio meses
let inputMeses = document.querySelector('#meses')
let rangeMeses = document.querySelector('#meses-range')
let listMeses = document.querySelector('#list-meses')

const rangePreaprobadoConfig = (range, min, max, step)=>{
    range.setAttribute('max', max)
    range.setAttribute('min', min)
    range.setAttribute('step',step)
    range.value = max
}

const createListMonth = (data, index) => {
    listMeses.innerHTML = ""
    let maxMonth = data[index].maxTerm
    for(let i = 12; i <= maxMonth; i++) {
        if(i %12 == 0 ) {
            let li = document.createElement('li');
            li.innerHTML = i
            listMeses.appendChild(li)
        }
    }
}

const rangeMesesConfig = (range, min, max, step)=>{
    range.setAttribute('max', max)
    range.setAttribute('min', min)
    range.setAttribute('step',step)
    range.value = max
}


const getData = (data, index) => {
    let info = data[index].preaprobado
    let step = data[index].step
    let maxRangeMonth = data[index].maxTerm
    messagePreaprobado.innerHTML = info
    labelPreaprobado.value = info;
    inputMeses.value = maxRangeMonth
    rangePreaprobadoConfig(rangePreaprobado, 0, info, step)
    rangePreaprobadoConfig(rangeMeses, 0, maxRangeMonth, 12)
    createListMonth(data, findIndex())
}

// Imprimiendo el espacio con el preaprobado del cliente
lineaCredito.addEventListener('change', function(){
    getData(data, findIndex())
    createListMonth(data, findIndex())
})

getData(data, findIndex())














// Configuración del range


// Crear cantidad de meses
// const maxMonthPerLine = (data) => {
//     for(let i = 0; i < data.length; i++) {
//         if(data[i].nameline == lineaCredito.value) {
//             let dataMonth = data[i].maxTerm
//             return dataMonth
//         }
//     }
// }
// inputMeses.value = maxMonthPerLine(data)
// // Setup range meses 
// const rangeMesesConfig = (range, maxDate)=>{
//     range.setAttribute('max', maxDate)
//     range.setAttribute('min', 12)
//     range.setAttribute('step', 12)
//     range.value = maxDate
// }
// rangeMesesConfig(rangeMeses, maxMonthPerLine(data))

// let max = maxMonthPerLine(data)
// for(let i = 12; i <= max; i++) {
//     if(i %12 == 0 ) {
//         let li = document.createElement('li');
//         li.innerHTML = i
//         listMeses.appendChild(li)
//     }
// }

// // Select linea de crédito
// let lineaCredito = document.querySelector("#linea-credito")
// // Campos dinamicos
// let preaprobadoControls = document.querySelector("#monto")
// let preaprobadoLabel = document.querySelector("#monto-num")
// let rangoPreaprobado = document.querySelector("#monto-range")
// let btnSimular = document.querySelector("#simular-btn")
// let numCard = document.querySelector("#card-value")
// let mesesCampo = document.querySelector("#meses")
// let mesesRange = document.querySelector("#meses-range")
// let preaprobado = 5000000;
// let meses = 60; 
// // Limites máximo rango
// rangoPreaprobado.setAttribute("max", preaprobado)
// rangoPreaprobado.setAttribute("step", 500000)
// mesesRange.setAttribute("max", meses)
// mesesRange.setAttribute("min", 12)
// mesesRange.setAttribute("step", 12)
// //Mostrar rango en los inputs de preaprobado
// rangoPreaprobado.value =  preaprobado
// preaprobadoControls.value =  preaprobado.toLocaleString('es-CO')
// mesesCampo.value = mesesRange.value;
// //Capturar valor de los inputs preaprobado
// rangoPreaprobado.addEventListener('input', function(e) {
//     preaprobadoControls.value = e.target.value
// })
// preaprobadoControls.addEventListener('input', function(e) {
//     rangoPreaprobado.value = e.target.value
// })
// //Capturar valor de los inputs meses
// mesesRange.addEventListener('input', function(e) {
//     mesesCampo.value = e.target.value
// })
// mesesCampo.addEventListener('input', function(e) {
//     mesesRange.value = e.target.value
// })
// function calculateSimulator (monto, meses, tasa, seguro) {
//     let formula = monto / meses + ((monto / meses) * (tasa / 100)) + seguro
//     return formula
// }
// btnSimular.addEventListener('click', (datos) => {
//     printData()
// })
// function total() {
//     let monto = parseInt(preaprobadoControls.value) 
//     let meses = parseInt(mesesRange.value)
//     let tasa = 1.5
//     let seguro = 5000
//     let total = Math.round(calculateSimulator(monto, meses, tasa, seguro))
//     return total
// }
// function printData() {
//     let newCuote = total().toLocaleString("es-CO")
//     numCard.textContent = newCuote
// }
// printData()