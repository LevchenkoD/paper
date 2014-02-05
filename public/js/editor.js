var Editor = (function(){

	function replaceAll(x, y, z){
		
	};

	function put(val){
		val = val.replace('<br>', '')
		val = val.replace(/div>/g,'p>')
		document.getElementById('editorSlave').value = val;
	}
	
	document.getElementById('editor').onkeyup = function(){
		put(this.innerHTML);
	}
	
	document.body.onkeypress = function(e){
		if((event.ctrlKey) && ((event.keyCode == 0xA)||(event.keyCode == 0xD))){
				document.newPost.submit();
		}
	}

}());