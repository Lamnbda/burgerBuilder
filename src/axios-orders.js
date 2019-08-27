import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-c4093.firebaseio.com/'
});

export default instance;