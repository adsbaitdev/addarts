var lpform = {
	datas:{
		url:"query/sendform.php",
		form: document.getElementsByTagName('form'),
		dynlabels: document.getElementsByClassName('inpulab'),
		formres: document.getElementsByClassName('formres'),
		radios:[],
		formdata:[],
		valid:{
			textarea: 'The textarea is empty, please fill it.',
			select: 'The dropdown field is empty, please fill it.',
			input:{
				tel: 'The phone number is at least 6 characters',
				email: 'Wrong email. Please retry.',
				text: 'The input field is empty, please fill it.',
				password: 'The password is empty, please fill it.',
				radio: 'Choose an option and try again'
			} 
		}
	},
	init:function(){
		this.form.init();
	},
	form:{
		init:function(){
			var forms = lpform.datas.form, $this = this;
			for (var i = 0; i < forms.length; i++) {
				var $this = this, form = forms[i],
					button = form.getElementsByTagName('button')[0];
				$this.anim.init(form);
				button.onclick = function(e){
					e.preventDefault();
					$this.send(form);
				}
			}
		},
		anim:{
		    init: function(form){
    		    var els = form.elements, $this = this;
				var inlabs = lpform.datas.dynlabels;
				for(var i=els.length-1; i >= 0; i--){
					var el = els[i];
					if(el.getAttribute('type')!=="checkbox" && el.getAttribute('type')!=="radio"){
						el.onblur = $this.blur;
    		            el.onfocus = $this.focus;
    		        }
    		    }
    		    for(i=inlabs.length-1; i >= 0; i--){
					el = inlabs[i];
					var label = el.getElementsByTagName('label')[0];
					label.onclick = this.labanim;
    		    }
    		},
    		labanim:function(e){
    		    e.preventDefault();
    		    if(this.className.indexOf('active')===-1){
    		        var input = this.parentNode.children[0];
    		        this.className += ' active';
    		        input.className += ' active';
    		        input.focus();
    		    }
    		},
    		focus: function(e){
    		    e.preventDefault();
				var el = this;
				if(!el.value.length){
    		        var lab = el.parentNode.getElementsByTagName('label')[0];
    		        if(!lpform.isnull(lab)){
    		            if(lab.className.indexOf('active') === -1){
    		                el.className +=" active";
    		                lab.className +=" active";
    		            }
    		        }
    		    }
    		},
    		blur: function(e){
    		    e.preventDefault();
    		    var el = this;
    		    if(!el.value.length){
    		        var lab = el.parentNode.getElementsByTagName('label')[0];
    		        if(!lpform.isnull(lab)){
    		            if(lab.className.indexOf('active') > -1){ 
    		                el.className = el.className.replace(' active','');
    		                lab.className = lab.className.replace(' active','');
    		                
    		            }
    		        }
    		    }
    		}
		},
		hideResult: function(){
		    var formres = lpform.datas.formres;
		    for(var i=formres.length-1; i >= 0; i--){
		        formres[i].className = formres[i].className.replace(' active','');
		    }
		},
		showResult: function(form,bool){
		    var formres = form.getElementsByClassName('formres')[0];
		    formres.className += " active";
		},
		send:function(form){
			this.hideErrors(form);
			this.hideResult();
			var elements = form.elements, valid = true;
			for (var j = elements.length - 1; j >= 0; j--) {
				var el = elements[j];
				if(!this.valid(el)) valid = false;
			}
			if(valid) this.submit(form);
		},
		submit:function(form){
			var query = this.getQuery(),res;
			if(query.length) res  = this.ajax(form,query);
		},
		ajax:function(form,data){
			var xhttp;
			xhttp=new XMLHttpRequest();
			xhttp.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
			      lpform.form.showResult(form,this.responseText);
			      return this.responseText;
			    }
			};
			xhttp.open("POST", lpform.datas.url, true);
			xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			xhttp.send(data);
		},
		getQuery:function(){
		      var data = lpform.datas.formdata,q="";
		      for(var i in data){
		          q += i+"="+data[i]+"&";
		      }
		      return q.slice(0,-1);
		},
		valid:function(el){
			var valid = true;
			switch(el.nodeName.toLowerCase()){
				case 'textarea':
					if(!lpform.check.textarea(el)){
						valid = false;
						this.showErrors(el,'textarea',false);
					} else lpform.datas.formdata[el.getAttribute('name')] = el.value;
				break;
				case 'select':
					if(!lpform.check.select(el)){
						valid = false;
						this.showErrors(el,'select',false);
					} else lpform.datas.formdata[el.getAttribute('name')] = el.value;
				break;
				case 'input':
					if(!lpform.check.input(el)){
						valid = false;
						this.showErrors(el,'input',el.getAttribute('type'));
					} else{
						if(el.getAttribute('type')!=="radio") lpform.datas.formdata[el.getAttribute('name')] = el.value;
					}
				break;
			}
			return valid;
		},
		hideErrors: function(form){
			var errors = form.getElementsByClassName('formerror');
			if(errors.length){
				for (var i = errors.length - 1; i >= 0; i--) {
					errors[i].parentNode.removeChild(errors[i]);
				}
			}
			lpform.datas.radios = [];
		},
		showErrors:function(el,name,type){
			var text = document.createTextNode(type ? lpform.datas.valid[name][type] : lpform.datas.valid[name]),
				span = document.createElement('span');
				span.className = "formerror";
				span.appendChild(text),
				parent = el.parentNode;
			if(parent.lastChild == el || type==="radio") parent.appendChild(span);
			else parent.insertBefore(span,el.nextSibling);
		}
	},
	check:{
		inputs:{
			radio: function(el){
				var name = el.getAttribute('name');
				if(!el.checked){
					if(lpform.datas.radios.indexOf(name)===-1){ 
						lpform.datas.radios.push(name);
						var radios = el.parentNode.getElementsByTagName('input'),
						checked = false;
						for (var i = radios.length - 1; i >= 0; i--) {
							if(radios[i].checked){ 
								checked = true;
								lpform.datas.formdata[radios[i].getAttribute('name')] = radios[i].value;
							}
						}
						return checked;
					}
				}else lpform.datas.formdata[el.getAttribute('name')] = el.value;
				return true;
			},
			checkbox: function(el){
				return el.checked;
			},
			tel: function(el){
				return el.value.length > 5 && !isNaN(el.value);
			},
			email: function(el){
				return new RegExp(/^.{2,}@.{2,}\..{2,}$/,"g").test(el.value);
			},
			text: function(el){
				return el.value.length;
			}
		},
		textarea: function(el){
			return el.value.length;
		},
		select: function(el){
			return el.value.length;
		},
		input: function(el){
			var $this = this;
			switch(el.getAttribute('type')){
				case 'radio':
					return $this.inputs.radio(el);
				break;
				case 'checkbox':
					return $this.inputs.checkbox(el);
				break;
				case 'tel':
					return $this.inputs.tel(el);
				break;
				case 'email':
					return $this.inputs.email(el);
				break;
				case 'text':
					return $this.inputs.text(el);
				break;
				case 'password':
					return $this.inputs.text(el);
				break;
				default:
				    return true;
				break;
			}
		}
	},
	windowWidth: function(){
		var winW = 0;
		if (document.body && document.body.offsetWidth) winW = document.body.offsetWidth;
		if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) winW = document.documentElement.offsetWidth;
		if (window.innerWidth && window.innerHeight) winW = window.innerWidth;
		return winW;
	},
	windowHeight: function(){
		var winH = 0;
		if (document.body && document.body.offsetWidth) winH = document.body.offsetHeight;
		if (document.compatMode=='CSS1Compat' && document.documentElement && document.documentElement.offsetWidth ) winH = document.documentElement.offsetHeight;
		if (window.innerWidth && window.innerHeight) winH = window.innerHeight;
		return winH;
	},
	hasClass: function(target, className){
		return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
	},
	isnull:function(str){
	    return !(typeof str !=="undefined" && str!==null && str!=="");
	}
}
window.onload = function(){ return lpform.init(); }