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
    var talk = $('#talk');
    alert(talk.attr(value));
    $('#QQ').show();
    $.post('/show',{
    }, function(res){
      console.log('haha', res);
    });
  });

  
  
}); 