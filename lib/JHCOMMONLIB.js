function copyObject(item) {//传入任意对象，返回深复制的新对象（去引用）
    let d = {};
    for (let i of Object.keys(item)) {
        d[i] = item[i];
    }
    return d;
}

function commonAjax(url, data, good, bad, f, method) {//标准ajax模板，good，bad，f，method
    $.ajax({
        url: url,
        data: data,
        method: method,
        success: function (res) {
            res=safeJson(res);
            if (goodRequest(res)) {
                good();
            } else {
                bad();
            }
        },
        complete: f,

    })
}

function safeJson(str) {//parse JSON if it is not a Object.
    try {
        if(str.content){
            return str;
        }
        if (typeof JSON.parse(str) == "object") {
            return JSON.parse(str);
        }
    } catch (e) {
        console.error("Parse Error For String:",str);
        return "parse Error.";

    }

}

function goodRequest(res) {//Return Res.status==good
    return res.status === "good";
}

function timeStampNow() {
    return new Date().getTime();
}

function getUrlString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return null;
}


function AssginToStringClass(StringName, Value) {
    for (let a of document.getElementsByClassName("String-" + StringName)) {
        a.innerHTML = Value;
    }
}

function remove(arr, index) {
    console.log(arr);
    arr.splice(index, 1);

}

function jumpTo(url, refArr) {
    let nUrl = url;
    if (refArr) {
        nUrl +=  "?";
        for (let i of refArr) {
            nUrl += i.k + "=" + i.v + "&";
        }
    }

    console.log("jumping to "+nUrl);

    window.location.href = nUrl;

}

//

function refresh() {
    location.reload();
}

function findElement(id) {
    return document.getElementById(id);
}

function findElementGlobal(str) {
    return document.querySelector(str);
}


function setCookie(name,value,hour) {
    var expires = "";
    if (hour) {
        var date = new Date();
        date.setTime(date.getTime() + (hour*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
function log(str,info="") {
    console.log(str,info);
}

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}

function emptyNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function standardRender(on,template,dataset,selectorTag,empty) {//dataset must be an array contains object which keys is reflected to the template;

    if(DEBUG)
        console.log(on,template,dataset,selectorTag,empty);
    if(on){
        if(empty){
            emptyNode(on);
        }
        for(let i of dataset){
            on.appendChild( createDocument(templateFill(template,i),selectorTag));
        }
    }
}


function createDocument(txt,s) {
    //console.log(txt);
    return new DOMParser().parseFromString(txt, 'text/html').querySelector(s);
}

function templateFill(template, Arr) {
    for (keys of Object.keys(Arr)) {
        // console.log("{"+keys+"}");
        template = replaceAll(template, "{{" + keys + "}}", Arr[keys]);
        // console.log(template);
    }
    return template;

}

function replaceAll(str, find, replace) {
    // console.log(find,replaces);
    while (str.indexOf(find) !== -1) {
        //console.log(str.indexOf(find));
        str = str.replace(find, replace);

    }
    return str;
}

function logError(t) {
    M.toast({html: t, classes:'rounded', displayLength:3000});
    console.error(t);

}

function pad2(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i
}
function padN(num, length) {
    if(!isNaN(parseInt(num))){
        for(var len = (num + "").length; len < length; len = num.length) {
            num = "0" + num;
        }

    }
    return num;
}


function checkIfValid(obj) {
    return typeof (obj) !== "undefined";
}









