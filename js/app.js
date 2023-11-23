const container = document.querySelector( '.container' );
const resultado = document.querySelector( '#resultado' );
const formulario = document.querySelector( '#formulario' );

window.addEventListener( 'load', () => {
    formulario.addEventListener( 'submit', buscarClima );
} )

function buscarClima( e ) {
    e.preventDefault();

    // Validar
    const ciudad = document.querySelector( '#ciudad' ).value;
    const pais = document.querySelector( '#pais' ).value;

    if ( ciudad === '' || pais === '' ) {
        // Hubo un error
        mostrarError( 'Ambos Campos Son Obligatorios' );
        return;
    }

    // Consultar la API
    consultarAPI( ciudad, pais );
}

function mostrarError( mensaje ) {
    // Crear una alerta
    const alerta = document.querySelector( 'bg-red-100' );

    if ( !alerta ) {
        // Crear una alerta
        const alerta = document.createElement( 'DIV' );
        alerta.classList.add( 'bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center' );

        alerta.innerHTML = `
            <strong class="font-bold">Error !</strong>
            <span class="block">${mensaje}</span>
            `;

        container.appendChild( alerta );
        setTimeout( () => {
            alerta.remove();
        }, 1000 );
    }
}

function consultarAPI( ciudad, pais ) {
    const appId = '0bf3edece8faa2d493e2571528d682dc';
    const url = ` https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId} `;

    spinner(); // Muestra un spinner de carga
    setTimeout( () => {
        fetch( url )
            .then( respuesta => respuesta.json() )
            .then( datos => {
                limpiarHtml(); // Limpiar el HTML

                if ( datos.cod === "404" ) {
                    mostrarError( 'Ciudad NO Encontrada' );
                    return;
                }

                // Imprime la respuesta en el HTML
                mostrarClima( datos );
            } )
    }, 500 );
}

function mostrarClima( datos ) {

    const { name, main: { temp, temp_max, temp_min } } = datos;
    const centigrados = kelvinACentigrados( temp );
    const max = kelvinACentigrados( temp_max );
    const min = kelvinACentigrados( temp_min );
    const nombreCiudad = document.createElement( 'P' );
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add( 'font-bold', 'text-4xl' );

    const actual = document.createElement( 'P' );
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add( 'font-bold', 'text-3xl' );

    const tempMax = document.createElement( 'P' );
    tempMax.innerHTML = `Max : ${max} &#8451;`;
    tempMax.classList.add( 'text-xl' );

    const tempMin = document.createElement( 'P' );
    tempMin.innerHTML = `Min : ${min} &#8451;`;
    tempMin.classList.add( 'text-xl' );

    const resultadoDiv = document.createElement( 'DIV' );
    resultadoDiv.classList.add( 'text-center', 'text-white' );

    resultadoDiv.appendChild( nombreCiudad );
    resultadoDiv.appendChild( actual );
    resultadoDiv.appendChild( tempMax );
    resultadoDiv.appendChild( tempMin );

    resultado.appendChild( resultadoDiv );
}

// Convertir grados Kelvin a grados Centígrados
const kelvinACentigrados = grados => parseInt( grados - 273.15 );

// Limpiar el HTML
function limpiarHtml() {
    while ( resultado.firstChild ) {
        resultado.removeChild( resultado.firstChild );
    }
}

function spinner() {
    limpiarHtml();
    const divSpinner = document.createElement( 'DIV' );
    divSpinner.classList.add( 'sk-fading-circle' );

    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
    `;
    resultado.appendChild( divSpinner );
}


