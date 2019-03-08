$(function (){

// htmlに適用するメソッド
function buildHTML(message) {
  var html =`<div class="message">
              <div class="message__upper-info">
                <p class="message__upper-info__talker">
                  ${ message.user_name }
                </p>
                <p class="message__upper-info__date">
                  ${ message.created_at}
                </p>
              </div>
              <div class="message__text">
                <p></p>
                <img src="">
              </div>
            </div>`
  $(".messages").append(html);

  var body = message.body
  var image =  message.image

  if ( body !== ""  &&  image !== "" ) {
    $(".message__text p").last().text( body )
    $( ".message__text img" ).last().attr("src", image )
  } else {
    if ( body !== "" ) {
      $(".message__text p").last().text(body)
    } else {
      $(".message__text img" ).last().attr("src", image )
    }
  }
}

// スクロールさせる関数
function scrollHTML(){
  $('.messages').animate({
    scrollTop: $('.messages')[0].scrollHeight })
}

// Form使用禁止を解除
function UnlockDisabledForm(){
  $(".submit_btn").prop('disabled', false);
}


// イベント発火/送信ボタンを押した時
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href
    $.ajax({
      type:       'POST',
      url:           url,
      data:     formData,
      dataType:   'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      buildHTML(data);
      scrollHTML();
      UnlockDisabledForm();
      $(".input-box__text").val('');
      $(".input-box__image__file").val('');
    })
    .fail(function(){
      alert('error')
      UnlockDisabledForm();
    })
  });
});
