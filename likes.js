let like = document.querySelectorAll('.element__like');
console.log(like);
console.log(like.length);
function showClick() {
    console.log('Мы кликнули по элементу');
  }
function addLike(){
    // for(i = 0, i <= like.length, i++){
        
    // }
    if(like.classList.contains('element__like_active') === true){
        like.classList.remove('element__like_active');
    } else {
        like.classList.add('element__like_active');
    }
    
    console.log(like);
}
like.addEventListener('click', addLike); 
like.addEventListener('click', showClick); 
