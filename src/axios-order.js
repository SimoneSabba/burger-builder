import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-project-6067a.firebaseio.com/'
});

export default instance;