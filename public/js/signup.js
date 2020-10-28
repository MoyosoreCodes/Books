const form = document.querySelector('form');
const firstnameError = document.querySelector('.firstname.error');
const lastnameError = document.querySelector('.lastname.error');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');
const countryError = document.querySelector('country.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //setting errors


    //get the values
    const firstname = form.firstname.value;
    const lastname = form.lastname.value;
    const email = form.email.value;
    const password = form.password.value;
    const gender = form.gender.value;
    const country = form.country.value;

    try {
        const res = await fetch ('/accounts/signup', {
            method: 'POST',
            body: JSON.stringify({firstname, lastname, email, password, gender, country}),
            headers: { 'Content-Type' : 'application/json'}
        });
        const data = await res.json();

        if (data.errors) {
            firstnameError.textContent = data.errors.firstname;
            lastnameError.textContent = data.errors.lastname;
            emailError.textContent = data.errors.email;
            passwordError.textContent = data.errors.password;
            countryError.textContent = data.errors.country; 
        }

        if (data.user) {
            location.assign('/books/viewBooks');
        }
    } catch (err) {
        console.log(err)
        
    }
});