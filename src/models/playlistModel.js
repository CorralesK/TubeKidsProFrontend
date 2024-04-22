const REST_URL_PLAYLIST = "http://localhost:3001/api/playlists";

/**
 * 
 * @param {string} url 
 * @returns Objet
 */
const modifyPlaylist = (playlist) => {
    playlist.forEach(video => {
        // Extraer el ID del video de la URL de YouTube
        let videoId = video.url.split('v=')[1];
        let ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }

        video.url = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&loop=1&playlist=' + videoId;
        video.img = 'http://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    });

    return playlist;
}


/**
 * Fetch data of a playlist by its ID.
 * @param {string} id - Playlist ID to fetch playlist data.
 * @returns {Promise} - Promise object represents the playlist data.
 */
const getPlaylist = (id) => {
    return new Promise((resolve, reject) => {
        const query = `query {
            playlist (id: "${id}") {
                _id
                name
                profiles {
                    _id
                    name
                }
            }
        }`;

        axios({
            method: "POST",
            url: QUERYS_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            data: {
                query,
            }
        })
            .then(response => {
                resolve(response.data.data.playlist);
            })
            .catch((error) => {
                reject(error.response);
            });
    });
}

/**
 * Fetch playlists associated with a profile.
 * @param {string} profileId - Profile ID to fetch playlists.
 * @returns {Promise} - Promise object represents the playlists data.
 */
const getByProfile = (profileId) => {
    return new Promise((resolve, reject) => {
        const query = `query {
            playlistByProfile (profileId: "${profileId}") {
                _id
                name
                videos {
                    _id
                    url
                }
                totalVideos
            }
        }`;

        axios({
            method: "POST",
            url: QUERYS_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            data: {
                query,
            }
        })
            .then(response => {
                const playlists = response.data.data.playlistByProfile.map(playlist => {
                    playlist.videos = modifyPlaylist(playlist.videos);
                    return playlist;
                });
                resolve(playlists);
            })
            .catch((error) => {
                reject(error.response);
            });
    });
}

/**
 * Fetch all playlists.
 * @returns {Promise} - Promise object represents all playlists data.
 */
const getAll = () => {
    return new Promise((resolve, reject) => {
        const query = `query {
            allPlaylists {
                _id
                name
                videos {
                    _id
                    url
                }
                totalVideos
            }
        }`;

        axios({
            method: "POST",
            url: QUERYS_URL,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${TOKEN}`
            },
            data: {
                query,
            }
        })
            .then(response => {
                const playlists = response.data.data.allPlaylists.map(playlist => {
                    playlist.videos = modifyPlaylist(playlist.videos);
                    return playlist;
                });
                resolve(playlists);
            })
            .catch((error) => {
                reject(error.response);
            });
    });
}


/**
 * Save or update a playlist on the server.
 * @param {Object} data - Playlist data to be saved or updated.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const savePlaylist = (data) => {
    return new Promise((resolve, reject) => {
        let method = 'POST';
        let url;

        if (data.id) {
            method = 'PATCH';
            url = `${REST_URL_PLAYLIST}?_id=${data.id}`;
        }

        axios({
            method: method,
            url: url,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                "authorization": `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

/**
 * Delete a playlist from the server.
 * @param {string} id - ID of the playlist to be deleted.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const deletePlaylist = (id) => {
    return new Promise((resolve, reject) => {
        const url = `${REST_URL_PLAYLIST}?_id=${id}`;

        axios({
            method: "DELETE",
            url: url,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}