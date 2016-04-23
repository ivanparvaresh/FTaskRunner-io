var assert = require('chai').assert;
var ftask=require("ftaskrunner");
var ftaskMyIo=require("./../index.js");
var fs=require('fs');

describe('FTaskRunner-io', function() {


    describe('Tasks', function () {
        before(function(done){
           
           try { fs.unlinkSync("./tests/testData/testdir/dump.raw"); } catch(e){};
           try { fs.unlinkSync("./tests/testData/testdir/dump.json"); } catch(e){};
           try { fs.unlinkSync("./tests/testData/testdir/dump.xml"); } catch(e){};
           
           done();
        });
        after(function(done){
            try { fs.unlinkSync("./tests/testData/testdir/dump.raw"); } catch(e){};
           try { fs.unlinkSync("./tests/testData/testdir/dump.json"); } catch(e){};
           try { fs.unlinkSync("./tests/testData/testdir/dump.xml"); } catch(e){};
           
           done();
        })
        
        it('#ioReadFile', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root.ioReadFile("./tests/testData/o.json");
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0],'{"a":1}');
                
                done();
            });	
        });
        
        it('#ioReadDir/filesAndDirectories', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root.ioReadDir("./tests/testData/",{
                    includeDir:true,
                    includeFiles:true
                });
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0].length,2);
                assert.equal(branches.test.result[0][0],"o.json");
                assert.equal(branches.test.result[0][1],"testdir");                
                
                done();
            });	
        });
        
        it('#ioReadDir/filesOnly', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root.ioReadDir("./tests/testData",{
                    includeDir:false,
                    includeFiles:true
                });
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0].length,1);
                assert.equal(branches.test.result[0][0],"./tests/testData/o.json");                
                
                done();
            });	
        });
        
        it('#ioReadDir/DirsOnly', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root.ioReadDir("./tests/testData",{
                    includeDir:true,
                    includeFiles:false
                });
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0].length,1);
                assert.equal(branches.test.result[0][0],"./tests/testData/testdir");                
                
                done();
            });	
        });
        
        
        
        it('#ioRawDump', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root
                    .string("testdata")
                    .ioRawDump(__dirname + "/testData/testdir/dump.raw")
                    .ioReadFile(__dirname + "/testData/testdir/dump.raw")
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0],"testdata");                
                
                done();
            });	
        });
        it('#ioXmlDump', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root
                    .input(["testdata"])
                    .ioXmlDump(__dirname + "/testData/testdir/dump.xml")
                    .ioReadFile(__dirname + "/testData/testdir/dump.xml")
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0],"<?xml version=\'1.0\' encoding=\'utf-8\'?>\n<items>\n  <item>testdata</item>\n</items>\n");                
                
                done();
            });	
        });
        it('#ioJsonDump', function (done) {
            ftask().load(ftaskMyIo).build("test",function(root){
                
                root
                    .string("testdata")
                    .ioJsonDump(__dirname + "/testData/testdir/dump.json")
                    .ioReadFile(__dirname + "/testData/testdir/dump.json")
                
            }).run(null,function(branches){
                
                assert.isNotNull(branches.test);
                assert.isNotNull(branches.test.err);
                assert.equal(branches.test.result[0],"\"testdata\"");                
                
                done();
            });	
        });
        
    });
});