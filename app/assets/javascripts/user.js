$(function(){


  // 検索結果の表示先
  var searchresult = $("#user-search-result")


  // 検索結果を挿入するメソッド
  function applicableMemberToHTML(member){
    console.log(member)
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name"> ${ member.name } </p>
                  <a class=""></a>
                </div>`
    searchresult.append(html);
  }



  // 該当するメンバーが存在しない時のメソッド
  function notApplicableMemberToHTML(msg){}



  // イベント発火
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    console.log(input)
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    // 成功
    .done(function(members){
      // 一度表示されている検索結果を一度全て消す
      $("#user-search-result").empty();
      // 検索結果が0でなければ行う処理
      if (members.lenght !== 0 ){
        members.forEach(function(member){
          applicableMemberToHTML(member);
        });
        // 検索結果が0の時
      } else {
          notApplicableMemberToHTML("該当するメンバーがいませんでした");
      }
    })
    // 失敗
    .fail(function(){
      alert("検索に失敗しました");
    })
  });
});

