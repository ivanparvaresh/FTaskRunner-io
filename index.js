var fs = require('fs');
var path = require('path');
var guid = require("guid");
var easyxml = require("easyxml");

module.exports = function (container) {

    var tasks = [];


    tasks.push({
        name:"ioReadFile",
        def:function(instance,path,unicode){
            return {
                path:path,
                unicode:unicode
            };
        },
        exec:function(scope,next){
            
            var targetPath=scope.path;
            if (targetPath==null)
                targetPath=scope.$$input;
            
            var unicode="UTF-8";
            if (scope.unicode)
                unicode=unicode;
            fs.readFile(targetPath,unicode,function(err,data){
                if (err)
                    throw err;
                    
                next(data);
            });
            
        }
    });
    
    
    tasks.push({
        name:"ioReadDir",
        def:function(instance,path,options){
            return {
                includeDir:(options!=null && options.includeDir!=null)?options.includeDir:true,
                includeFiles:(options!=null && options.includeFiles!=null)?options.includeFiles:true,
                path:path
            }
        },
        exec:function(scope,next){
            
            var target=scope.$$input;
            if (scope.path)
                target=scope.path;

            fs.readdir(target,function(err,files){
                
                if (err)
                    throw err;
                
                var result=[];
                var checked=files.length;
                for(var i=0;i<files.length;i++){
                    file = files[i];
                    filePath = target + '/' + file;
                    
                    if (scope.includeDir && scope.includeFiles){
                        next(files);
                        return;
                    }
                    
                    (function(filePath){
                        fs.stat(filePath,function(err,stat){
                            
                            if (err)
                                throw err;
                            
                            if (scope.includeDir && stat.isDirectory()){
                                result.push(filePath);
                            }else if (scope.includeFiles && !stat.isDirectory()){
                                result.push(filePath);
                            }
                            checked--;
                            if (checked==0){
                                next(result);
                            }
                        });
                    })(filePath);
                    
                } // end of loops
                
                
            });
            
        }
    });
    
    tasks.push({
        name: "ioRawDump",
        def: function (instacne,targetPath) {
            return {
                path: targetPath
            };
        },
        exec: function (scope, next) {
            
            var targetPath=scope.path;
            targetPath = targetPath.replace("{guid}", guid.create())

            
            fs.writeFile(targetPath, scope.$$input, function (err) {
                if (err) {
                    throw err;
                }
                next(scope.$$input);
            });
        }
    });
    
    tasks.push({
        name: "ioXmlDump",
        def: function (instacne,targetPath) {
            return {
                path: targetPath
            };
        },
        exec: function (scope, next) {
            
            var targetPath=scope.path;
            targetPath = targetPath.replace("{guid}", guid.create())

            var serializer = new easyxml({
                singularize: true,
                rootElement: 'response',
                dateFormat: 'ISO',
                manifest: true
            });
            

            fs.writeFile(targetPath, serializer.render(scope.$$input), function (err) {
                if (err) {
                    throw err;
                }
                next(scope.$$input);
            });
        }
    });
    
    tasks.push({
        name: "ioJsonDump",
        def: function (instacne,targetPath) {
            return {
                path: targetPath
            };
        },
        exec: function (scope, next) {
            
            var targetPath=scope.path;
            targetPath = targetPath.replace("{guid}", guid.create())
            
            fs.writeFile(targetPath, JSON.stringify(scope.$$input), function (err) {
                if (err) {
                    throw err;
                }
                next(scope.$$input);
            });
        }
    });
    
    tasks.push({
        name: "ioJsonDump",
        def: function (instacne,targetPath) {
            return {
                path: targetPath
            };
        },
        exec: function (scope, next) {
            
            var targetPath=scope.path;
            targetPath = targetPath.replace("{guid}", guid.create())

            var serializer = new easyxml();
            

            fs.writeFile(targetPath, JSON.stringify(scope.$$input), function (err) {
                if (err) {
                    throw err;
                }
                next(scope.$$input);
            });
        }
    });
    

    return tasks;
}
