/**
 * Generates and appends the playlist form to the container.
 * @param {Object[]} profiles - Array of profiles to populate the profiles select menu.
 */
const renderFormPlaylist = (profiles) => {
    const section = document.createElement('div');
    section.className = "row justify-content-center align-items-center mt-5";

    const div = document.createElement('div');
    div.className = "col-md-6";

    const formPlaylist = document.createElement('form');
    formPlaylist.id = "playlist-form";

    //Create section of playlist name
    const sectionName = document.createElement('div');
    sectionName.className = "mb-3";

    const labelName = document.createElement('label');
    labelName.setAttribute("for", "name");
    labelName.className = "form-label";
    labelName.innerText = "Nombre de la Playlist";

    sectionName.appendChild(labelName);

    const inputName = document.createElement('input');
    inputName.type = "text";
    inputName.className = "form-control bg-transparent text-light";
    inputName.placeholder = "Ingrese el nombre de la playlist";
    inputName.required = true;
    inputName.id = "name";

    sectionName.appendChild(inputName);
    formPlaylist.appendChild(sectionName);

    //Create section of profiles selection
    const sectionProfiles = document.createElement('div');
    sectionProfiles.className = "mb-3";

    const labelProfiles = document.createElement('label');
    labelProfiles.className = "form-label";
    labelProfiles.innerText = "Perfiles con acceso";

    sectionProfiles.appendChild(labelProfiles);

    // Create checkboxes for each profile
    profiles.forEach(profile => {
        const checkboxContainer = document.createElement('div');
        checkboxContainer.className = "form-check";

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.className = "form-check-input";
        checkbox.value = profile._id;
        checkbox.id = `profile_${profile._id}`; // Unique ID for each checkbox

        const label = document.createElement('label');
        label.className = "form-check-label";
        label.setAttribute("for", `profile_${profile._id}`);
        label.innerText = profile.name;

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        sectionProfiles.appendChild(checkboxContainer);
    });

    //Menssage error
    const  messageError = document.createElement('p');
    messageError.className = "text-danger";
    messageError.style.display="none";
    messageError.id ="profilesError"
    messageError.innerText = "Debe seleccionar al menos un perfil";
    sectionProfiles.appendChild(messageError);

    formPlaylist.appendChild(sectionProfiles);

    //Create the button of cancel and redirect to playlist page
    const btnCancel = document.createElement('a');
    btnCancel.href = "http://127.0.0.1:5500/html/videos/playlists.html?c=admin";
    btnCancel.className = "btn btn-outline-secondary me-2";
    btnCancel.type = "button";
    btnCancel.innerText = "Volver";
    formPlaylist.appendChild(btnCancel);

    //Create the button of submit and add it to the form
    const btnAddPlaylist = document.createElement('button');
    btnAddPlaylist.type = "submit";
    btnAddPlaylist.className = "btn btn-outline-success"
    btnAddPlaylist.id = "save-btn";
    btnAddPlaylist.innerText = "Guardar";

    formPlaylist.appendChild(btnAddPlaylist);

    div.appendChild(formPlaylist);
    section.appendChild(div);

    container.appendChild(section);
}

/**
 * Pre-populates playlist form with provided data for editing.
 * 
 * @param {object} data Playlist data to load into the form.
 */
const loadPlaylist = (data) => {
    document.getElementById('sectionTitle').textContent = "Editar Playlist";

    document.getElementById('name').value = data.name;

    // Select the profiles that have access to the playlist
    const playlistProfiles = data.profiles.map(profile => profile._id);
    playlistProfiles.forEach(profileId => {
        document.getElementById(`profile_${profileId}`).checked = true;
    });

    document.getElementById('save-btn').setAttribute('data-id', `${data._id}`);
}