$(function(){

  $('#voteButton').click(function(){
    alert('Voted!');
  });
  $('.popupp').click(function(){
    $('.dialog1').dialog('close');
  });
  $('.wahaButton').click(function() {
    $( '.wahaha' ).toggle( 'drop', 1000 );
  });
  $('.searchHaha').click(function(){
    $('#talk').focus();
    // pleaseLoginFirst();
    var talk = $('#talk').val();
    $.post('/search',{
      'talk': talk
    // alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
  });

  $('#search').click(jizzSearch());
  

});

function jizzSearch(){
    $('#talk').focus();
    var talk = $('#talk').val();
    $.post('/search',{
      'talk': talk
    // alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
    // pleaseLoginFirst();

};
function pleaseLoginFirst(){
  alert('Please login first!');
}

$(document).keypress(function(event){
  var keycode = (event.keyCode ? event.keyCode : event.which);
  if(keycode == '13' && $("#talk").is(":focus")){
    // alert("啊啊啊！");
    jizzSearch();
  }
});