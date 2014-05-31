$(function(){
  var category_type = '';
  $('select').prop('selectedIndex', -1);
  $('select').change(function(){
  $('select option:selected').each(function(){
      category_type = $(this).text();
      console.log(category_type);
    });
  });
  $('#voteButton').click(function(){
    alert("Voted!");
  });
  $('.popupp').click(function(){
    $('.dialog1').dialog('close');
  });
  $(".wahaButton").click(function() {
    $( ".wahaha" ).toggle( "drop", 1000 );
  });
  $('#submit').click(function(){
    $.post('/createTalk',{
      topic: $('#topic').val(),
      speaker: $('#speaker').val(),
      category: category_type,
      description: $('#description').val()
    }, function(msg){
      alert('感謝您，已加入！')
      console.log(topic);
    });
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