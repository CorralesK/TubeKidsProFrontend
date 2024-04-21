// Playlist Page
if (context === "p") {
    /**
     * Fetches and displays user playlist.
     *  - Clears container, renders header.
     *  - Renders playlist on success, error messages otherwise.
     */
    const showPlalist = async () => {
        container.innerHTML = "";
        renderHeader("Bienvenido!");

        await get()
            .then(playlist => {
                renderPlaylist(playlist);
            })
            .catch(error => {
                if (error.status == 404) {
                    document.getElementById("message").style.display = 'block';
                    document.getElementById("message").textContent = "No hay videos registrados para esta cuenta";
                } else {
                    console.log(error)
                    errorContainer.innerHTML = '<div class="alert alert-danger"> Algo ha salido mal. Vuelva a intentarlo más tarde. </div>';
                }
            });
    }
    showPlalist();
}