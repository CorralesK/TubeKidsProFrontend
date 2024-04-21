// Login
if (!context) {

    const processStatus = async () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        const id = params.get('key');
    
        if (id) {
            const data = { id: id };
            await updateUserStatus(data).catch(err => {error(err);});
        }
    };  
    processStatus();  

    /**
     *  Event listener for user login.
     */
    document.getElementById("login-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        };

        await login(data) .catch(err => {error(err);});
    });

    document.getElementById("verification-form").addEventListener("submit", async (event) => {
        event.preventDefault();

        const pin = document.getElementById('verification-code').value;
    
        const storedPin = sessionStorage.getItem('2FA');

        if (pin === storedPin) {
            document.location.href = "http://127.0.0.1:5500/html/index.html?c=1";

        } else {
            document.getElementById('error-pin').style.display = 'block';
        }
    });
    
}