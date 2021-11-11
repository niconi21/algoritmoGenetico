let cntSujetos = $('#cntSujetos');
let cntIteraciones = $('#cntIteraciones');
let min = $('#valorMinimo');
let max = $('#valorMaximo');
let funcion = $('#funcion');
let tabsIteraciones = $('#tabsIteraciones')
let contenedorTabs = $('#contenedorTabs')

const __main__ = () => {
    construirTabs(cntSujetos.val(), cntIteraciones.val(), min.val(), max.val(), funcion.val());
}

const construirTabs = (cntSujetos, cntIteraciones, min, max, funcion) => {
    let tabs = ''
    let tabPanes = '';
    let poblaciones = [];
    for (let index = 0; index < cntIteraciones; index++) {

        let algoritmo = new AlgoritmoGenetico(cntSujetos, min, max, funcion);

        if (index == 0) {
            algoritmo.inicializar();
        } else {
            algoritmo.asignarSujetos(poblaciones)
            poblaciones=[]
        }
        let resultados = algoritmo.obtenerResultados();
        let body = '';
        let footer = '';
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
            body += `<td>${sujeto.bitMutacion + 1}</td>`
            body += `<td>${sujeto.hijoMutado}</td>`
            body += `<td>${sujeto.hijoResultante}</td>`
            body += `<td>${sujeto.hijoPenalizado}</td>`
            body += `</tr>`
            poblaciones.push(sujeto.hijoPenalizado)

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
        </tr>`
        tabs += `
        <a class="nav-link ${index == 0 ? 'active' : ''}" id="tab-${index}" data-toggle="pill"
        href="#panel-${index}" role="tab" aria-controls="tab-${index}"
        aria-selected="true">
            Iteracioń ${index + 1}
        </a>`
        tabPanes += `
        <div class="tab-pane fade ${index == 0 ? 'show active' : ''} border-secondary" id="panel-${index}"
            role="tabpanel" aria-labelledby="panel-${index}">
            <h3>Generación no. ${index + 1}</h3>
            <table class="table table-bordered table-dark table-responsive table-hover">
                <thead>
                    <tr>
                        <th scope="col"># Individuo</th>
                        <th scope="col">Población inicial</th>
                        <th scope="col">Cromosoma</th>
                        <th scope="col">F(x)</th>
                        <th scope="col">Fitness</th>
                        <th scope="col">% Acumulado</th>
                        <th scope="col">Ruleta</th>
                        <th scope="col">Mejores padres</th>
                        <th scope="col">Cromosoma</th>
                        <th scope="col">Cruce de puntos en N</th>
                        <th scope="col">Hijos</th>
                        <th scope="col">Bit de mutación</th>
                        <th scope="col">Mutado</th>
                        <th scope="col">Hijo resultante</th>
                        <th scope="col">Hijos con penalización</th>
                    </tr>
                </thead>
                <tbody class="text-center" id="tableBodyAlgoritmoGenenetico${index}">${body}</tbody>
                <tfoot id="tableFooterAlgoritmoGenetico${index}">${footer}</tfoot>
            </table> 
        </div>`


    }
    tabsIteraciones.empty()
    tabsIteraciones.append(tabs)
    contenedorTabs.empty();
    contenedorTabs.append(tabPanes);



}

const ejecutarAlgoritmo = (cntSujetos, cntIteraciones, min, max, funcion) => {




}


