/**
 * Server piece 
 */

var Server = function() {	
	var self = this;
	//no group chat support. only 1 to 1 chat
	var activeChats = [0,{}]; // And, this is a conversation between 1 and 2, 1 and 3
	var activeUsers = [ {avatar: ''}, // no one}
	                    {avatar: '#FFCC00', handle: "Krishna"} ,
	                    {avatar: '#99CCFF', handle: "Sunil"} ,
	                    {avatar: '#99FF99', handle: "Preeti"} ,
	                    {avatar: '#FFFF00', handle: "Dumby"} ,
	                    {avatar: '#66FF66', handle: "KD"}
	                   ];	
	var listener  = function(packet) {
		//FUTURE WORK !!
	};		
	 //tie up functions 
	 Protocol.prototype.server.add(listener); //network listener
	 this.initEnv = function() {
		/*
		 *NETWORK happens to be our network bus and a common namespace
		 *bad practice probably but might server the requirement of this demo
		 */		 
		 NETWORK.protocol_1_2.client.dispatch({op: 'initConversation',payload: {chatterAvatar:activeUsers[1].avatar, chattedAvatar:activeUsers[2].avatar, chattedHandle: activeUsers[2].handle}})
		//#NETWORK.protocol_1_3.client.dipatch({op: 'initConversation',payload: {chatterAvatar:activeUsers[1].avatar, chattedAvatar:activeUsers[3].avatar, chattedHandle: activeUsers[3].handle}});
		//And, this is a conversation between 1 and 2, 1 and 3
		 activeChats['1']['2'] = NETWORK.protocol_1_2.client;
		//#ctiveChats['1']['3'] = NETWORK.protocol_1_3.client;	 
	 };	
	//client manager - manages clients 
	this.run = function() {
		 var rant = [':)',';)', 'lol', 'brb', 'rofl !!', 'did you see that ....']		 
		 var ind = Math.floor(rant.length * Math.random());
		 if(activeChats['1']['2']) {
			 activeChats['1']['2'].dispatch({op:"newIncomingMessage", payload: rant[ind]});
		 }
		 ind = Math.floor(rant.length * Math.random());
		 if(activeChats['1']['3']) {
			 activeChats['1']['3'].dispatch({op:"newIncomingMessage", payload: rant[ind]});
		 }
		 setTimeout(this.run, Math.random() * 20000);		 
	 };
	 setTimeout(self.run, Math.random * 10000);
};
