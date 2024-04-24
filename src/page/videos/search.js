if (context == "home" || !context) {
    const searchVideos = async (profileId, searchText) => {
        try {
            const query = `
            query {
                searchVideos(profileId: "${profileId}", searchText: "${searchText}") {
                    _id
                    name
                    url
                    description
                }
            }
        `;

            const response = await axios.post(QUERYS_URL, { query }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${TOKEN}`
                }
            });

            if (response.data.errors) {
                throw new Error(response.data.errors[0].message);
            }

            const videos = response.data.data.searchVideos;
            return modifyPlaylist(videos);
        } catch (error) {
            throw error;
        }
    };


    document.getElementById('button-addon2').addEventListener('click', async () => {
        const profileId = document.getElementById('button-addon2').getAttribute('data-profile');
        const searchText = document.getElementById('search-input').value.trim();

        container.innerHTML = "";
        renderHeader("Resultados para " + searchText);

        try {
            const playlist = await searchVideos(profileId, searchText);

            if (playlist == "") {
                document.getElementById("message").style.display = 'block';
                document.getElementById("message").textContent = "No se encontraron resultados.";
            }
            renderPlaylist(playlist);

        } catch (error) {
            document.getElementById("message").style.display = 'block';
            document.getElementById("message").textContent = "No se encontraron resultados.";
        }
    });
}