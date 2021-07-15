function saveTokenToLocalStorage(value) {
    localStorage.setItem("token", value);
}
function getTokenFromLocalStorage() {
    return localStorage.getItem("token");
}

export {
    saveTokenToLocalStorage,
    getTokenFromLocalStorage,
};
