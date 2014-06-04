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

  $('#search').click(function(){
    var talk = $('#talk').val();
    $.post('/search',{
      'talk': talk
    // alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
  });

});

