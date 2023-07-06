/* Method defination for setting error data */
  module.exports.setErrorData = (type, message) => {
    let obj = {
        error_data : type,
        error_message : message,
    }

    return obj;
}