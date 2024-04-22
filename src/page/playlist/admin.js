// Playlist manager page
if (context == "admin") {
    /**
     * Displays the user's playlist.
     */
    const showPlaylists = async () => {
        container.innerHTML = "";
        renderNavManager();
        renderHeader("Playlists");
        renderAddButton("http://127.0.0.1:5500/html/videos/playlists.html?c=f");

        await getAll()
            .then(playlists => {

                renderPlaylists(playlists);
                const lists = document.querySelectorAll('.card-playlist');
                lists.forEach(cardList => {
                    const buttons = renderEditDeleteButtons(cardList.getAttribute('data-playlist-id'));
                    cardList.appendChild(buttons);

                    const cardLink = cardList.querySelector('.card-link');
                    if (cardLink) {
                        cardLink.href += "&c=v";
                    }
                });

                if (playlists == "") {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay playlists registradas para esta cuenta";
                }
            })
            .catch(error => {
                document.getElementById("message").style.display = 'block';
                document.getElementById("message").textContent = "No hay playlists registradas para esta cuenta";
            });
    }

    showPlaylists();
}

/**
 * Redirects user to playlist edit form with provided ID.
 * 
 * @param {string} id Playlist ID for editing.
 */
const redirectEdit = (id) => {
    document.location.href = "http://127.0.0.1:5500/html/videos/playlists.html?c=f&id=" + id;
}

/**
 * Deletes a playlist and displays a success or error message.
 * 
 * @param {string} id ID of the playlist to delete.
 */
const deleteElement = async (id) => {
    await deletePlaylist(id).then(() => {
        location.reload();
        errorContainer.innerHTML = '<div class="alert text-success"> Se ha eliminado la playlist correctamente. </div>';
    }).catch((err) => {
        if (err.response.status == 404) {
            errorContainer.innerHTML = '<div class="alert text-danger"> No se ha encontrado la playlist. Vuelva a intentarlo más tarde. </div>';
        }
        if (err.response.status == 422) {
            errorContainer.innerHTML = '<div class="alert text-danger"> Ha ocurrido un error al intentar eliminar la playlist. Vuelva a intentarlo más tarde. </div>';
        }
        errorContainer.innerHTML = '<div class="alert text-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
    });
}