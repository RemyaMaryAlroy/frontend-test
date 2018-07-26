$( document ).ready( function(){
 
});
$('#dropdown-submenu').click( function(){
  var getClass = document.getElementsByClassName("limobilesub");
  var getId = document.getElementById('dropdown-submenu');
  var arrowCheck = document.getElementsByClassName('uparrow');
  console.log(getClass);
  for(var i =0;i< getClass.length; i++){
    if ( getClass[i].style.display == 'none'){
      getClass[i].style.display = "block";
      getId.style.color = '#963737';
      arrowCheck[2].style.transform = 'rotate(-135deg)';
     
    }
    else{
      getClass[i].style.display = 'none';
      getId.style.color = 'black';
      arrowCheck[2].style.transform = 'rotate(45deg)';
      
    }
  }
})
