// Ficha medica Trabajo semana 3

document.addEventListener('DOMContentLoaded', () => {
    const medicalForm = document.getElementById('medicalForm');
    const saveBtn = document.getElementById('saveBtn');
    const clearBtn = document.getElementById('clearBtn');
    const closeBtn = document.getElementById('closeBtn');
    const searchBtn = document.getElementById('searchBtn');
    const searchRutInput = document.getElementById('searchRut');
    const rutInput = document.getElementById('rut');

    // Función para mostrar errores de validación
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.remove(); 
        }
        const newErrorDisplay = document.createElement('div');
        newErrorDisplay.className = 'error-message';
        newErrorDisplay.style.color = 'red';
        newErrorDisplay.innerText = message;
        formGroup.appendChild(newErrorDisplay);
        input.classList.add('input-error');
    };

    // Función para limpiar errores de validación
    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        if (errorDisplay) {
            errorDisplay.remove();
        }
        input.classList.remove('input-error');
    };

    // Función para validar el formulario
    const validateForm = () => {
        let isValid = true;

        // Limpiar todos los errores anteriores
        const allInputs = medicalForm.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => clearError(input));

        // Validación de Rut 
        const rut = document.getElementById('rut');
        if (!rut.value.trim()) {
            showError(rut, 'El Rut es obligatorio.');
            isValid = false;
        } else if (!/^[0-9]+-[0-9kK]$/.test(rut.value.trim())) {
            showError(rut, 'Formato de Rut inválido (ej: 12345678-9).');
            isValid = false;
        }

        // Validación de Nombres
        const nombres = document.getElementById('nombres');
        if (!nombres.value.trim()) {
            showError(nombres, 'Los Nombres son obligatorios.');
            isValid = false;
        }

        // Validación de Apellidos
        const apellidos = document.getElementById('apellidos');
        if (!apellidos.value.trim()) {
            showError(apellidos, 'Los Apellidos son obligatorios.');
            isValid = false;
        }

        // Validación de Dirección
        const direccion = document.getElementById('direccion');
        if (!direccion.value.trim()) {
            showError(direccion, 'La Dirección es obligatoria.');
            isValid = false;
        }

        // Validación de Ciudad
        const ciudad = document.getElementById('ciudad');
        if (!ciudad.value.trim()) {
            showError(ciudad, 'La Ciudad es obligatoria.');
            isValid = false;
        }

        // Validación de Teléfono 
        const telefono = document.getElementById('telefono');
        if (!telefono.value.trim()) {
            showError(telefono, 'El Teléfono es obligatorio.');
            isValid = false;
        } else if (!/^[0-9]{9}$/.test(telefono.value.trim())) {
            showError(telefono, 'Formato de Teléfono inválido (ej: 912345678).');
            isValid = false;
        }

        // Validación de Email
        const email = document.getElementById('email');
        if (!email.value.trim()) {
            showError(email, 'El Email es obligatorio.');
            isValid = false;
        } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email.value.trim())) {
            showError(email, 'Formato de Email inválido.');
            isValid = false;
        }

        // Validación de Fecha de Nacimiento
        const fechaNacimiento = document.getElementById('fechaNacimiento');
        if (!fechaNacimiento.value) {
            showError(fechaNacimiento, 'La Fecha de Nacimiento es obligatoria.');
            isValid = false;
        }

        // Validación de Estado Civil
        const estadoCivil = document.getElementById('estadoCivil');
        if (!estadoCivil.value) {
            showError(estadoCivil, 'El Estado Civil es obligatorio.');
            isValid = false;
        }

        return isValid;
    };

    // Función para limpiar el formulario
    const clearForm = () => {
        medicalForm.reset();
    };

    // Función para cerrar la ventana (solo funciona en pestañas abiertas por script)
    const closeWindow = () => {
        window.close();
    };

    // Función para cargar datos del formulario por Rut
    const loadData = (rut) => {
        const data = localStorage.getItem(rut);
        if (data) {
            const medicalRecord = JSON.parse(data);
            for (const key in medicalRecord) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = medicalRecord[key];
                }
            }
            return true;
        }
        return false;
    };

    // Función para guardar los datos
    const saveData = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            alert('Por favor, corrija los errores en el formulario.');
            return;
        }

        const formData = new FormData(medicalForm);
        const medicalRecord = {};
        formData.forEach((value, key) => {
            medicalRecord[key] = value;
        });

        const rut = medicalRecord.rut.trim();

        if (localStorage.getItem(rut)) {
            if (!confirm('Ya existe un registro con este Rut. ¿Desea sobrescribirlo?')) {
                return;
            }
        }

        localStorage.setItem(rut, JSON.stringify(medicalRecord));
        alert('Ficha médica guardada exitosamente!');
        clearForm();
    };

    // Función para buscar por Rut
    const searchByRut = () => {
        const rutToSearch = searchRutInput.value.trim();
        if (rutToSearch) {
            if (loadData(rutToSearch)) {
                alert('Ficha médica cargada.');
            } else {
                alert('No se encontró ningún registro para el Rut proporcionado.');
                clearForm();
            }
        } else {
            alert('Por favor, ingrese un Rut para buscar.');
        }
    };

    // Asignar eventos a los botones
    medicalForm.addEventListener('submit', saveData);
    clearBtn.addEventListener('click', clearForm);
    closeBtn.addEventListener('click', closeWindow);
    searchBtn.addEventListener('click', searchByRut);


});
