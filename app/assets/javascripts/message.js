$(function (){

  // htmlに適用するメソッド
  function buildSendMessageHTML(message) {
    // 三項演算子で messageのimageを振り分けていく。
    var text  = (message.body)  ? message.body  : "";
    var image = (message.image) ? message.image : "";

    var html =`<div class="message" data-message-id=${ message.id }>
                <div class="message__upper-info">
                  <p class="message__upper-info__talker">
                    ${ message.user_name }
                  </p>
                  <p class="message__upper-info__date">
                    ${ message.created_at}
                  </p>
                </div>
                <div class="message__text">
                  <p>${ text }</p>
                  <img src="${ image }">
                </div>
              </div>`
    $(".messages").append(html);
  }


  // スクロールさせる関数
  function scrollToLastMessageHTML(){
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
    .done(function(send_message) {
      if (send_message.length !== 0){
        buildSendMessageHTML(send_message);
        scrollToLastMessageHTML();
        UnlockDisabledForm();
        $(".input-box__text").val('');
        $(".input-box__image__file").val('');
      } else {
        UnlockDisabledForm();
        alert('何か入力してください')
      }
    })
    .fail(function(){
      alert('error')
      UnlockDisabledForm();
    })
  });
});

