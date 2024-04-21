const URLUSER = "http://localhost:3001/api";

const countriesJSON = () => {
    return new Promise((resolve, reject) => {
        axios.get("https://restcountries.com/v3.1/all")
            .then((res) => {
                const countriesData = res.data;
                const countryNames = countriesData.map(country => country.name.common);
                countryNames.sort();
                resolve(countryNames);
            })
            .catch(error => {
                reject(error.response);
            });
    });
};


const register = (data) => {
    return new Promise((resolve, reject) => {
        
        const url = URLUSER + '/users';

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data);
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

const login = (data) => {
    return new Promise((resolve, reject) => {
        
        const url = URLUSER + "/session"

        axios({
            method: "POST",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('2FA', response.data.authCode);
                resolve(true);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

const verifyPinAdmin = (pin) => {
    return new Promise((resolve, reject) => {
        const uri = `http://localhost:3001/api/users/pin?pin=${pin}`;

        axios({
            method: 'GET',
            url: uri,
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${TOKEN}`
            }
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error.response);
            });
    });
}

const updateUserStatus = (data) => {
    return new Promise((resolve, reject) => {
        const url = URLUSER + '/users/status';

        axios({
            method: "PATCH",
            url: url,
            data: data,
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            reject(error.response);
        });
    });
}
