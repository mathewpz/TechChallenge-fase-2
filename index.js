 // ao modificar qualquer um dos elementos da tela eu chamo a função que valida os campos e assim chamando as outras funções 
 function onChangeEmail(){
    toggleButtonsDisable();
    toggleEmailErrors(); 
}

function onChangePassword(){
    toggleButtonsDisable();
    togglePasswordErrors();    
}

function login(){
    firebase.auth().signInWithEmailAndPassword(form.email().value, form.password().value).then(response=>{
        window.location.href = "pages/filme/filme.html";
    }).catch(error => {
        alert(getErrorMessage(error));
    });
}

function getErrorMessage(error){
    if(error.code == "auth/user-not-found"){
        return "Usuário não encontrado";
    }
    return error.message;
}

function register(){
    window.location.href = "pages/registro/registro.html";
}

function isEmailValid(){
    const email = form.email().value;
    if(!email){
        return false;
    }
    return validateEmail(email);
}

// função responsável por mostrar ou esconder erros de email
function toggleEmailErrors(){
    const email = form.email().value;
    //email obrigatorio
    form.emailRequiredError().style.display = email ? "none" : "block";
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block";
}

// função responsável por mostrar ou esconder erros de senha
function togglePasswordErrors(){
    const password = form.password().value;
    form.passwordRequiredError().style.display = password ? "none" : "block";
}

//função que desabilita os botões
function toggleButtonsDisable(){
    const emailValid = isEmailValid();
    form.recoverPassword().disabled = !emailValid;

    const passwordValid = isPasswordValid();
    form.loginButton().disabled = !emailValid || !passwordValid;
}

function isPasswordValid(){
    const password = form.password().value;
    if(!password){
        return false;
    }
    return true;
}

// acessar o campo de email no formulário
const form = {
    email: ()=> document.getElementById('email'),
    emailInvalidError: ()=> document.getElementById('email-invalid-error'), 
    emailRequiredError: ()=> document.getElementById('email-required-error'),
    loginButton: ()=> document.getElementById("login-button"),
    password: ()=> document.getElementById('password'),
    passwordRequiredError: ()=> document.getElementById('password-required-error'),
    recoverPassword: ()=> document.getElementById("recover-password-button")
}