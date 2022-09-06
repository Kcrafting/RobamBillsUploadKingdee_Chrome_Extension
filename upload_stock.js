//document.body.style.backgroundColor = 'red';
window.zjf_Create_Dialog = false;
console.log('老板导入金蝶插件已经启动_仓库');
document.addEventListener('DOMContentLoaded', fireContentLoadedEvent, false);

function fireContentLoadedEvent () {
    console.log ("DOMContentLoaded");
    // PUT YOUR CODE HERE.
    //document.body.textContent = "Changed this!";
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.info)
    // 这里是返回给bg的内容
    sendResponse('get the message');
    if(request.info == 'Stock'){
        let menubarcontainer = document.getElementsByClassName('row tool-bar')[0]?.getElementsByTagName('ul');
        console.log('kingdee -> ',menubarcontainer);
        if(menubarcontainer.length > 0){
            console.log('kingdee - 大于0> ');
        }else{
            console.log('kingdee -> 等于小于0');
        }
    }
})

function Inject_Html(){
    let _Menu_Container = document.getElementsByClassName('row tool-bar');
    if(typeof(_Menu_Container) != 'undefined'){
        let _Menu_bar = _Menu_Container[0]?.getElementsByTagName('ul')[0];
        if(typeof(_Menu_bar) != 'undefined'){
            console.log(' _Menu_bar.appendChild ',_Menu_bar);
            let _Menu_Item = document.createElement('li');
            let _Menu_Item_a = document.createElement('a');
            let _Menu_Item_p = document.createElement('p');
            let _Menu_Item_Span = document.createElement('span');
            _Menu_Item_Span.appendChild(document.createTextNode("上传金蝶"));
            _Menu_Item_p.setAttribute('class','icon-export');
            //menuItemp.appendChild(document.createTextNode("::before"))
            _Menu_Item_a.setAttribute('href','javascript:void(0);');
            _Menu_Item_a.appendChild(_Menu_Item_p);
            _Menu_Item_a.appendChild(_Menu_Item_Span);
            _Menu_Item.appendChild(_Menu_Item_a);
            _Menu_Item.addEventListener('click',()=>{
                console.log('点击');
                // if(!window.zjf_Create_Dialog){
                //     Create_Dialog();
                // }
                //Show_Dialog();
                //GetPageData();
                analysisDom();
            })
            _Menu_bar.appendChild(_Menu_Item);
            return true;
        }else{
            console.log('没有获取到菜单栏');
            return false;
        }
    }else{
        console.log('页面没有加载完毕');
        return false;
    }
    return false;
}
let t = 0;
let inject = ()=>{
    console.log('尝试插入html');
    if(Inject_Html()){
        window.clearInterval(t);
    }
};
t = window.setInterval(inject,2000);



    function Create_Dialog(){
    if(!window.zjf_Create_Dialog){
        wrapperDiv = document.createElement("div");
        wrapperDiv.setAttribute("style","position: absolute; left: 0px; top: 0px; background-color: rgb(255, 255, 255); opacity: 0.5; z-index: 2000; height: 100vh; width: 100vw;");
        
        iframeElement = document.createElement("iframe");
        iframeElement.setAttribute("style","width: 100%; height: 100%;");
        
        wrapperDiv.appendChild(iframeElement);
        
        modalDialogParentDiv = document.createElement("div");
        modalDialogParentDiv.setAttribute("style","position: absolute; width: 350px; border: 1px solid rgb(51, 102, 153); padding: 10px; background-color: rgb(255, 255, 255); z-index: 2001; overflow: auto; text-align: center; top: calc(100vh / 2);left: calc((100vw - 350px) / 2)");
        
        modalDialogSiblingDiv = document.createElement("div");
        
        modalDialogTextDiv = document.createElement("div"); 
        modalDialogTextDiv.setAttribute("style" , "text-align:center");
        
        modalDialogTextSpan = document.createElement("span"); 
        modalDialogText = document.createElement("strong"); 
        modalDialogText.innerHTML = "上传中...  请等待操作完成.";
        
        breakElement = document.createElement("br"); 
        imageElement = document.createElement("img"); 
        imageElement.style.height = '40px'
        imageElement.style.width = '40px'
        imageElement.addEventListener('click',function(){
            Hide_Dialog();
        })
        imageElement.src = chrome.runtime.getURL("spinner_progress.gif");
        
        modalDialogTextSpan.appendChild(modalDialogText);
        modalDialogTextDiv.appendChild(modalDialogTextSpan);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogTextDiv.appendChild(breakElement);
        modalDialogTextDiv.appendChild(imageElement);
        
        modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
        modalDialogParentDiv.appendChild(modalDialogSiblingDiv);
        
        wrapperDiv.id = "zjf_wrapperDiv_1";
        modalDialogParentDiv.id = "zjf_wrapperDiv_2";
        document.body.appendChild(wrapperDiv);
        document.body.appendChild(modalDialogParentDiv);
        window.zjf_Create_Dialog = true;
    }
    }
    function Show_Dialog(){
        document.getElementById('zjf_wrapperDiv_1').style.visibility="visible";
        document.getElementById('zjf_wrapperDiv_2').style.visibility="visible";
    }
    function Hide_Dialog(){
        document.getElementById('zjf_wrapperDiv_1').style.visibility="hidden";
        document.getElementById('zjf_wrapperDiv_2').style.visibility="hidden";
    }
    function GetPageData(){
        //先获取到表格
        let _Data_Table = document.getElementsByClassName('ui-grid-contents-wrapper')[0];
        console.log('kingdee -> ',_Data_Table);
        let _Sub_Node = _Data_Table.getElementsByClassName('ng-binding ng-scope');
        if(typeof(_Sub_Node) != 'undefined'){
            let i = 0;
            for(i = 0;i<_Sub_Node.length;i++){
                //if(_Data_Table[i].ClassName == 'ng-binding ng-scope')
                console.log('Kingdee_Sub_Node -> ',_Sub_Node[i].innerHTML);
            }
        }else{
            console.log('_Sub_Node -> _Sub_Node is undefined');
        }
        // let _Data_Div = document.getElementsByClassName('ng-binding ng-scope');
        // if(typeof(_Data_Div) != 'undefined'){
        //     // _Data_Div.forEach(element => {
        //     //     console.log(element.innerHTML);
        //     // });
        //     let i = 0;
        //     for(i = 0;i<_Data_Div.length;i++){
        //         console.log(_Data_Div[i].innerHTML);
        //     }
        // }
    }
    let fieldMap = [];
    //fieldMap['ddd'] = 'dedee';
let analysisDom = (tablename,headername,)=>{
    //查找标题
    let headers = document.getElementsByClassName('ui-grid-header-cell-label ng-binding');
    if(typeof headers !== 'undefined' && headers.length > 0){
        for(let i = 0;i<headers.length;i++){
            fieldMap.add
            console.log(headers[i].innerHTML);
            fieldMap.push(headers[i].innerHTML.replace('<sup class=\"red\">*</sup>','').replace(' ',''))
        }
    }
    console.log('fieldMap',fieldMap);

    //查找数据行
    let rows = document.getElementsByClassName('ui-grid-canvas ng-scope');
    if(typeof rows !== 'undefined' && rows.length > 0){
        let retlist = [];
        for(let i = 0;i<rows.length;i++){
            let item = rows[i].getElementsByClassName('ng-binding ng-scope');
            if(typeof item == 'undefined' || item == null || item.length == 0){
                continue;
            }
            let obj = new Object();
            let hasp = false;
            for(let j = 0 ;j < item.length ; j++){
                obj[fieldMap[j]] = item[j].innerHTML;
                hasp = true;
            }
            if(hasp){
                retlist.push(obj);
            }
            console.log('obj',obj);
        }
        console.log(retlist);
        
    }
    //添加对象
}
    // function interceptData() {
    //     var xhrOverrideScript = document.createElement('script');
    //     xhrOverrideScript.type = 'text/javascript';
    //     xhrOverrideScript.innerHTML = `
    //     (function() {
    //       var XHR = XMLHttpRequest.prototype;
    //       var send = XHR.send;
    //       var open = XHR.open;
    //       XHR.open = function(method, url) {
    //           this.url = url; // the request url
    //           return open.apply(this, arguments);
    //       }
    //       XHR.send = function() {
    //           this.addEventListener('load', function() {
    //               if (this.url.includes('<url-you-want-to-intercept>')) {
    //                   var dataDOMElement = document.createElement('div');
    //                   dataDOMElement.id = '__interceptedData';
    //                   dataDOMElement.innerText = this.response;
    //                   dataDOMElement.style.height = 0;
    //                   dataDOMElement.style.overflow = 'hidden';
    //                   document.body.appendChild(dataDOMElement);
    //               }               
    //           });
    //           return send.apply(this, arguments);
    //       };
    //     })();
    //     `
    //     document.head.prepend(xhrOverrideScript);
    //   }
    //   function checkForDOM() {
    //     if (document.body && document.head) {
    //       interceptData();
    //     } else {
    //       requestIdleCallback(checkForDOM);
    //     }
    //   }

    //   requestIdleCallback(checkForDOM);


    //   function scrapeData() {
    //     var responseContainingEle = document.getElementById('__interceptedData');
    //     if (responseContainingEle) {
    //         var response = JSON.parse(responseContainingEle.innerHTML);
    //     } else {
    //         requestIdleCallback(scrapeData);
    //     }
    // }
    // requestIdleCallback(scrapeData); 

// function Inject_Html(){
//     ///注入菜单
//     console.log('kingdee ->','document.onload');
//     //let s = document.querySelectorAll('#memberContainer tr') ,i;

//     let s = document.querySelectorAll('#row tool-bar') ;
//     if(s.length > 0){
//         console.log('kingdee -> 大于0')
//     }else{
//         console.log('kingdee -> 等于小于0')
//     }
//     // for(i = 0;i < s.length;++i){
//     //     // if(s[i].innerHTML.indexOf('<') == -1){
//     //     //     ci ++;
//     //     //     txt+=s[i].innerHTML+'\n';
//     //     // }
//     //     let bt = document.createElement('input');
//     //     bt.setAttribute("type","checkbox");
//     //     let bttxt=document.createTextNode("测试子项");
//     //     bt.appendChild(bttxt);
//     //     s[i].appendChild(bt);
//     //     // if(ci == 5){
//     //     //     ci = 0;
//     //     //     txt+=s[i].innerHTML+'\n\n\n';
//     //     // }
//     // }
//     // console.log(txt);

//     // let menubarcontainer = document.getElementsByClassName('row tool-bar');//[0].getElementsByTagName('ul');
//     // console.log('kingdee -> ',menubarcontainer)
//     // if(document.getElementsByClassName('row tool-bar').length > 0){
//     //     console.log('kingdee -> 大于0')
//     //     document.getElementsByClassName('row tool-bar').forEach(element => {
//     //         console.log('kingdee -> ',element);
//     //     });
//     // }else{
//     //     console.log('kingdee -> 等于小于0')
//     // }
//     /*
//     console.log('kingdee -> ',menubarcontainer)
//     let menubar = menubarcontainer[0];//.getElementsByTagName('ul');
//     console.log('kingdee -> ',menubar);
//     let ddd = menubar.getElementsByTagName('ul');
//     console.log('kingdee -> ',ddd);
//     if(typeof(menubar) != 'undefined'){
        // let menuItem = document.createElement('li');
        // let menuItema = document.createElement('a');
        // let menuItemp = document.createElement('p');
        // let menuItemspan = document.createElement('span');
        // menuItemspan.appendChild(document.createTextNode("上传金蝶"));
        // menuItemp.setAttribute('class','icon-export')
        // menuItemp.appendChild(document.createTextNode("::before"))
        // menuItema.setAttribute('href','javascript:void(0);');
        // menuItema.appendChild(menuItemp);
        // menuItema.appendChild(menuItemspan);
        // menuItem.appendChild(menuItema);
        // menubar.appendChild(menuItem);
//     }else{
//         window.alert('注入菜单失败!');
//     }
//     */
// }

// // window.document.onload=()=>{
// //     console.log('kingdee ->','document.onload');
// //     Inject_Html();
// // }
// window.document.addEventListener('DOMContentLoaded', Inject_Html, false);
// //window.document.addEventListener('onload', Inject_Html, false)


