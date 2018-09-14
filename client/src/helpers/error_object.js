
function setError(component, status, titel, message) {
    var error = {
        flag: false
    }
    error.flag = true;

    component.$notify({
        group: 'error',
        title: titel,
        text: status + " | " + message,
        duration: -1,
        type: 'error',
    });

    return error;
}

module.exports = {
    setError: setError 
};