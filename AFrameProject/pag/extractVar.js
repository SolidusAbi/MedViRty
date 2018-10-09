
function SelectExample() {
    var paramstr = document.location.search.substr(1);
    var paramarr = paramstr.split("&");
    var params = {};


    for (var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    if (params['indice']) {
        return params['indice'];
    } else {
        console.log('Ha habido un error en el HTML origen');
    }
}
