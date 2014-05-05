/**
 * View logic 
 * 
 */


//View/Presentation layer 
var ChatWindow  = function(domid) {
	//own variables
	var inputBox;
	var window  = $('<article class="chat-window"></article>');
	var sendEvent = new signals.Signal(); //FUTURE WORK ...
	var conversation = $('<div class="chat-conversation"></div>');
	var chattedBackground; 
	var ownBackground;
	
	this.init = function(chatterAvatar,chattedAvatar,chattedHandle) {
		chattedBackground = chattedAvatar;
		ownBackground = chatterAvatar;
		//prepare your mark up here. One time operation ... 
		var header =  $('<header>'
				+'<ul class="chat-title">'
				//+'<li class="chat-title-minimize"> </li>'
				+'<li class="chat-title-space">'
				+ chattedHandle
				+'</li>'
				+'<li class="chat-title-right-panel"></li>'
				+'</header>');
		inputBox = $('<div class="chat-entry"><textarea></textarea></div>');
		header.find('.chat-title-space').css('background-color',chattedBackground);
		window.append(header);
		window.append(conversation);
		window.append(inputBox); 
		//tie the handler
		inputBox.keypress(enterButtonHandler);
		$('#'+domid).append(window);
	};

	this.refresh = function(p) {
		appendChatText(p,chattedBackground);
	};
	
	//Private methods
	var appendChatText = function(chatText,background) {
		if(!chatText) {
			return null; 
		}			
		var chatUl = $('<ul class="chat">'
						+ '<li class="chat-image"><li>'
						+ '<li class="chat-text">'
						+ chatText
						+'</li>'
						+'</ul>');
		chatUl.find('li.chat-image').css("background-color",background);
		//rescroll required		
		conversation.append(chatUl); //new message is inserted ..
		conversation.scrollTop(conversation.prop("scrollHeight")); //using jquery's own scroll call. works 1.6+
	};
	
	var enterButtonHandler = function(e) {		
		if(e.which == 13) {
			var text = inputBox.find('textarea').val();
			inputBox.find('textarea').val(''); //empty it 
			appendChatText(text,ownBackground); //show it in conversation
		}
	 //contain the input event within the chat window. #idea from WWW which I agree too
	};

	/* FUTURE WORK 
	this.minize = function() {
		chatBody.hide();		
	};
	
	this.restore = function() {
		chatBody.show();
	}; 	
	
	this.clear = function() {
		chatBody.empty();		
	}
		
	var destroy = function() {
		window.empty(); //X button
		this.close.dispatch();		
	};	
	
	*/
};
 