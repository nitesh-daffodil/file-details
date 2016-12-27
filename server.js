var express = require('express');
var fs = require('fs');
var async = require('async')
var app = express();
var file_api =  require('./database/fileSchema_api');
var  mongoose =  require('mongoose');
mongoose.connect("mongodb://localhost/filedata");

var path = './images';
if (fs.lstatSync(path).isDirectory()) {
    fs.readdir(path, (err, innerDir) => {
        innerDir.forEach(dir => {
            innerPath = path + '/' + dir;
            if (fs.lstatSync(path).isDirectory()) {
                fs.readdir(path + '/' + dir, (err, files) => {
                    async.eachSeries(files,(file,callback) => { 
                        var title = file.substring(0,(Math.max(0, file.lastIndexOf(".")) || Infinity));
                    	fileObject = {};
                    	fileObject['category'] =  dir;
                    	fileObject['file'] =  file ;
                    	fileObject['title'] = title;
               			 //callback();
                        file_api.save(fileObject,function(error,data){
       
                        	if(error){
                        		console.log(error)
                        	} else {
                        		console.log(data)
                        	}
                        	callback();
                        })
                    })
                });
            } else {
                console.log("Directory  Not Exist");
            }
        })
    })
} else {
    console.log("Directory  Not Exist")
}


app.listen(8080, function() {
    console.log("server working isn 8080");
})
