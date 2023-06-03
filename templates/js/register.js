let test123 =[];

let userLogin =[];
async function loadUserLogin(){
    let users = JSON.parse(await getItem('userLogin'));
    userLogin = users;
}
async function signUp(){
    signUpbtn.disabled = true;
    userLogin.push({
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    })

    setItem('userLogin', JSON.stringify(userLogin));
    resetForm();

}

function resetForm(){
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signUpbtn.disabled = false;
}