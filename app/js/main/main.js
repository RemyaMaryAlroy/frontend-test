$( document ).ready( function(){
 
});
$('#dropdown-submenu').click( function(){
  var getClass = document.getElementsByClassName("limobilesub");
  console.log(getClass);
  for(var i =0;i< getClass.length; i++){
    if ( getClass[i].style.display == 'none'){
      getClass[i].style.display = "block";
    }
    else{
      getClass[i].style.display = 'none';
    }
  }
})
