var a = document.querySelectorAll('a');
var path = window.location.pathname;
var scrollTo = 0;

document.body.scrollTop = '50px'

for(var i=0;i<a.length; i++){
	a[i].onclick = function(e){
		var id = this.attributes['data-post-id'];
		if(id){
			e.preventDefault();
			
			var wrapper = document.createElement('div');
			wrapper.className = '_post_wrapper';
			document.getElementById('content').appendChild(wrapper);
			
			var noConnection = setTimeout(function(){
				wrapper.innerHTML =  '<i id="close" class="close" onclick="closePost(this)">x</i><div class="content"><h1>sorry, server keeps silence :(</h1></div>';
			}, 1500)
			
			setTimeout(function(){
				wrapper.className = wrapper.className + ' __o';
				
				scrollTo = document.body.scrollTop;
				setTimeout(function(){
					wrapper.className = wrapper.className + ' __v'
				}, 500);
				
				Paper.Post.get({id: id.nodeValue, type: 'html'}, function(html){
					clearTimeout(noConnection);
					wrapper.innerHTML = '<i id="close" class="close" onclick="closePost(this)">x</i><div class="content">' + html + '</div>';
					setTimeout(function(){
						document.getElementById('content').style.overflow = 'hidden';
						document.getElementById('content').style.height = wrapper.clientHeight + 'px';
						document.getElementById('content').scrollTop = scrollTo;
						wrapper.style.position = 'absolute';
					}, 500)
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
			document.getElementById('content').style.height = 'auto';
			window.scroll(0, scrollTo);
		}, 50)
	},500)
	
}