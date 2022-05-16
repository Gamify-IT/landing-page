import config from "@/config"
import axios from "axios"

import type { login, register } from "@/types/"

export const loginUser = async function (login: login) {
    return axios.post(`${config.apiBaseUrl}/login`, 
        login
    )
}

export const registerUser = async function (register: register) {
    return axios.post(`${config.apiBaseUrl}/register`, 
        register
    )
}

export const hasToken = function () {
    return localStorage.getItem("token") != null
}

export const setToken = function (token: string) {
    localStorage.setItem("token", token)
}