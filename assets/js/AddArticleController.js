app.controller("AddArticleController", AddArticleController);

AddArticleController.$inject = ["$http", "$scope", "AddArticleService"];

function AddArticleController($http, $scope, AddArticleService) {
    var aa = this,
        s = AddArticleService,
        apage = '/index.html',
        prefix = "aa";
    aa.isAdmin = false;
    var successCallback = function(response,fromStore){
        console.log(response);
        if(response.data.length){
            
        } else errorCallback(response);
    }
    var errorCallback = function(response){
        console.log("Error");
        console.log(response);
    }

    aa.formActive = function(form){
        var fa = {
            datas:{
                buttons:{
                    all: document.getElementsByClassName('button'),
                    styles: ['black','white','green','turkiz','wturkiz','greenb'],
                    style: 'black'
                }
            },
            init: function(){
                this.button.init();
            },
            button:{
                init: function(){
                    var buttons = fa.datas.buttons.all;
                    if(!fa.isnull(buttons)){
                        for (var i = 0; i < buttons.length; i++) {
                            buttons[i].onmouseenter = this.over;
                            buttons[i].onmouseleave = this.over;
                        }
                    }
                },
                getStyle: function(el){
                   var styles  = fa.datas.buttons.styles, cl = fa.datas.buttons.style;
                   for (var i = 0; i < styles.length; i++) {
                       if(fa.hasClass(el,styles[i])) cl = styles[i];
                   }
                   return cl;
                },
                over: function(e){
                    e.preventDefault();
                    fa.datas.buttons.style = fa.button.getStyle(this);
                    fa.button.setClass(this);
                },
                overout: function(e){
                    e.preventDefault();
                },
                setClass:function(el) {
                    var link = el.getElementsByTagName('a')[0];
                    this.toggleClass(el,'');
                    if(typeof link!=="undefined") this.toggleClass(link,'color');
                },
                toggleClass: function(el,ext){
                    var color = fa.datas.buttons.style;
                    if(el.className.indexOf('fade'+color+'in') > -1){ 
                        el.className = el.className.replace(' fade'+color+'in'+ext,'');
                        el.className = el.className+' fade'+color+'out'+ext;
                    }else{
                        el.className = el.className.replace(' fade'+color+'out'+ext,'');
                        el.className = el.className+' fade'+color+'in'+ext;
                    }
                }
            },
            hasClass: function(target, className){
                return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
            },
            isnull:function(str){
                return !(typeof str!=="undefined" && str!==null && str!=="");
            }
        }
        fa.init();
    }
}