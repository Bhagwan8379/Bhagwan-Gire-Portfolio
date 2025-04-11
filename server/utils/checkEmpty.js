const validator = require('validator')

exports.CheckEmpty = async (fields) => {
    const error = {}
    const isError = false
    for (const key in fields) {
        if (validator.isEmpty(fields[key] ? "" + fields[key] : "")) {
            error[key] = `${key} is Required`
            isError = true
        }
    }
    return { error, isError }
}