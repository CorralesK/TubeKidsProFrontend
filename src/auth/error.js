const errorContainer = document.getElementById('error-container');
/**
 * Extracts the context identifier ('c') from the query parameters of the current URL.
 *
 * @returns {string|null} The context identifier ('c') or `null` if not found.
 */
const getContext = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    return params.get('c');
}

const context = getContext();

/**
 * Function to handle errors.
 * @param {*} err - The error object.
 */
const error = (err) => {
    switch (err.status) {
        case 400:
            errorContainer.innerHTML = '<div class="alert alert-danger">Debe completar los espacios requeridos.</div>';
            break;
        case 401:
            errorContainer.innerHTML = '<div class="alert alert-danger">Credenciales incorrectas.</div>';
            break;
        case 404:
            errorContainer.innerHTML = '<div class="alert alert-danger">El usuario no se encuentra registrado. Debe registrarse para iniciar sesión.</div>';
            break;
        case 403:
            errorContainer.innerHTML = '<div class="alert alert-danger">El usuario no está verificado o activado. Por favor, verifique su correo electrónico.</div>';
            break;
        default:
            console.error('Error:', err);
            errorContainer.innerHTML = '<div class="alert alert-danger">Algo ha salido mal. Vuelva a intentarlo más tarde.</div>';
            break;
    }
}