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
  appId      :'727209207341563', //local test use: 739242972804853
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
    //alert('Hi: '+ response.first_name);
    getUserId(response.id, response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    //refreshProfile();
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
  var topic = '';
  var speaker = '';
  var talk_id = '';
  var type = '';
  var imageURL = '';
  var location_type = '';
  var category_type = '';
  $(document).on('click', '#talk-content .talkPicture', showDetail);
  $(document).on('click', '.item', showDetail_v2);
  $(document).on('click', '.btn-vote', vote);
  $('#img').hide();
  $("#modal_trigger").leanModal({top : 200, overlay : 0.6, closeButton: ".modal_close" });
  $('.wid40.btn.btn-primary, .wid40.btn.btn-success, .wid40.btn.btn-warning').click(function(){
    console.log('category: ' + $(this).text());
    type = $(this).text();
    var category = {'category' : $(this).text()};
    var content = '';
    var image1 = '<img style="width:200px; height:200px;border-radius:30px;" src="';
    var image2 = '" alt="hello!" class="open1 img-rounded;">';
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
            element.vote.num = element.vote.voter_id.length;
            content += '<div class="talkPicture" href="#show-detail" talk_id='+ element._id + '>' + image1 + element.imageURL + image2 + '<div class="talkTitle" location="' + element.location + '">' + element.topic
              + '</div><div class="talkSpeaker" info="'+ element.description +'">' + element.speaker + '</div><div class="talkNumberOfVotes">'
              + element.vote.num + '</div> </div> ';
          });
          $('#talk-content').html(content);
          $('.talkPicture').leanModal({top: 200, overlay: 0.6, closeButton: ".modal_close"});
        }else{
          alert('No talks!!');
        }
      });
    }else{
      alert('no this category!!');
    }
  });
  function readImage(input){
    console.log('readImage');
    if(input.files && input.files[0]){
      var FR = new FileReader();
      $('#uploadFile').val(input.value.replace('C:\\fakepath\\', ''));
      $('#img').show();
      $('#drop-files').hide();
      FR.onload = function(e){
        $('#img').attr('src', e.target.result);
      };
      FR.readAsDataURL(input.files[0]);
    }
  }
  $("#asd").change(function(){
    readImage(this);
  });
  function showName(){
    if(typeof localStorage.user_name !== 'undefined' && localStorage.user_name.length > 0){
      $('#login').css('display', 'none');
      $('#username').text(localStorage.user_name).show();
    }
  }
  showName();
  // $('.dialog1').dialog({
  //   width: 1000,
  //   height: 600,
  //   autoOpen: false,
  //   modal: true,
  //   closeOnEscape: true,
  //   open: function(event, ui){
  //     if(topic !== null && speaker !== null){
  //       console.log('topic: '+ $('.dialog1').find('h3').text() + 'speaker: ' + $('.dialog1 .thumbnail .caption p').text());
  //       $('.dialog1').find('h3').text(topic);
  //       $('.dialog1').find('h3').attr('talk_id', talk_id);
  //       $('.dialog1 .thumbnail .caption p').text(speaker);
  //     }
  //   },
  //   buttons:[{
  //     text: 'Vote',
  //     click: function(){
  //       var add = {
  //         'talk_id': $('.dialog1').find('h3').attr('talk_id'),
  //         'voter_id': localStorage.user_id };
  //       $.ajax({
  //         type:'POST',
  //         url:'/vote',
  //         data: add,
  //         dataType:'JSON'
  //       }).done(function(response){
  //         if(response.message === 'ok'){
  //           //$(this).dialog('close');
  //           console.log('vote ok');
  //           refreshCatergory();
  //         }  
  //       });
  //       $(this).dialog('close');
  //     }
  //   }],
  //   show: {
  //     effect: "drop",
  //     duration: 500
  //   },
  //   hide: {
  //     effect:"drop",
  //     duration: 500
  //   }
  // });
  function vote(){
    if(typeof localStorage.user_id !== 'undefined' && localStorage.user_id.length > 0){
      var add = {
        'talk_id' : $(this).attr('talk_id'),
        'voter_id' : localStorage.user_id 
      };
      $.ajax({
        type: 'POST',
        url: '/vote',
        data: add, 
        dataType: 'JSON'
      }).done(function(response){
        if(response.message === 'ok'){
          console.log('vote ok ');
          refreshCatergory();
          refreshProfile();
          refreshHot();
          $('.modal_close').trigger('click');
        }
      });
    }else{
      alert('Please log in first');
    }
  }
  function showDetail(){
    var count = $('.talk-detail #detail-topic').text().split('：');
    console.log('c: '+count.length);
    if(count[1].length === 0){
      $('#talk-image-img').attr('src', $(this).find('img').attr('src'));
      $('.btn-vote').attr('talk_id', $(this).attr('talk_id'));
      var topic_text = $('.talk-detail #detail-topic').text(); 
      topic_text += $(this).find('.talkTitle').text();
      $('.talk-detail #detail-topic').text(topic_text);
      var speaker_text = $('.talk-detail #detail-speaker').text(); 
      speaker_text += $(this).find('.talkSpeaker').text();
      $('.talk-detail #detail-speaker').text(speaker_text);
      var location_text = $('.talk-detail #detail-dest').text();
      location_text += $(this).find('.talkTitle').attr('location');
      $('.talk-detail #detail-dest').text(location_text);
      var info_text = $('.talk-detail #detail-info').text();
      info_text += $(this).find('.talkSpeaker').attr('info');
      $('.talk-detail #detail-info').text(info_text);
    }
  }


  function refreshCatergory(){
    if(type.length !== 0){
      var category = { 'category' : type};
      var content = '';
      var image1 = '<img style="width:200px; height:200px;border-radius:30px;" src="';
      var image2 = '" alt="hello!" class="open1 img-rounded;">';
      $.ajax({
        type:'POST',
        dataType:'JSON',
        data: category,
        url: '/show'
      }).done(function(response){
        if(response.message === 'ok'){
          response.result.forEach(function(element, index, array){
            console.log('index: ' + index + ' data:' + element.topic);
            element.vote.num = element.vote.voter_id.length;
            content += '<div class="talkPicture" href="#show-detail" talk_id='+ element._id + '>' + image1 + element.imageURL + image2 + '<div class="talkTitle" location="' + element.location + '">' + element.topic
              + '</div><div class="talkSpeaker" info="'+ element.description +'">' + element.speaker + '</div><div class="talkNumberOfVotes">'
              + element.vote.num + '</div> </div> ';
          });
          $('#talk-content').html(content);
          $('.talkPicture').leanModal({top: 200, overlay: 0.6, closeButton: ".modal_close"});
        }
      });
    }
  }
  function showDetail_v2(){
    console.log('v2 v2');
    var count = $('.talk-detail #detail-topic').text().split('：');
    console.log('c: '+count.length);
    if(count[1].length === 0){
      $('#talk-image-img').attr('src', $(this).find('canvas').attr('src'));
      $('.btn-vote').attr('talk_id', $(this).attr('talk_id'));
      var result = $(this).find('.caption').text().split('\n');
      var topic_text = $('.talk-detail #detail-topic').text(); 
      topic_text += result[0];
      $('.talk-detail #detail-topic').text(topic_text);
      var speaker_text = $('.talk-detail #detail-speaker').text(); 
      speaker_text += result[1];
      $('.talk-detail #detail-speaker').text(speaker_text);
      var location_text = $('.talk-detail #detail-dest').text();
      location_text += result[2];
      $('.talk-detail #detail-dest').text(location_text);
      var info_text = $('.talk-detail #detail-info').text();
      info_text += $(this).find('.caption').attr('info');
      $('.talk-detail #detail-info').text(info_text);
    }
  }

  function refreshHot(){
    console.log('refresh hot');
    var content = '';
    var content_part1 = '<div class="item" href="#show-detail" talk_id="';
    var content_part1_1 = '"><img src="';
    var content_part2 = '" class="content"/><div class="caption" info="';
    var content_part2_2 = '">';
    var content_part3 = '</div></div>';
    var caption_text = '';
    //var count = 0;
    //var hotData = [];
    $.getJSON('/showhot', function(data){
      //hotData = data;
      $.each(data, function(){
        console.log('topic: '+ this.topic + ', speaker: '+this.speaker);
        caption_text = this.topic + '\n' + this.speaker + '\n' + this.location; 
        content += content_part1;
        content += this._id;
        content += content_part1_1; 
        content += this.imageURL;
        content += content_part2;
        content += this.description;
        content += content_part2_2;
        content += caption_text;
        content += content_part3;
      });
      $('.flow').html(content);
      $('.item').leanModal({top: 200, overlay: 0.6, closeButton: ".modal_close"});
    }); 
  }
  refreshHot();
  function refreshProfile(){
    console.log('iiid: ' + localStorage.user_id);
    if(typeof localStorage.user_id !== "undefined"){
      var getProfile = {
        'user_id' : localStorage.user_id,
        'user_name' : localStorage.user_name
      };
      var content = '';
      var image1 = '<img style="width:200px; height:200px;border-radius:30px;" src="';
      var image2 = '" alt="hello!" class="open1 img-rounded;">';
      $.ajax({
        type: 'POST',
        url: '/showProfile',
        data: getProfile,
        dataType: 'JSON'
      }).done(function(response){
        if(response.message === 'ok'){
          response.result.forEach(function(element, index, array){
            console.log('index: ' + index + ' data:' + element.vote.voter_id);
            element.vote.num = element.vote.voter_id.length;
            content += '<div class="talkPicture" href="#show-detail" talk_id='+ element._id + '>' + image1 + element.imageURL + image2 + '<div class="talkTitle" location="' + element.location + '">' + element.topic
              + '</div><div class="talkSpeaker" info="'+ element.description +'">' + element.speaker + '</div><div class="talkNumberOfVotes">'
              + element.vote.num + '</div> </div> ';
          });
          $('#profile-content').html(content);
          $('.talkPicture').leanModal({top: 200, overlay: 0.6, closeButton: ".modal_close"});
          console.log('name: ' + $('#profile .hiUser').text());
          $('#profile .hiUser').text('Hello, '+ localStorage.user_name);
        }
      });
    }
  }

  $('select[id="select_category"]').prop('selectedIndex', 0);
  $('select[id="select_location"]').prop('selectedIndex', 0);

  $('select[id="select_category"]').change(function(){
    $('select[id="select_category"] option:selected').each(function(){
      category_type = $(this).text();
      console.log(category_type);
    });
  });

  $('select[id="select_location"]').change(function(){
    $('select[id="select_location"] option:selected').each(function(){
      location_type = $(this).text();
      console.log('location: ' + location_type);
    });
  });


  $('#submit').click(function(){
    var new_topic = $('#topic').val();
    var new_speaker = $('#speaker').val();
    var new_category = category_type;
    var new_description = $('#description').val();
    var new_location = location_type;
    var image_url = $('#img').attr('src');
    if(typeof localStorage.user_id !== 'undefined'){
      if(new_topic !== null && new_speaker !== null && new_category !== null && new_description !== null && new_location !== null && image_url !== null){
        $.post('/createTalk',{
          topic: new_topic,
          speaker: new_speaker,
          category: category_type,
          description: new_description,
          host_id: localStorage.user_id,
          imageURL: image_url,
          location: location_type
        }, function(msg){
          alert('感謝您，已加入！')
          refreshProfile();
          console.log(topic);
        });
      }
    }
  });
  // $('#search').click(function(){
  //   $('#QQ').show();
  //   $.post('/show',{
  //   }, function(res){
  //     console.log('haha', res);
  //   });
  // });
  refreshProfile();
  $("#login_form").click(function(){
      $(".social_login").hide();
      $(".user_login").show();
      return false;
    });

    // Calling Register Form
    $("#register_form").click(function(){
      $(".social_login").hide();
      $(".user_register").show();
      $(".header_title").text('Register');
      return false;
    });

    // Going back to Social Forms
    $(".back_btn").click(function(){
      $(".user_login").hide();
      $(".user_register").hide();
      $(".social_login").show();
      $(".header_title").text('Login');
      return false;
    });
  // $('btn.open1').click(function(){
  //   console.log('click!!!!!');
  //   var prev = $(this).parent('talkPicture');
  //   console.log('id: ' + prev.attr('talk_id'));
  //   $('.dialog1').find('h3').val(prev.find('.talkTitle').text());
  //   $('.dialog1 .caption p').val(prev.find('.talkSpeaker').text());
  //   $('.dialog1').dialog('open');
  // });

});