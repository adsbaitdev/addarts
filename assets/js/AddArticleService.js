var app = angular.module("newarts", []);
app.service("AddArticleService", AddArticleService);


AddArticleService.$inject = ["$http"];

function AddArticleService($http) {
    var service = {
        saveAticle: saveArticle,
        modifyArticle: modifyArticle
    };
    
    return service;
    
    function getArts(type,params,url){
        var aurl = url || "../../query/articles.php";
        var search = "?type="+type+jsontoquery(params);
        
        return $http({
            method: "GET",
            url: aurl+search
        });
    }

    function listArticles(){
        
    }

    function modifyArticle(artid){

    }

    function saveArticle(){
        console.log('save');
    }
    
    function jsontoquery(obj){
        var query = "";
        if(Object.keys(obj).length){
            query = "&";
            for(var i in obj){
                query += i+"="+obj[i]+"&";
            }
            return query.slice(0,-1);
        }
        return query;
    }
}