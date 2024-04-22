/**
 * Renders a list of playlists in a given container.
 * @param {Object[]} playlists - Array of playlists to render.
 */
const renderPlaylists = (playlists) => {
    // Create a section element to contain playlist
    const section = document.createElement('div');
    section.className = "row justify-content-start align-items-center pt-4 mt-4";

    // Create elements for each playlist
    playlists.forEach(playlist => {
        // Create elements
        const div = document.createElement('div');
        div.className = "col-md-4 col-sm-4 pb-2 mt-5";

        const card = document.createElement('div');
        card.className = "card bg-transparent text-light card-playlist";
        card.setAttribute("data-playlist-id", playlist._id);

        const link = document.createElement('a');
        link.href = `http://127.0.0.1:5500/html/videos/playlist.html?key=${playlist._id}`;
        link.className = 'btn-dark text-decoration-none card-link';

        const img = document.createElement('img');
        img.src = playlist.videos.length > 0 ? playlist.videos[0].img : '	https://for-virtuoverse.s3.amazonaws.com/resources/1584104341548_l3rnkl_defaultPlaylist.jpg';
        img.alt = "Thumbnail of the first video";
        img.className = 'card-img-top';
        img.height = '180';

        link.appendChild(img);

        const namePlaylist = document.createElement('h2');
        namePlaylist.className = "card-title nav-link mt-2 mb-3 px-2 link-light";
        namePlaylist.textContent = playlist.name;
        namePlaylist.style.fontWeight = "bold";


        const totalVideos = document.createElement('p');
        totalVideos.className = "card-text nav-link mt-2 mb-3 px-2 link-light";
        totalVideos.textContent = `${playlist.videos.length} videos`;

        link.appendChild(namePlaylist);
        link.appendChild(totalVideos);
        card.appendChild(link);
        div.appendChild(card);

        section.appendChild(div);
    });

    container.appendChild(section);
}