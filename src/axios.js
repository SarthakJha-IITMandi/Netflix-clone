import axios from "axios";

// pass base url to axios.create to make req to movie dbs
const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

// if we send instance.get('/xyz') it will append to baseURL


export default instance;