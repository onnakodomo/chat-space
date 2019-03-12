$(function(){


  var searchresult = $("#user-search-result")
  var chatmemberHTML = $(".chat-group-form__field--right--add--member")


  function addMember(addMember){
    var addUserId = addMember.attr("data-user-id");
    var addUserName = addMember.attr("data-user-name");
    addMemberToChat( addUserId, addUserName );
    deleteSelectMember( addMember );
  }

  function addMemberToChat( addUserId, addUserName ){
    var html = `<div class="chat-group-user clearfix">
                  <input name='group[user_ids][]' type='hidden' value=' ${ addUserId }'>
                  <p class='chat-group-user__name'> ${ addUserName } </p>
                  <a class="chat-group-user__btn--remove" data-user-id="${ addUserId }" data-user-name= "${ addUserName }">削除</a>
                </div>`
    chatmemberHTML.append(html);
  }

  function deleteSelectMember(Member){
    var parentSelectMemberHTML = Member.parent();
    parentSelectMemberHTML.remove();
  }




  function deleteMember(deleteMember){
    var deleteMemberId = deleteMember.attr("data-user-id");
    var deleteMemberName = deleteMember.attr("data-user-name");
    deleteMemberReturnToSearchResultHTML( deleteMemberId, deleteMemberName )
    deleteSelectMember( deleteMember );
  }

  function deleteMemberReturnToSearchResultHTML( MemberId, MemberName ){
    var html = `<div class="chat-group-user" clearfix">
                  <p class="chat-group-user__name"> ${ MemberName } </p>
                  <a class="chat-group-user__btn--add" data-user-id="${ MemberId }" data-user-name= "${ MemberName }" >追加</a>
                </div>`
    searchresult.append(html);
  }




  // 検索結果
  function searchMemberToHTML(member){
    var html = `<div class="chat-group-user" clearfix">
                  <p class="chat-group-user__name"> ${ member.name } </p>
                  <a class="chat-group-user__btn--add" data-user-id="${ member.id }" data-user-name= "${ member.name }" >追加</a>
                </div>`
    searchresult.append(html);
  }


  function noMemberToHTML(msg){
    var html =  `<div class="chat-group-user clearfix">
                    <p class="chat-group-user__name"> ${ msg } </p>
                 </div>`
    searchresult.append(html);
  }

  function deleteSearchResult(){
    $("#user-search-result").empty();
  }



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


  // イベント発火地点
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    if ( input.length !== 0 ){
      ajaxSearchUser(input);
    } else {
      deleteSearchResult();
    }
  });

// 「追加」ボタンを押した時
  $(document).on("click",".chat-group-user__btn--add",function(){
    var selectMember = $(this)
    addMember(selectMember);
  });

  // 「削除」ボタンを押した時
  $(document).on("click",".chat-group-user__btn--remove",function(){
    var selectMember = $(this)
    deleteMember(selectMember);
  });
});


