$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="messages" data-message-id=${message.id}>
          <div class="chat-main__messages__upper-message">
            <div class="chat-main__messages__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
       `<div class="messages" data-message-id=${message.id}>
          <div class="chat-main__messages__upper-message">
            <div class="chat-main__messages__upper-message__user-name">
              ${message.user_name}
            </div>
            <div class="chat-main__messages__upper-message__date">
              ${message.created_at}
            </div>
          </div>
          <div class="chat-main__messages__lower-message">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

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
      $('.chat-main__messages').append(html); $('.chat-main__messages').animate({ scrollTop: $('.chat-main__messages')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(data){
      alert("メッセージ送信に失敗しました");
    })
    .always(function(data){
      $('.chat-main__form__message__submit-btn').prop('disabled', false);
    });

  })

});