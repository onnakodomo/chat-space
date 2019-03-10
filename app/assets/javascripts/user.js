$(function(){


  var searchresult = $("#user-search-result")
  var addmemberHTML = $(".chat-group-form__field--right_bottom")


// 検索結果の表示
  function searchMemberToHTML(member){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> ${ member.name } </p>
                  <a href="" class="chat-group-user__btn--add" data-user-id="${ member.id }" data-user-name= "${member.name }"" >追加</a>
                </div>`
    searchresult.append(html);
  }


  // 該当するメンバーなし
  function noMemberToHTML(msg){
    var html =  `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name"> ${ msg } </p>
                 </div>`
    searchresult.append(html);
  }


  // Avax通信
  function ajaxSearchUser(input){
    $.ajax({
      type: 'GET',
      url: '/users.json',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(members){
      deleteSearchResult();
      if ( members.length !== 0 ){
        members.forEach(function(member){
          searchMemberToHTML(member);
        });
      }
      else  {
        noMemberToHTML("一致するユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("検索に失敗しました");
    })
  }



  // 検索結果を削除
  function deleteSearchResult(){
    $("#user-search-result").empty();
  }


  // 追加ボタンを押した後、HTMLを消去
  function deleteAddMemberAfterClick(){
      $("chat-group-user").empty();
  }

  // 追加するメンバーを「チャットメンバーの横に配置」
  function addMemberToChatMemberHTML( addUserId, addUserName ){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value=' ${ addUserId }'>
                  <p class='chat-group-user__name'>${ addUserName }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
                console.log(addUserId);
                console.log(addUserName );
    addmemberHTML.append(html);
  }




  // イベント発火地点
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    // 入力した値が0でないなら
    if ( input.length !== 0 ){
      ajaxSearchUser(input);
    // 0なら検索結果を消去
    } else {
      deleteSearchResult();
    }
  });

  // 「追加」ボタンを押した時
  $(document).on("click",".chat-group-user__btn--add",function(){
    var addUserId = $(".chat-group-user__btn--add").attr("data-user-id");
    var addUserName = $(".chat-group-user__btn--add").attr("data-user-name");
    deleteAddMemberAfterClick();
    addMemberToChatMemberHTML( addUserId, addUserName );
  });
});


