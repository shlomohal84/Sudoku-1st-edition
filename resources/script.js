document.getElementById('login').onclick = function(){
    if(document.getElementById('username').value == 'abcd' 
        && document.getElementById('password').value == '1234'){
            location.href = "game.html";
    }
    else{
        let errorText = document.getElementById('error');
        error.innerHTML = 'Incorrect login details'
        error.style.color = 'red'
        // alert('incorrect login details')
    }

}
