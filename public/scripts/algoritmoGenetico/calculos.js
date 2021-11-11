

const __main__ = () => {

    let algoritmo = new AlgoritmoGenetico(20, 1, 30, '');
    algoritmo.inicializar();
    let resultados = algoritmo.obtenerResultados();

    let tablaBody = $('#tableBodyAlgoritmoGenenetico');
    let tablaFooter = $('#tableFooterAlgoritmoGenetico');

    let body = '';

    resultados.forEach(sujeto => {
        body += `<tr>`
        body += `<td class="bg-secondary">${sujeto.id + 1}</td>`
        body += `<td>${sujeto.poblacion}</td>`
        body += `<td>${sujeto.cromosoma}</td>`
        body += `<td>${sujeto.funcion}</td>`
        body += `<td>${sujeto.fitness}</td>`
        body += `<td>${sujeto.acumulado}</td>`
        body += `<td>${sujeto.ruleta}</td>`
        body += `<td>${sujeto.padre.poblacion}</td>`
        body += `<td>${sujeto.padre.cromosoma}</td>`
        body += `<td>${sujeto.cruze}</td>`
        body += `<td>${sujeto.hijo}</td>`
        body += `<td>${sujeto.bitMutacion+1}</td>`
        body += `<td>${sujeto.hijoMutado}</td>`
        body += `<td>${sujeto.hijoResultante}</td>`
        body += `<td>${sujeto.hijoPenalizado}</td>`
        body += `</tr>`
    })

    footer = `
        <tr class="bg-secondary">
            <td></td>
            <td></td>
            <td>Total</td>
            <td>${algoritmo.total}</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    `

    tablaBody.empty();
    tablaBody.append(body);
    tablaFooter.empty();
    tablaFooter.append(footer)

}

__main__();