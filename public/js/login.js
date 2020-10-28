const form = document.querySelector('form');
const emailError = document.querySelector('.email.error');
const passwordError = document.querySelector('.password.error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    //set values
    const email = form.email.value;
    const password = form.password.value;

    //console.log(email, password);
    
    try {
        const res = await fetch('/accounts/login', {
            method: 'POST',
            body: JSON.stringify({email, password}), 
            headers: {'Content-Type' : 'application/json'}
        });

        const data = await res.json();

        if (data.error){
            emailError.textContent = data.error.email;
            passwordError.textContent = data.error.password; 
        }

        if (data.user) {
            location.assign('/books/viewBooks');
        }

    } catch (error) {
        console.log(error)
    }
})