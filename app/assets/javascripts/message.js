$(function(){  
  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.messages:last').data("message-id");
    console.log(last_message_id)
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      $('.chat-main__messages').append(insertHTML);
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = `<div class="messages" data-message-id=` + message.id + `>` +
        `<div class="chat-main__messages__upper-message">` +
          `<div chat-main__messages__upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="chat-main__messages__upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="chat-main__messages__lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    } else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="messages" data-message-id=` + message.id + `>` +
        `<div class="chat-main__messages__upper-message">` +
          `<div class="chat-main__messages__upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="chat-main__messages__upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="chat-main__messages__lower-message">` +
          `<p class="lower-message__content">` +
            message.content +
          `</p>` +
        `</div>` +
      `</div>`
    } else if (message.image) {
      //同様に、data-idが反映されるようにしている
      var html = `<div class="messages" data-message-id=` + message.id + `>` +
        `<div class="chat-main__messages__upper-message">` +
          `<div class="chat-main__messages__upper-message__user-name">` +
            message.user_name +
          `</div>` +
          `<div class="chat-main__messages__upper-message__date">` +
            message.created_at +
          `</div>` +
        `</div>` +
        `<div class="chat-main__messages__lower-message">` +
          `<img src="` + message.image + `" class="lower-message__image" >` +
        `</div>` +
      `</div>`
    };
    return html;
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__messages').append(html); 
      $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(data){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.chat-main__form__message__submit-btn').prop('disabled', false);
    });
  })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});
