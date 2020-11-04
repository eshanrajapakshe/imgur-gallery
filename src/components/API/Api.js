import axios from 'axios';

const baseURL = 'https://api.imgur.com/3/gallery/';
const clientID = 'b07bad9fcc1b680';

// Get All Data
export const getGalleryData = async (onSuccess, onError) => {
    let config = {
        method: 'get',
        url: baseURL + 'hot/top/week/1',
        headers: {
            'Authorization': `Client-ID ${clientID}`
        }
    };

    await axios(config)
        .then(response => {
            if (response.status === 200) {
                onSuccess(response.data.data)
            } else {
                onError("Data Not Available!");
            }
        })
        .catch(function (error) {
            onError(error)
        });
}

// Get Searched Results
export const fetchSearchResults = async (query, onSuccess, onError) => {
    let tokenCancel = '';

    const searchUrl = baseURL + `search/top/1?q_exactly=${query}`;

    if (tokenCancel) {
        tokenCancel.cancel();
    }

    tokenCancel = axios.CancelToken.source();

    let config = {
        method: 'get',
        url: searchUrl,
        headers: {
            'Authorization': `Client-ID ${clientID}`
        }
    };

    axios(config, {
        cancelToken: tokenCancel.token
    })
        .then(function (response) {
            if (response.status === 200) {
                onSuccess(response.data.data)
            } else {
                onError("Data Not Available!");
            }
        })
        .catch(function (error) {
            onError(error);
        });
};