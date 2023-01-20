//  Fórmula para calcular el interés compuesto
//  A = P x (1 + r/n)^n*t (no utilizo la formula directamente)
//  A = la cantidad que recibirás al final del periodo. Variable: capital_final (float)
//  P = la cantidad de la inversión inicial. Variable: capital_inicial (float)
//  r = tasa de interés anual. Variable: tasa_interes (float)
//  n = el número de periodos devengados (mensual, cuatrimetral, trimestral, bimestral, anual). Variable: frecuencia_periodos (int). mensual = 12, trimestral = 4, cuatrimetral = 3, bimestral = 2, anual = 1.
//  t = el periodo total de inversión en años. Variable: tiempo (int)

const capital_inicial = document.getElementById('monto');
const frecuencia_periodos = document.getElementById('periodo');
const tiempo = document.getElementById('tiempo');
const tasa_interes = document.getElementById('interes');
const btnCalcular = document.getElementById('btnCalcular');
const llenarTabla = document.querySelector('#lista-tabla tbody');
const llenarResumen = document.querySelector('#lista-resumen tbody');

btnCalcular.addEventListener('click', () => {
    calcularInteres(capital_inicial.value, tasa_interes.value, tiempo.value, frecuencia_periodos.value);
})

function calcularIrecuencia (frecuencia_periodos) {
    if (frecuencia_periodos == 'mensual') {
        return 12;
    } else if (frecuencia_periodos == 'trimestral') {
        return 4;
    } else if (frecuencia_periodos == 'cuatrimetral') {
        return 3;
    } else if (frecuencia_periodos == 'bimestral') {
        return 2;
    } else (frecuencia_periodos == 'anual') 
        return 1;
}

function calcularInteres(capital_inicial, tasa_interes, tiempo, frecuencia_periodos) {
    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }

    while(llenarResumen.firstChild){
        llenarResumen.removeChild(llenarResumen.firstChild);
    }

    let valor_periodo = parseInt(calcularIrecuencia(frecuencia_periodos));
    let periodos = valor_periodo * tiempo;
    let tasa_periodo = tasa_interes / valor_periodo;
    let capital_final = parseFloat(capital_inicial);
    let interes_desvengado = 0, interes_acumulado = 0, capital_acumulado = parseFloat(capital_inicial);

    for(let i = 1; i <= periodos; i++) {
        capital_acumulado += parseFloat(interes_desvengado);
        interes_desvengado = parseFloat(capital_final) * tasa_periodo/100;
        interes_acumulado += interes_desvengado;
        capital_final += interes_acumulado;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>${'$' + capital_acumulado.toFixed(2)}</td>
            <td>${'$' + interes_desvengado.toFixed(2)}</td>
            <td>${'$' + interes_acumulado.toFixed(2)}</td>
            <td>${'$' + capital_final.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row)
    }
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${'$' + Number(capital_inicial).toFixed(2)}</td>
        <td>${'$' + capital_final.toFixed(2)}</td>
        <td>${'$' + interes_acumulado.toFixed(2)}</td>
        <td>${frecuencia_periodos}</td>
        <td>${tasa_periodo.toFixed(3) + '%'}</td>
        <td>${valor_periodo}</td>
    `;
    llenarResumen.appendChild(row)
}