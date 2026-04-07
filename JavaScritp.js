// ── 1. CONTROL DEL CHECKBOX DEL MENÚ ──────────────────────────────────────────
        const menuToggle = document.getElementById('menu-toggle');
        const hamburgerLabel = document.querySelector('.hamburger');

        menuToggle.addEventListener('change', function() {
            hamburgerLabel.setAttribute('aria-expanded', this.checked);
            if (this.checked) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        document.querySelectorAll('.menu-overlay ul li a').forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                menuToggle.checked = false;
                hamburgerLabel.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
                console.log('Opción seleccionada:', this.textContent);
            });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menuToggle.checked) {
                menuToggle.checked = false;
                hamburgerLabel.setAttribute('aria-expanded', false);
                document.body.style.overflow = '';
            }
        });


        // ── 2. BOTÓN "RESERVA YA" ────────────────────────────────────────
        document.getElementById('btn-reserva').addEventListener('click', function () {
            const confirmacion = confirm('¿Deseas hacer una reserva? Te redirigiremos a la sección de contacto.');
            if (confirmacion) {
                document.getElementById('seccion-contacto').scrollIntoView({ behavior: 'smooth' });
            }
        });


        // ── 3. VALIDACIÓN DEL FORMULARIO DE CONTACTO ─────────────────────────────────
        const formContacto = document.getElementById('form-contacto');
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById('correo');
        const asuntoSelect = document.getElementById('asunto');
        const mensajeTextarea = document.getElementById('mensaje');

        // Función para validar email (debe contener @ y .)
        function validarEmail(email) {
            return email.includes('@') && email.includes('.');
        }

        // Función para limpiar errores
        function limpiarErrores() {
            const campos = ['nombre', 'correo', 'asunto', 'mensaje'];
            campos.forEach(campo => {
                const errorSpan = document.getElementById(`error-${campo}`);
                if (errorSpan) errorSpan.textContent = '';
                const inputElement = document.getElementById(campo);
                if (inputElement) inputElement.classList.remove('campo-error');
            });
        }

        // Función para mostrar error
        function mostrarError(campoId, mensaje) {
            const errorSpan = document.getElementById(`error-${campoId}`);
            if (errorSpan) {
                errorSpan.textContent = mensaje;
            }
            const inputElement = document.getElementById(campoId);
            if (inputElement) {
                inputElement.classList.add('campo-error');
            }
        }

        // Validar el formulario
        function validarFormulario() {
            let esValido = true;
            
            // Limpiar errores previos
            limpiarErrores();
            
            // Validar nombre
            const nombre = nombreInput.value.trim();
            if (nombre === '') {
                mostrarError('nombre', 'El nombre es obligatorio.');
                esValido = false;
            } else if (nombre.length < 2) {
                mostrarError('nombre', 'El nombre debe tener al menos 2 caracteres.');
                esValido = false;
            }
            
            // Validar correo
            const correo = correoInput.value.trim();
            if (correo === '') {
                mostrarError('correo', 'El correo electrónico es obligatorio.');
                esValido = false;
            } else if (!validarEmail(correo)) {
                mostrarError('correo', 'El correo electrónico debe contener "@" y "."');
                esValido = false;
            }
            
            // Validar asunto
            const asunto = asuntoSelect.value;
            if (asunto === '' || asunto === null) {
                mostrarError('asunto', 'Por favor selecciona un asunto.');
                esValido = false;
            }
            
            // Validar mensaje
            const mensaje = mensajeTextarea.value.trim();
            if (mensaje === '') {
                mostrarError('mensaje', 'El mensaje es obligatorio.');
                esValido = false;
            } else if (mensaje.length < 10) {
                mostrarError('mensaje', 'El mensaje debe tener al menos 10 caracteres.');
                esValido = false;
            }
            
            return esValido;
        }

        // Evento submit del formulario
        formContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validarFormulario()) {
                alert('¡Mensaje enviado con éxito! Nos comunicaremos contigo pronto.');
                formContacto.reset();
                limpiarErrores();
            }
        });

        // Limpiar error al escribir en los campos (opcional - mejora UX)
        nombreInput.addEventListener('input', function() {
            document.getElementById('error-nombre').textContent = '';
            this.classList.remove('campo-error');
        });
        
        correoInput.addEventListener('input', function() {
            document.getElementById('error-correo').textContent = '';
            this.classList.remove('campo-error');
        });
        
        asuntoSelect.addEventListener('change', function() {
            document.getElementById('error-asunto').textContent = '';
            this.classList.remove('campo-error');
        });
        
        mensajeTextarea.addEventListener('input', function() {
            document.getElementById('error-mensaje').textContent = '';
            this.classList.remove('campo-error');
        });


        // ── 4. TABLA INTERACTIVA ─────────────────────────────────────────
        const tablaBody = document.getElementById('tabla-body');

        document.getElementById('btn-agregar-fila').addEventListener('click', function () {
            const fila = document.createElement('tr');
            for (let i = 0; i < 5; i++) {
                const celda = document.createElement('td');
                celda.textContent = 'Nuevo texto';
                fila.appendChild(celda);
            }
            tablaBody.appendChild(fila);
        });

        document.getElementById('btn-eliminar-fila').addEventListener('click', function () {
            const filas = tablaBody.querySelectorAll('tr');
            if (filas.length > 0) {
                tablaBody.removeChild(filas[filas.length - 1]);
            } else {
                alert('No hay filas para eliminar.');
            }
        });


        // ── 5. TOGGLE TITULO 4 ──────────────────────────────────────────
                document.querySelectorAll('.toggle-titulo').forEach(function (titulo) {
            const descripcion = titulo.closest('.item-menu-texto').querySelector('.item-menu-descripcion');
            
            // Estado inicial
            if (descripcion.classList.contains('hidden')) {
                titulo.classList.add('collapsed');
            }
            
            titulo.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                
                const currentDescripcion = this.closest('.item-menu-texto').querySelector('.item-menu-descripcion');
                
                // Animación suave (opcional)
                if (currentDescripcion.classList.contains('hidden')) {
                    currentDescripcion.style.display = 'block';
                    setTimeout(() => {
                        currentDescripcion.classList.remove('hidden');
                    }, 10);
                } else {
                    currentDescripcion.classList.add('hidden');
                    setTimeout(() => {
                        currentDescripcion.style.display = '';
                    }, 300);
                }
                
                this.classList.toggle('collapsed');
            });
            
            titulo.style.cursor = 'pointer';
            titulo.style.userSelect = 'none';
        });
