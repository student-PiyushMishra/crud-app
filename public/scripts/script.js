let flag = 0;

document.querySelector('button.redirect').addEventListener('click', function () {
    location.replace('register')
})

document.querySelector('button.login').addEventListener('click',function(){
    location.replace('login')
})