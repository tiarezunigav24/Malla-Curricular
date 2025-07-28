document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos referencias a los elementos del DOM
    const curriculumContainer = document.getElementById('curriculumContainer');
    const requisitosMensaje = document.getElementById('requisitos-mensaje');

    // Definición de la malla curricular con todos los ramos y sus prerrequisitos
    // Los IDs deben ser únicos y consistentes.
    const mallaCurricular = {
        1: [
            { id: 'formacion-ciudadana', nombre: 'Formación Ciudadana', requisitos: [] },
            { id: 'almacenamiento-inventario-i', nombre: 'Almacenamiento e Inventario', requisitos: [] },
            { id: 'principios-logistica-integral', nombre: 'Principios de Logística Integral', requisitos: [] },
            { id: 'practicas-seguras-logistica', nombre: 'Prácticas Seguras en Operaciones Logísticas', requisitos: [] },
            { id: 'resolucion-problemas-algebra', nombre: 'Resolución de Problemas en Álgebra', requisitos: [] }
        ],
        2: [
            { id: 'administracion', nombre: 'Administración', requisitos: [] },
            { id: 'administracion-almacenamiento-inventarios', nombre: 'Administración de Almacenamiento e Inventarios', requisitos: ['almacenamiento-inventario-i'] },
            { id: 'legislacion-logistica', nombre: 'Legislación Aplicada a la Logística', requisitos: [] },
            { id: 'costos-logistica', nombre: 'Costos Aplicados a la Logística', requisitos: [] },
            { id: 'transporte-distribucion-i', nombre: 'Transporte y Distribución', requisitos: [] },
            { id: 'funciones-geometria', nombre: 'Funciones y Geometría', requisitos: ['resolucion-problemas-algebra'] }
        ],
        3: [
            { id: 'ingles-inicial', nombre: 'Inglés Inicial', requisitos: [] },
            { id: 'logistica-abastecimiento-compras', nombre: 'Logística de Abastecimiento y Compras', requisitos: ['principios-logistica-integral', 'administracion-almacenamiento-inventarios'] },
            { id: 'calidad-logistica-inversa-sustentabilidad', nombre: 'Calidad, Logística Inversa y Sustentabilidad', requisitos: ['principios-logistica-integral'] },
            { id: 'electivo-tendencias-i', nombre: 'Electivo de Tendencias del Sector Productivo y Servicios I', requisitos: [] },
            { id: 'sistemas-informacion-gestion-logistica', nombre: 'Sistemas de Información para la Gestión Logística', requisitos: ['administracion'] },
            { id: 'administracion-transporte-distribucion', nombre: 'Administración de Transporte y Distribución', requisitos: ['transporte-distribucion-i'] }
        ],
        4: [
            { id: 'creacion-empresas', nombre: 'Creación de Empresas', requisitos: ['administracion'] },
            { id: 'electivo-tendencias-ii', nombre: 'Electivo de Tendencias del Sector Productivo y Servicios II', requisitos: ['electivo-tendencias-i'] },
            { id: 'estrategias-comunicacion-logistica', nombre: 'Estrategias de Comunicación en la Logística', requisitos: [] },
            { id: 'proyecto-integrado', nombre: 'Proyecto Integrado', requisitos: ['logistica-abastecimiento-compras', 'administracion-transporte-distribucion'] },
            { id: 'supervision-operaciones-logisticas', nombre: 'Supervisión de Operaciones Logísticas', requisitos: ['calidad-logistica-inversa-sustentabilidad'] },
            { id: 'taller-sistemas-gestion', nombre: 'Taller de Sistemas de Gestión', requisitos: ['sistemas-informacion-gestion-logistica'] }
        ],
        5: [
            { id: 'gestion-personas', nombre: 'Gestión de Personas', requisitos: ['administracion'] },
            { id: 'algebra-lineal', nombre: 'Álgebra Lineal', requisitos: ['funciones-geometria'] },
            { id: 'estadistica', nombre: 'Estadística', requisitos: ['resolucion-problemas-algebra'] }, // Suponiendo que Álgebra o Resolución de Problemas es prerreq
            { id: 'innovacion-productos-servicios', nombre: 'Innovación en Productos y Servicios', requisitos: ['creacion-empresas'] },
            { id: 'economia-circular-logistica-sustentable', nombre: 'Economía Circular y Logística Sustentable', requisitos: ['calidad-logistica-inversa-sustentabilidad'] },
            { id: 'logistica-internacional', nombre: 'Logística Internacional', requisitos: ['administracion-transporte-distribucion', 'logistica-abastecimiento-compras'] }
        ],
        6: [
            { id: 'finanzas', nombre: 'Finanzas', requisitos: ['costos-logistica'] },
            { id: 'ingles-habitante', nombre: 'Inglés Habitante', requisitos: ['ingles-inicial'] },
            { id: 'gestion-cadena-suministro', nombre: 'Gestión de la Cadena de Suministro', requisitos: ['supervision-operaciones-logisticas', 'logistica-internacional'] },
            { id: 'optimizacion-logistica', nombre: 'Optimización en la Logística', requisitos: ['algebra-lineal', 'estadistica'] },
            { id: 'pronostico-planificacion-operaciones', nombre: 'Pronóstico y Planificación de las Operaciones', requisitos: ['estadistica', 'sistemas-informacion-gestion-logistica'] }
        ],
        7: [
            { id: 'formulacion-gestion-proyectos', nombre: 'Formulación y Gestión de Proyectos', requisitos: ['proyecto-integrado', 'gestion-personas'] },
            { id: 'ingles-intermedio', nombre: 'Inglés Intermedio', requisitos: ['ingles-habitante'] },
            { id: 'analisis-datos-evaluacion-operaciones', nombre: 'Análisis de Datos para la Evaluación de Operaciones Logísticas', requisitos: ['pronostico-planificacion-operaciones', 'taller-sistemas-gestion'] },
            { id: 'aseguramiento-calidad', nombre: 'Aseguramiento de la Calidad', requisitos: ['calidad-logistica-inversa-sustentabilidad'] },
            { id: 'electivo-tendencias-iii', nombre: 'Electivo de Tendencias del Sector Productivo y Servicios III', requisitos: ['electivo-tendencias-ii'] },
            { id: 'evaluacion-cadena-suministro', nombre: 'Evaluación de la Cadena de Suministro', requisitos: ['gestion-cadena-suministro'] }
        ],
        8: [
            { id: 'oportunidades-negocios-innovadores', nombre: 'Oportunidades en Negocios Innovadores', requisitos: ['innovacion-productos-servicios'] },
            { id: 'decisiones-estrategicas', nombre: 'Decisiones Estratégicas', requisitos: ['finanzas', 'gestion-cadena-suministro'] },
            { id: 'electivo-tendencias-iv', nombre: 'Electivo de Tendencias del Sector Productivo y Servicios IV', requisitos: ['electivo-tendencias-iii'] },
            { id: 'electivo-tendencias-v', nombre: 'Electivo de Tendencias del Sector Productivo y Servicios V', requisitos: ['electivo-tendencias-iv'] },
            { id: 'modelos-negocios-logistica', nombre: 'Modelos de Negocios Aplicados a la Logística', requisitos: ['creacion-empresas', 'economia-circular-logistica-sustentable'] },
            { id: 'proyecto-titulo-profesional', nombre: 'Proyecto de Título Profesional', requisitos: ['formulacion-gestion-proyectos', 'evaluacion-cadena-suministro', 'analisis-datos-evaluacion-operaciones'] }
        ]
    };

    // Objeto para almacenar el estado de aprobación de cada ramo (true/false)
    // Se inicializa con los datos guardados en localStorage o un objeto vacío si no hay.
    let curriculumState = getSavedState();

    // --- Funciones de Utilidad ---

    /**
     * Obtiene el estado guardado de los ramos desde el localStorage del navegador.
     * @returns {Object} Un objeto con los IDs de los ramos como claves y su estado (true/false) como valor.
     */
    function getSavedState() {
        const savedState = localStorage.getItem('mallaCurricularState');
        return savedState ? JSON.parse(savedState) : {};
    }

    /**
     * Guarda el estado actual de los ramos en el localStorage del navegador.
     * @param {Object} state - El objeto que contiene el estado actual de los ramos.
     */
    function saveState(state) {
        localStorage.setItem('mallaCurricularState', JSON.stringify(state));
    }

    /**
     * Verifica si un ramo específico está marcado como aprobado.
     * @param {string} ramoId - El ID del ramo a verificar.
     * @returns {boolean} True si el ramo está aprobado, false en caso contrario.
     */
    function isAprobado(ramoId) {
        return curriculumState.hasOwnProperty(ramoId) && curriculumState[ramoId];
    }

    /**
     * Verifica si todos los prerrequisitos de un ramo están aprobados.
     * @param {Object} ramo - El objeto del ramo que se está evaluando.
     * @returns {boolean} True si todos los requisitos están cumplidos, false en caso contrario.
     */
    function requisitosCumplidos(ramo) {
        // Si el ramo no tiene requisitos, siempre están cumplidos.
        if (!ramo.requisitos || ramo.requisitos.length === 0) {
            return true;
        }
        // Verifica que CADA requisito esté aprobado.
        return ramo.requisitos.every(reqId => isAprobado(reqId));
    }

    /**
     * Muestra un mensaje temporal en la interfaz indicando los ramos prerrequisitos faltantes.
     * @param {Array<string>} requisitosFaltantesIds - Array de IDs de los ramos que faltan por aprobar.
     */
    function mostrarMensajeRequisitos(requisitosFaltantesIds) {
        // Mapea los IDs de los ramos faltantes a sus nombres para mostrar un mensaje amigable.
        const nombresRequisitos = requisitosFaltantesIds.map(id => {
            // Busca el ramo en toda la malla (aplanando los semestres)
            const ramo = Object.values(mallaCurricular).flat().find(r => r.id === id);
            return ramo ? ramo.nombre : id; // Devuelve el nombre o el ID si no se encuentra
        }).join(', '); // Une los nombres con comas y un espacio

        requisitosMensaje.textContent = `Debes aprobar primero: ${nombresRequisitos}.`;
        requisitosMensaje.style.display = 'block'; // Hace visible el mensaje

        // Oculta el mensaje después de 4 segundos
        setTimeout(() => {
            requisitosMensaje.style.display = 'none';
        }, 4000);
    }

    // --- Función Principal de Renderizado ---

    /**
     * Renderiza (dibuja) la malla curricular en la página web.
     * Esto incluye crear los contenedores de semestre y los divs para cada ramo,
     * aplicando los estilos según su estado (aprobado/bloqueado).
     */
    function renderMalla() {
        curriculumContainer.innerHTML = ''; // Limpiamos el contenedor antes de re-renderizar

        // Iteramos sobre cada semestre definido en nuestra mallaCurricular
        for (const semestreNum in mallaCurricular) {
            const semestreDiv = document.createElement('div');
            semestreDiv.classList.add('semester');
            semestreDiv.innerHTML = `<h2>Semestre ${semestreNum}</h2>`;

            // Iteramos sobre cada ramo dentro del semestre actual
            mallaCurricular[semestreNum].forEach(ramo => {
                const ramoDiv = document.createElement('div');
                ramoDiv.classList.add('subject');
                ramoDiv.textContent = ramo.nombre;
                ramoDiv.dataset.ramoId = ramo.id; // Guardamos el ID del ramo en un atributo data-

                // Aplicamos las clases CSS según el estado del ramo
                if (isAprobado(ramo.id)) {
                    ramoDiv.classList.add('approved'); // Si está aprobado, aplica estilo de aprobado
                } else if (!requisitosCumplidos(ramo)) {
                    ramoDiv.classList.add('blocked'); // Si no está aprobado y requisitos NO están cumplidos, lo bloquea
                }

                // Añadimos el Event Listener para el clic en cada ramo
                ramoDiv.addEventListener('click', () => {
                    if (isAprobado(ramo.id)) {
                        // Si el ramo ya está aprobado, al hacer clic, lo desaprobamos.
                        curriculumState[ramo.id] = false;
                    } else {
                        // Si el ramo no está aprobado, verificamos los requisitos.
                        if (requisitosCumplidos(ramo)) {
                            // Si los requisitos están cumplidos, lo marcamos como aprobado.
                            curriculumState[ramo.id] = true;
                        } else {
                            // Si los requisitos NO están cumplidos, mostramos un mensaje.
                            const requisitosFaltantes = ramo.requisitos.filter(req => !isAprobado(req));
                            mostrarMensajeRequisitos(requisitosFaltantes);
                            return; // Salimos de la función sin cambiar el estado del ramo
                        }
                    }
                    saveState(curriculumState); // Guardamos el estado actualizado
                    renderMalla(); // Volvemos a renderizar la malla para actualizar la interfaz
                });

                semestreDiv.appendChild(ramoDiv); // Añadimos el ramo al div del semestre
            });
            curriculumContainer.appendChild(semestreDiv); // Añadimos el semestre al contenedor principal
        }
    }

    // --- Inicialización ---
    // Llamamos a la función renderMalla al cargar la página para mostrar la malla inicial
    renderMalla();
});
