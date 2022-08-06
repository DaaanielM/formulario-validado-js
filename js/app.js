// Variables

const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
// Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

// Expresión regular para validar el email
const er =
	/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// EventListeners
eventListeners();
// Eventos
function eventListeners() {
	// Cuando la app arranca
	document.addEventListener('DOMContentLoaded', iniciarApp);

	// Campos del formulario
	email.addEventListener('blur', validarFormulario);
	asunto.addEventListener('blur', validarFormulario);
	mensaje.addEventListener('blur', validarFormulario);

	// Enviar email
	formulario.addEventListener('submit', enviarEmail);

	// Resetear Form
	btnReset.addEventListener('click', resetearForm);
}

// Funciones
function iniciarApp() {
	console.log('Iniciando app');
	btnEnviar.disabled = true;
	btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

// Funció para validar el formulario
function validarFormulario(e) {
	if (e.target.value.length > 0) {
		// Elimina los errores
		const eliminarError = document.querySelector('p.error');
		if (eliminarError) {
			eliminarError.remove();
		}

		e.target.classList.remove('border', 'border-red-500');
		e.target.classList.add('border', 'border-green-500');
	} else {
		e.target.classList.remove('border', 'border-green-500');
		e.target.classList.add('border', 'border-red-500');
		mostrarError('Todos los campos son obligatorios');
		//Desactivar BTN Enviar
		btnEnviar.disabled = true;
		btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
	}

	if (e.target.type === 'email') {
		// EL método test() devuelve true si el texto que se le pasa como parámetro coincide con la expresión regular.
		if (er.test(e.target.value)) {
			// Elimina los errores
			const eliminarError = document.querySelector('p.error');
			if (eliminarError) {
				eliminarError.remove();
			}
			e.target.classList.remove('border', 'border-red-500');
			e.target.classList.add('border', 'border-green-500');
		} else {
			e.target.classList.remove('border', 'border-green-500');
			e.target.classList.add('border', 'border-red-500');
			mostrarError('Email no válido');
		}
	}
	// Activa el boton de enviar
	if (
		email.value.length > 0 &&
		asunto.value.length > 0 &&
		mensaje.value.length > 0
	) {
		//Activar BTN Enviar
		btnEnviar.disabled = false;
		btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
	}
}

function mostrarError(mensaje) {
	const msgError = document.createElement('p');
	msgError.textContent = mensaje;
	// le agregamos estilos de taiwind
	msgError.classList.add(
		'border',
		'border-red-500',
		'background-red-100',
		'text-red-500',
		'p-3',
		'mt-5',
		'text-center',
		'error'
	);
	// errores para que no se repita el error en el formulario
	// Se usa querySelectorAll para poder usar el meotodo length
	const errores = document.querySelectorAll('.error');
	if (errores.length === 0) {
		//appendChild para agregar un hijo al padre
		formulario.appendChild(msgError);
	}
}

// Enviar email
function enviarEmail(e) {
	e.preventDefault();

	// Mostrar el spinner para indicar que se está enviando el email
	const spinner = document.querySelector('#spinner');
	spinner.style.display = 'flex';

	// Despues de 3 segundos se oculta el spinner
	setTimeout(() => {
		spinner.style.display = 'none';
		// Mensaje de envio existoso
		const parrafo = document.createElement('p');
		parrafo.textContent = 'El mensaje se envio exitosamente';
		parrafo.classList.add(
			'text-center',
			'p-2',
			'bg-green-500',
			'my-10',
			'text-white'
		);
		// Insertar el parrafo antes del spinner
		formulario.insertBefore(parrafo, spinner);
		setTimeout(() => {
			parrafo.remove();
			resetearForm();
		}, 2000);
	}, 3000);
}

function resetearForm() {
	eliminarColores(email, asunto, mensaje);
	formulario.reset();
	iniciarApp();
}

function eliminarColores(email, asunto, mensaje) {
	const claseGreen = 'border-green-500';
	const claseRed = 'border-red-500';
	email.classList.remove(claseGreen, claseRed);
	asunto.classList.remove(claseGreen, claseRed);
	mensaje.classList.remove(claseGreen, claseRed);

	const error = document.querySelector('p.error');
	if (error) {
		error.remove();
	}
}
