// Crear el mapa y establecer su vista inicial
var map = L.map('map').setView([4.617, -74.159], 15); // Coordenadas centradas en tu barrio

// Agregar el tile layer de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Coordenadas de los puntos del polígono (esto es solo un ejemplo, cámbialo por las de tu barrio)
var barrioCoordinates = [
    [4.616049169553926, -74.15978244808056],
    [4.618223845595093, -74.16023538576283],  // Vértice 2  
    [4.619947049037614, -74.16106470827074],  // Vértice 2
    [4.620582916432409, -74.15999934781738],  // Vértice 3
    [4.619482865509097, -74.15866605239574],  // Vértice 4
    [4.6197880821213175, -74.15672671360066], // Vértice 5
    [4.616672323031281, -74.15619084367044]   // Vértice 6
];

// Crear el polígono usando las coordenadas
var barrioPolygon = L.polygon(barrioCoordinates, {
    color: 'blue',       // Color del borde del polígono
    fillColor: 'blue',   // Color de relleno
    fillOpacity: 0.3     // Opacidad del relleno
}).addTo(map);

// Opcional: Agregar un popup al polígono
barrioPolygon.bindPopup("¡Este es el polígono de mi barrio!").openPopup();

// Datos de ejemplo de los puntos donde están los árboles
// Puedes reemplazar estas coordenadas con los datos reales que tengas
// Datos de ejemplo de los puntos donde están los árboles
var arboles = [
    [4.6166726295575575, -74.15919124497708],  // Árbol 1
    [4.616677125841656, -74.15910102658759],  // Árbol 2
    [4.616681622125744, -74.1590108081981],   // Árbol 3
    [4.616888451162461, -74.15904238463443],  // Árbol 4
    [4.61700535450439, -74.15905140647337],   // Árbol 5
    [4.616978376811804, -74.15924988693025],  // Árbol 6
    [4.617212183446747, -74.15911455934601],  // Árbol 7
    [4.617324590455355, -74.15917771221866],  // Árbol 8
    [4.617221176008088, -74.15939423635345],  // Árbol 9
    [4.617207687166031, -74.15945287830661],  // Árbol 10
    [4.617180709481142, -74.15956565129348],  // Árbol 11
    [4.617508937910906, -74.15773421798676],  // Árbol 12
    [4.616695110977799, -74.1585461834922],   // Árbol 13
    [4.61671759239733, -74.15831612659899],   // Árbol 14
    [4.616771547801294, -74.15826650648476],  // Árbol 15
    [4.617041324759565, -74.15728763695876],  // Árbol 16
    [4.617481960237466, -74.15764399959725],  // Árbol 17
    [4.61705031732307, -74.15727861511981],   // Árbol 18
    [4.617576382089997, -74.15741394270405],  // Árbol 19
    [4.617702277873794, -74.15711171109923],  // Árbol 20
    [4.61695673718262, -74.15743747401002],   // Árbol 21
    [4.617657195268007, -74.15714243104561],  // Árbol 22
    [4.617031595331615, -74.15737846541714],  // Árbol 23
    [4.617764135372861, -74.15708342245274],  // Árbol 24
    [4.618068914583243, -74.1577915255673],   // Árbol 25
    [4.6185757713634334, -74.15664085341378],   // Árbol 25
    [4.6185757713634334, -74.15690699766279],   // Árbol 25
    [4.617038044653116, -74.1562799798558],   // Árbol 25
    [4.617910322786821, -74.15676264823959],   // Árbol 25
    [4.616687334585749, -74.15659123329955],   // Árbol 25

];

// Función para mostrar los puntos de los árboles
function mostrarArboles() {
    // Primero, limpiamos el mapa de cualquier marcador previo
    if (window.treeMarkers) {
        window.treeMarkers.forEach(marker => {
            map.removeLayer(marker);
        });
    }
    
    // Crear un array para almacenar los marcadores de los árboles
    var treeMarkers = [];
    
    // Agregar los marcadores de los árboles en las coordenadas proporcionadas
    arboles.forEach(function(coordenada) {
        var marker = L.marker(coordenada).addTo(map)
            .bindPopup("Árbol en: " + coordenada[0].toFixed(4) + ", " + coordenada[1].toFixed(4));
        
        // Guardar los marcadores para poder eliminarlos más tarde
        treeMarkers.push(marker);
    });
    
    // Almacenar los marcadores globalmente para poder eliminarlos más tarde
    window.treeMarkers = treeMarkers;
}

// Función para medir la distancia (por ejemplo)
// Función para generar el PDF con las distancias
function generarPDFConDistancias() {
    // Crear una nueva instancia de jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del PDF
    doc.text("Distancias entre los árboles", 20, 20);

    // Calcular las distancias entre los árboles y agregar al PDF
    let yPosition = 30; // Posición inicial en el eje Y para agregar texto en el PDF
    for (let i = 0; i < arboles.length - 1; i++) {
        // Calcular la distancia entre dos árboles
        const distancia = map.distance(arboles[i], arboles[i + 1]);

        // Agregar la distancia al PDF
        doc.text(`Distancia entre Árbol ${i + 1} y Árbol ${i + 2}: ${distancia.toFixed(2)} metros`, 20, yPosition);
        yPosition += 10; // Mover la posición Y para el siguiente texto

        // Si el contenido se acerca al final de la página, crear una nueva página
        if (yPosition > 270) {
            doc.addPage();
            yPosition = 20; // Reseteamos la posición Y
        }
    }

    // Guardar el PDF con el nombre 'distancias_arboles.pdf'
    doc.save('distancias_arboles.pdf');
}


// Función de ejemplo para mostrar homicidios (marcadores de homicidios)
function mostrarHomicidios() {
    var homicidios = [
        [4.6170, -74.1600],  // Homicidio 1
        [4.6185, -74.1590]   // Homicidio 2
    ];

    homicidios.forEach(function(coordenada) {
        L.marker(coordenada).addTo(map)
            .bindPopup("Homicidio en: " + coordenada[0].toFixed(4) + ", " + coordenada[1].toFixed(4));
    });
}

// Asociar las acciones de los botones
document.getElementById('btn-arboles').addEventListener('click', mostrarArboles);
document.getElementById('btn-distancia').addEventListener('click', generarPDFConDistancias);
document.getElementById('btn-homicidios').addEventListener('click', mostrarHomicidios);
