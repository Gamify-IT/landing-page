export default {
    // URL of the RESTful API
    "apiBaseUrl":  process.env.NODE_ENV === 'production'
    ? '/api/login'
    : 'http://127.0.0.1:4000',
}
