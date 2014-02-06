exports.fit = function(jade, data, fn){
	var html = jade;
	for(key in data){
		var reg = new RegExp('_'+key+'_', 'g');
		html = html.replace(reg, data[key]);
	}
	
	fn(html);
}