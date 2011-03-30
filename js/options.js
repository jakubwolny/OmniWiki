var data = {};
try {
    data = JSON.parse(localStorage.options);   
}catch(e){  
}
var defaults = {
    lang: ''
};

var options = $.extend({}, defaults, data);

window.onload = function(){
   
    $('.lang').text(function(){
        //console.log($(this).attr('id') + ' => ' + chrome.i18n.getMessage($(this).attr('id')));
        return chrome.i18n.getMessage($(this).attr('id'));
    });

    $('#save').val(chrome.i18n.getMessage('save'));

    $('#restore_defaults').bind('click', function(){
        window.localStorage.options = JSON.stringify(defaults);
        location.reload();       
    });

    if(options.lang){
        $('#lang').val(options.lang);
    }else {
        chrome.i18n.getAcceptLanguages(function(languages) {
            $('#lang').val(languages[0].substr(0, 2));
        });
    }
    
    $('input[type="text"]').keyup(function(){
        $('#save').removeClass('saved').val(chrome.i18n.getMessage('save'));
    });

    $('form').submit(function(){
        var data = {
            lang: $('#lang').val()
        }
        window.localStorage.options = JSON.stringify(data);
        chrome.extension.getBackgroundPage().updateOptions();
        $('#save').addClass('saved').val(chrome.i18n.getMessage('saved'));
        return false;
    }).change(function(){
        $('#save').removeClass('saved').val(chrome.i18n.getMessage('save'));
    });
}