// Videos manager page
if (context == "v") {
    /**
     * Displays the user's video playlist.
     */
    const showVideos = async () => {
        container.innerHTML = "";
        renderNavManager();

        await getAllVideos(getKey())
            .then(playlist => {
                renderHeader("Playlist " + playlist.name);
                renderAddButton("http://127.0.0.1:5500/html/videos/playlist.html?c=f&key=" + getKey());

                renderPlaylist(playlist.videos);
                const videos = document.querySelectorAll('.card-video');
                videos.forEach(cardVideo => {
                    const buttons = renderEditDeleteButtons(cardVideo.getAttribute('data-video-id'));
                    cardVideo.appendChild(buttons.cloneNode(true));
                });

                if (playlist == "") {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay videos registrados para esta cuenta";
                }
            })
            .catch(error => {
                document.getElementById("message").style.display = 'block';
                document.getElementById("message").textContent = "No hay videos registrados para esta cuenta";
            });
    }

    showVideos();
}

/**
 * Redirects user to video edit form with provided ID.
 * 
 * @param {string} id Video ID for editing.
 */
const redirectEdit = (id) => {
    document.location.href = "http://127.0.0.1:5500/html/videos/playlist.html?c=f&id=" + id + "&key=" + getKey();
}

/**
 * Deletes a video and displays a success or error message.
 * 
 * @param {string} videoId ID of the video to delete.
 */
const deleteElement = async (videoId) => {
    await deleteVideo(videoId).then(() => {
        location.reload();
        errorContainer.innerHTML = '<div class="alert text-success"> Se ha eliminado el video correctamente. </div>';
    }).catch((err) => {
        if (err.response.status == 404) {
            errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado el video. Vuelva a intentarlo más tarde. </div>';
        }
        if (err.response.status == 422) {
            errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al intentar eliminar el video. Vuelva a intentarlo más tarde. </div>';
        }
        errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
    });
}