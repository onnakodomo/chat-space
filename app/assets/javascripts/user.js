$(function(){


  var searchresult = $("#user-search-result")


// 検索結果の表示
  function searchMemberToHTML(member){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> ${ member.name } </p>
                  <a href="" class="chat-group-user__btn--add" data-user-id="${ member.id }" data-user-name= "${member.name }"" >追加</a>
                </div>`
    console.log( member.id )
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
      url: '/users',
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
    var userId = $(".chat-group-user__btn--add").attr("data-user-id");
    var userName = $(".chat-group-user__btn--add").attr("data-user-name");
    console.log(userId)
    console.log(userName)
  });
});
