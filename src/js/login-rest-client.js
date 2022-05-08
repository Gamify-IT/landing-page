import config from "@/config"
import axios from "axios"

export const loginUser = async function (login) {
    return axios.post(`${config.apiBaseUrl}/login`, 
        login
    ).then(response => {
        return response.data
    }).catch(error => {
        console.log(error);
    })
}

export const registerUser = async function (register) {
    return axios.post(`${config.apiBaseUrl}/register`, 
        register
    ).then(response => {
        return response.data
    }).catch(error => {
        console.log(error);
    })
}

export const hasToken = function () {
    return localStorage.getItem("token") != null
}

export const setToken = function (token) {
    localStorage.setItem("token", token)
}