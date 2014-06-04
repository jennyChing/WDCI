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
    pleaseLoginFirst();
    var talk = $('#talk').val();
    $.post('/search',{
      'talk': talk
    // alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
  })
  $('#search').click(function(){
    $('#talk').focus();
    pleaseLoginFirst();
    var talk = $('#talk').val();
    $.post('/search',{
      'talk': talk
    // alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
  });

});

function pleaseLoginFirst(){
  alert('Please login first!');
}

