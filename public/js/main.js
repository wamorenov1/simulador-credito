// Espacio Preaprobado
let messagePreaprobado = document.querySelector('#monto-num')
let inputPreaprobado = document.querySelector('#monto')
let rangePreaprobado = document.querySelector('#monto-range')
// Espacio meses
let inputMeses = document.querySelector('#meses')
let rangeMeses = document.querySelector('#meses-range')
let listMeses = document.querySelector('#list-meses')
// Espacio card
let cardTitle = document.querySelector('#card-name-line')
let cardCuota = document.querySelector('#card-cuota')
let cardMeses = document.querySelector('#card-meses')
let cardTasa = document.querySelector('#card-tasa')
let cardSinSeguro = document.querySelector('#card-cuota-sin')
let cardSeguro = document.querySelector('#card-seguro')
let btnSimular = document.querySelector("#simular-btn")
// Datos lineas
const data = [{
    id: 1,
    nameline: "Libre inversión",
    yearRate: 22,
    montRate: 1.8,
    policy: 5000,
    minterm: 12,
    maxTerm: 60,
    step: 100000,
    preaprobado: 20000000,
    minmonto: 1000000
},
{
    id: 2,
    nameline: "Turismo",
    yearRate: 22,
    montRate: 1.8,
    policy: 5000,
    minterm: 12,
    maxTerm: 60,
    step: 100000,
    preaprobado: 15000000,
    minmonto: 1000000
},
{
    id: 3,
    nameline: "Compra de cartera",
    yearRate: 22,
    montRate: 1.8,
    policy: 5000,
    minterm: 12,
    maxTerm: 36,
    step: 100000,
    preaprobado: 10000000,
    minmonto: 1000000
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

const rangePreaprobadoConfig = (range, min, max, step)=>{
    range.setAttribute('max', max)
    range.setAttribute('min', min)
    range.setAttribute('step',step)
    range.value = max
}

const rangeMesesConfig = (range, min, max, step)=>{
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
//Escuchar valor de los inputs preaprobado
inputPreaprobado.addEventListener('input', function(e) {
    rangePreaprobado.value = parseInt(e.target.value).toLocaleString("es-CO")
})
rangePreaprobado.addEventListener('input', function(e) {
    inputPreaprobado.value = parseInt(e.target.value).toLocaleString("es-CO")
})
//Escuchar valor de los inputs meses
inputMeses.addEventListener('input', function(e) {
    rangeMeses.value = e.target.value
})
rangeMeses.addEventListener('input', function(e) {
    inputMeses.value = e.target.value
})

const printControlsData = (data, index) => {
    let monto = data[index].preaprobado
    let meses = data[index].maxTerm
    let minmonto = data[index].minmonto
    let minterm = data[index].minterm
    messagePreaprobado.innerHTML = `$ ${parseInt(monto).toLocaleString("es-CO")}`
    inputPreaprobado.value = parseInt(monto).toLocaleString("es-CO")
    inputMeses.value = meses
    rangePreaprobadoConfig(rangePreaprobado, minmonto, monto, 1000000)
    rangeMesesConfig(rangeMeses, minterm, meses, 12)
    createListMonth(data, index)
}
printControlsData(data,findIndex())

const calculateSimulator = (data, i) => {
    let infoMonto = inputPreaprobado.value
    const replace = (x) => {
        return x.replace(/\./g, '')
    }
    let infoMontoParse = parseInt(replace(infoMonto))
    let infoMeses = inputMeses.value
    let formula = Math.round(infoMontoParse / infoMeses + ((infoMontoParse / infoMeses) * (data[i].montRate / 100)) + data[i].policy)
    return formula
}

const printCardData = (data, index) => {
    let cuota = calculateSimulator(data, index);
    cardTitle.innerHTML = data[index].nameline
    cardTasa.textContent = `${data[index].montRate} %`;
    cardMeses.textContent = `${inputMeses.value} Meses`;
    cardCuota.textContent = `$ ${cuota.toLocaleString("es-CO")}`
    cardSinSeguro.textContent = `$ ${(cuota - data[index].policy).toLocaleString("es-CO")}`
    cardSeguro.textContent = `$ ${data[index].policy.toLocaleString("es-CO")}`
}
printCardData(data, findIndex())
// Imprimiendo el espacio con el preaprobado del cliente
lineaCredito.addEventListener('change', function(){
    printControlsData(data,findIndex())
    printCardData(data, findIndex())
})

//Botón ver plan de pagos
let botonPlanPagos = document.querySelector('#plan-pagos')
let tablaPagos = document.querySelector('#tabla-pagos')
botonPlanPagos.addEventListener('click', function(){
    tablaPagos.classList.toggle("d-none")
})

btnSimular.addEventListener('click', function() {
    printCardData(data, findIndex())
})
