var data = {};
try {
    data = JSON.parse(localStorage.options);   
} catch(e){  
}
var defaults = {
    lang: ''
};

var options = {};
for(var id in defaults){
    options[id] = data[id] === undefined ? defaults[id] : data[id];
}

window.onload = function(){
    var save = document.getElementById('save');
    var items = document.querySelectorAll('.lang');    
    for(var i = 0; i < items.length; i++){
        items[i].textContent = chrome.i18n.getMessage(items[i].id);
    }

    save.value = chrome.i18n.getMessage('save');

    document.getElementById('restore_defaults').addEventListener('click', function(){
        window.localStorage.options = JSON.stringify(defaults);
        location.reload();       
    });

    if(options.lang){
        document.getElementById('lang').value = options.lang;
    } else {
        chrome.i18n.getAcceptLanguages(function(languages) {
            document.getElementById('lang').value = languages[0].substr(0, 2);
        });
    }
    
    document.getElementById('form').addEventListener('submit', function(e){
        e.preventDefault();
        var data = {
            lang: document.getElementById('lang').value
        }
        window.localStorage.options = JSON.stringify(data);
        chrome.extension.getBackgroundPage().updateOptions();
        save.className = 'saved';
        save.value = chrome.i18n.getMessage('saved');
        return false;
    });
    
    document.getElementById('form').addEventListener('change', function(){
        save.className = '';
        save.value = chrome.i18n.getMessage('save');
    });
}

var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-7218577-47']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();