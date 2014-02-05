var a = document.querySelectorAll('a');
var path = window.location.pathname;

for(var i=0;i<a.length; i++){
	a[i].onclick = function(e){
		var id = this.attributes['data-post-id'];
		if(id){
			e.preventDefault();
			var wrapper = document.createElement('div');
			wrapper.className = '_post_wrapper';
			document.getElementById('content').appendChild(wrapper);
			setTimeout(function(){
				wrapper.className = wrapper.className + ' __o';
				
				setTimeout(function(){
					wrapper.className = wrapper.className + ' __v'
				}, 550);
				
				Paper.Post.get({id: id.nodeValue, type: 'html'}, function(html){
					console.log(html);
					wrapper.innerHTML = '<i id="close" class="close" onclick="closePost(this)">x</i><div class="content">' + html + '</div>';
					//window.history.pushState("", post.title, post.url);
				});
				
			}, 50)
		}
	}
}

var closePost = function(el){
	var x = el.parentElement;
	x.className = '_post_wrapper __v';
	setTimeout(function(){
		x.className = '_post_wrapper';
		
		setTimeout(function(){
			x.parentElement.removeChild(x);
			window.history.pushState('', '', path);
		}, 50)
	},500)
	
}