import Swal from "sweetalert2";


export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
    
    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    try {
        if (method === 'GET') {
            return fetch(url);
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
        }
    } catch (error) {
        console.log(error);
        Swal.fire('Error', 'Can\'t connect with server', 'error');
    }
}

export const fetchWithToken = (endpoint, data, method = 'GET') => {

    const url = `${process.env.REACT_APP_API_URL}/${endpoint}`;
    const token = localStorage.getItem('token') || '';
    
    try {
        if (method === 'GET') {
            return fetch(url, {
                method,
                headers: {
                    'x-token': token,
                }
            });
        } else {
            return fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'x-token': token,
                },
                body: JSON.stringify(data),
            })
        }
    } catch (error) {
        console.log(error);
        Swal.fire('Error', 'Can\'t connect with server', 'error');
    }
}

