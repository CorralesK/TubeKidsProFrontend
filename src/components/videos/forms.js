/**
 * Generates and appends the video form to the container.
 */
const renderFormVideo = () => {
    const section = document.createElement('div');
    section.className = "row justify-content-center align-items-center mt-5";

    const div = document.createElement('div');
    div.className = "col-md-6";

    const formVideo = document.createElement('form');
    formVideo.id = "video-form";

    //Create section of video name
    const sectionName = document.createElement('div');
    sectionName.className = "mb-3";

    const labelName = document.createElement('label');
    labelName.setAttribute("for", "name");
    labelName.className = "form-label";
    labelName.innerText = "Nombre";

    sectionName.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.className = "form-control bg-transparent text-light";
    inputName.placeholder = "Ingrese el nombre del video";
    inputName.required = true;
    inputName.id = "name";

    sectionName.appendChild(inputName);
    formVideo.appendChild(sectionName);

    //Create section of video url
    const sectionURL = document.createElement('div');
    sectionURL.className = "mb-3";

    const labelURL = document.createElement('label');
    labelURL.setAttribute("for", "url");
    labelURL.classURL = "form-label";
    labelURL.innerText = "URL";

    sectionURL.appendChild(labelURL);

    const inputURL = document.createElement('input');
    inputURL.type = "url";
    inputURL.className = "form-control bg-transparent text-light";
    inputURL.placeholder = "Ingrese la url del video";
    inputURL.required = true;
    inputURL.id = "url";

    sectionURL.appendChild(inputURL);

    //Menssage error
    const messageError = document.createElement('p');
    messageError.className = "text-danger";
    messageError.style.display = "none";
    messageError.id = "urlError";
    messageError.innerText = "Solo se permiten URL de YouTube.";
    sectionURL.appendChild(messageError);

    formVideo.appendChild(sectionURL);

    //Create section of video description
    const sectionDescription = document.createElement('div');
    sectionDescription.className = "mb-3";

    const labelDescription = document.createElement('label');
    labelDescription.setAttribute("for", "description");
    labelDescription.className = "form-label";
    labelDescription.innerText = "Descripción";

    sectionDescription.appendChild(labelDescription);

    const inputDescription = document.createElement('textarea');
    inputDescription.className = "form-control bg-transparent text-light";
    inputDescription.placeholder = "Ingrese la descripción del video";
    inputDescription.required = true;
    inputDescription.id = "description";

    sectionDescription.appendChild(inputDescription);
    formVideo.appendChild(sectionDescription);

    //Create the button of cancel and redirect to playlist page
    const btnCancel = document.createElement('a');
    btnCancel.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=v&key=" + getKey();
    btnCancel.className = "btn btn-outline-secondary me-2";
    btnCancel.type = "button";
    btnCancel.innerText = "Volver";
    formVideo.appendChild(btnCancel);

    //Create the button of submit and add it to the form
    const btnAddVideo = document.createElement('button');
    btnAddVideo.type = "submit";
    btnAddVideo.className = "btn btn-outline-success";
    btnAddVideo.id = "save-btn";
    btnAddVideo.innerText = "Guardar";

    formVideo.appendChild(btnAddVideo);

    div.appendChild(formVideo);
    section.appendChild(div);

    container.appendChild(section);
}

/**
 * Pre-populates video form with provided data for editing.
 * 
 * @param {object} data Video data to load into the form.
 */
const loadVideo = (data) => {
    document.getElementById('sectionTitle').textContent = "Editar video";

    document.getElementById('name').value = data.name;
    document.getElementById('url').value = data.url;
    document.getElementById('description').value = data.description;

    document.getElementById('save-btn').setAttribute('data-id', `${data._id}`);
}