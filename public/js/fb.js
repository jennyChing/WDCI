function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      :'727209207341563',
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.0' // use version 2.0
});

// Now that we've initialized the JavaScript SDK, we call
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    console.log('ID: '+ response.id);
    console.log('HI: '+ response.first_name);
    alert('Hi: '+ response.first_name);
    getUserId(response.id, response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
  });
}
var user_id = '';

function getUserId(id, name){
  if(id !== null){
    if(localStorage.user_id !== null){
      localStorage.user_id = id;
      localStorage.user_name = name;
      console.log('user_id: '+ localStorage.user_id);
    }
  }
}
function getUserName(){
  if(localStorage.user_name !== null){
    return 'Hi' + localStorage.user_name;
  }
  return 'Hi AA';
}


$(document).ready(function(){
 
  // $('.btn.btn-info').click(function(){
  //   if(localStorage.user_id === null){
  //     alert('Please log in first!!');
  //   }else{
  //     var vote = {
  //       'voter_id': localStorage.user_id,
  //       'talk_id': this.parent().find('div').attr('talk_id').toString()
  //     }
  //     $.ajax({
  //       url: '/vote',
  //       dataType: 'JSON',
  //       data: vote,
  //       type: 'POST'
  //     }).done(function(response){
  //       if(response.message === 'ok'){
  //         console.log(response.message);
  //       }else{
  //         console.log('Err');
  //       }
  //     });
  //     console.log('send vote');
  //   }
  // });
  var topic = '';
  var speaker = '';
  var talk_id = '';
  $(document).on('click', '#talk-content .talkPicture .btn', showDetail);
  $('.btn.btn-primary, .btn.btn-success, .btn.btn-warning').click(function(){
    console.log('category: ' + $(this).text());
    var type = $(this).text();
    var category = {'category' : $(this).text()};
    var content = '';
    var image = '<img style="width:200px; height:200px;border-radius:30px;" src="http://i1.ytimg.com/vi/DzIYaxqFIJ0/hqdefault.jpg" alt="hello!" class="open1 img-rounded;">';
    if(type === '科技' || type === '生活' || type === '其他'){
      $.ajax({
        type:'POST',
        url:'/show',
        data: category,
        dataType: 'JSON'
      }).done(function(response){
        if(response.message === 'ok'){
          response.result.forEach(function(element, index, array){
            console.log('index: ' + index + ' data:' + element.topic);
            content += '<div class="talkPicture" talk_id='+ element._id + '>' + image + '<div class="talkTitle">' + element.topic
              + '</div><div class="talkSpeaker">' + element.speaker + '</div><button , type="button" class="btn btn-info open1">Vote</button><div class="talkNumberOfVotes">'
              + element.vote.num + '</div> </div> '; 
          });
          $('#talk-content').html(content);
        }else{
          alert('No talks!!');
        }
      });
    }else{
      alert('no this category!!');
    }
  });
  function readImage(input){
    if(input.files && input.files[0]){
      var FR = new FileReader();
      FR.onload = function(e){
        $('#img').attr('src', e.target.result);
        $('#base').text(e.target.result);
      };
      FR.readAsDataURL(input.files[0]);
    }
  }
  $("#asd").change(function(){
    readImage(this);
  });
  $('.dialog1').dialog({
    width: 1000,
    height: 600,
    autoOpen: false,
    modal: true,
    closeOnEscape: true,
    open: function(event, ui){

      if(topic !== null && speaker !== null){
        console.log('topic: '+ $('.dialog1').find('h3').text() + 'speaker: ' + $('.dialog1 .thumbnail .caption p').text());
        $('.dialog1').find('h3').text(topic);
        $('.dialog1').find('h3').attr('talk_id', talk_id);
        $('.dialog1 .thumbnail .caption p').text(speaker);
      }
    },
    buttons:[{
      text: 'Vote',
      click: function(){
        var add = {
          'talk_id': $('.dialog1').find('h3').attr('talk_id'),
          'voter_id': localStorage.user_id };
        //console.log('iddd: ' + $('.dialog1').find('h3').attr('talk_id'));
        $.ajax({
          type:'POST',
          url:'/vote',
          data: add,
          dataType:'JSON'
        }).done(function(response){
          if(response.message === 'ok'){
            //$(this).dialog('close');
            console.log('ok');
          }  
        });
        $(this).dialog('close');
      }
    }],
    show: {
      effect: "drop",
      duration: 500
    },
    hide: {
      effect:"drop",
      duration: 500
    }
  });
  function showDetail(){
    console.log('click!!!!!');
    var prev = $(this).parent('.talkPicture');
    console.log('id: ' + prev.attr('talk_id'));
    talk_id = prev.attr('talk_id');
    topic = prev.find('.talkTitle').text();
    speaker = prev.find('.talkSpeaker').text();
    //$('.dialog1').find('h3').val(prev.find('.talkTitle').text());
    //$('.dialog1 .thumbnail .caption p').val(prev.find('.talkSpeaker').text());
    $('.dialog1').dialog('open'); 
  }
  // $('btn.open1').click(function(){
  //   console.log('click!!!!!');
  //   var prev = $(this).parent('talkPicture');
  //   console.log('id: ' + prev.attr('talk_id'));
  //   $('.dialog1').find('h3').val(prev.find('.talkTitle').text());
  //   $('.dialog1 .caption p').val(prev.find('.talkSpeaker').text());
  //   $('.dialog1').dialog('open');  
  // });
  
});