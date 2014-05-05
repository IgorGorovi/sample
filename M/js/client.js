/**
 * describes the client class
 * ChatWindow = view class 
 * Chat = 
 */

var ChatClient = function(domid, protocol) {
	var self = this;   
	var view  = new ChatWindow(domid);

	/* Network listener */
	var listener = function(packet) {
		//check operation that comes from server
		var p = packet.payload;
		switch(packet.op) { 
			case 'initConversation': 
				view.init(p.chatterAvatar,p.chattedAvatar,p.chattedHandle);
				break;
			case 'newIncomingMessage':
				if(view) view.refresh(p); 
				break;		
		}		
	};
	//tie up functions
	protocol.client.add(listener);			
	//MAIN	
};




