$(function(){

  $('#voteButton').click(function(){
    alert("Voted!");
  });
  $('.popupp').click(function(){
    $('.dialog1').dialog('close');
  });
  $(".wahaButton").click(function() {
    $( ".wahaha" ).toggle( "drop", 1000 );
  });

  $('#search').click(function(){
    $('#talk').val();
    $.post('/search',{
    var talk = $('#talk');
    alert(talk.attr(value));
    }, function(res){
      console.log('haha', res);
    });
  });

});

