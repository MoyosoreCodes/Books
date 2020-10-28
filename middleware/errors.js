const handleError = (err) => {
    console.log(err.message, err.code);
    
    let errors = {
        firstname: '', 
        lastname: '',
        email: '',
        password: '',
        country: ''
    };

    if (err.code === 11000){
        errors.email = "That email has already been registered";
    }
    
    if (err.message === 'Incorrect Username') {
        errors.email = 'That email is not registered';
    }

    if (err.message === 'Incorrect Password') {
        errors.password = 'Password is incorrect';
    }

    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
          errors[properties.path] = properties.message;   
        });
    }
    return errors
};

module.exports = { 
    handleError
}