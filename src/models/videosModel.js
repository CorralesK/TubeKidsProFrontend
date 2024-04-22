const REST_URL = "http://localhost:3001/api/videos";
const QUERYS_URL = "http://localhost:4000/api/graphql";
const TOKEN = sessionStorage.getItem("token");

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

        video.url = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&loop=1';
        video.img = 'http://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg';
    });

    return playlist;
}

/**
 * Fetch one video from the server.
 * @param {string} id - Video ID to fetch a specific video.
 * @returns {Promise} - Promise object represents the video data.
 */
const getVideo = (id) => {
    return new Promise((resolve, reject) => {
        const query = `query {
            video (id: "${id}") {
                _id
                name
                url
                description
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
                resolve(response.data.data.video);
            })
            .catch((error) => {
                reject(error.response);
            });
    });
}

/**
 * Fetch all videos from the server.
 * @param {string} id - Playlist ID to fetch all video of this playlist.
 * @returns {Promise} - Promise object represents the videos data.
 */
const getAllVideos = (id) => {
    return new Promise((resolve, reject) => {
        const query = `query {
            playlist (id: "${id}") {
                _id
                name
                videos {
                    _id
                    name
                    url
                    description
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
                response.data.data.playlist.videos = modifyPlaylist(response.data.data.playlist.videos)
                resolve(response.data.data.playlist);
            })
            .catch((error) => {
                reject(error.response);
            });
    });
}

/**
 * Save or update a video on the server.
 * @param {Object} data - video data to be saved or updated.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const saveVideo = (data) => {
    return new Promise((resolve, reject) => {
        let method = 'POST';
        let url = REST_URL;

        if (data.id) {
            method = 'PATCH';
            url += `?_id=${data.id}`;
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
 * Delete a video from the server.
 * @param {string} id - ID of the video to be deleted.
 * @returns {Promise} - Promise object represents the success of the operation.
 */
const deleteVideo = (id) => {
    return new Promise((resolve, reject) => {
        const url = `${REST_URL}?_id=${id}`;

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