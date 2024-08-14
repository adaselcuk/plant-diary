const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('signIn');
const signUpForm = document.getElementById('signUp');


function showMessage(message, divId) {
	var messageDiv = document.getElementById(divId);
	messageDiv.style.display = 'block';
	messageDiv.innerHTML = message;
	messageDiv.style.opacity = 1;
	setTimeout(function () {
	  messageDiv.style.opacity = 0;
	  messageDiv.style.display = 'none';
	}, 5000);
  }
  
  signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
});

signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
});
  
  document.getElementById('recoverPasswordLink').addEventListener('click', (event) => {
	event.preventDefault();
	document.getElementById('signIn').style.display = 'none';
	document.getElementById('recoverPassword').style.display = 'block';
  });
  
  document.getElementById('backToSignIn').addEventListener('click', (event) => {
	event.preventDefault();
	document.getElementById('signIn').style.display = 'block';
	document.getElementById('recoverPassword').style.display = 'none';
  });
  
  export { showMessage };
  