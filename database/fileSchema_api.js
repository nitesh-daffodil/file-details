var fileSchema_db =  require('./fileSchema_db')  ;

module.exports =  {
	save : function(data, done) {
		var fileDetail = new fileSchema_db(data);
		fileDetail.save(function(error,savedData){
			if(error) return done(error,null);
			if(savedData)  return done(null, savedData);
		})
	}
}