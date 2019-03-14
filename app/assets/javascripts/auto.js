$(function(){

  setInterval(autoUpdatemessages, 3000);

  function autoNewMessageToHTML(new_message){

    var text  = (new_message.body)  ? new_message.body  : "";
    var image = (new_message.image) ? new_message.image : "";
    var html =`<div class="message" data-message-id=${ new_message.id }>
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${ new_message.user_name }
                  </p>
                  <p class="message__upper-info__date">
                    ${ new_message.created_at}
                  </p>
                </div>
                <div class="message__text">
                  <p>${ text }</p>
                  <img src="${ image }">
                </div>
              </div>`
    $(".messages").append(html);
  }


  function scrollToLastMessageHTML(){
  $('.messages').animate({
    scrollTop: $('.messages')[0].scrollHeight })
  }

  function autoUpdatemessages(){
    var lastMessageId = $('.message:last').attr('data-message-id');
    var url = window.location.href.match(/\/groups\/\d+\/messages/)
    var updateMatchUrl  = url[0]
    $.ajax({
      type:      'GET',
      url:        updateMatchUrl,
      data:      { id: lastMessageId },
      dataType: 'json'
      })
    .done(function(new_messages){
      if (new_messages.length !== 0){
        new_messages.forEach(function(new_message){
          autoNewMessageToHTML(new_message);
          scrollToLastMessageHTML();
        });
      }
    })
    .fail(function(){
      alert('何か入力してください')
    })
  }
});

