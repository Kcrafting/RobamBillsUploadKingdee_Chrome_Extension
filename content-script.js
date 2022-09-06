document.body.style.backgroundColor = 'orange';
//var iframeURL = chrome.runtime.getURL('iframe.html');
//let myIframe = $('<iframe id="cont-iframe"  frameborder="0" scrolling="yes" name="main" src="'+iframeURL+'">不支持iframe</iframe>')
//document.body.appendChild(myIframe);
//let bt = document.getElementById('su');
function AddModalDialog(){
    let root_parent = document.createElement('div');
    root_parent.style.backgroundColor='blue';
    root_parent.style.visibility = "hidden";
    let topdiv = document.createElement('div');
    let contentdiv = document.createElement('div');
    let titlediv = document.createElement('div');
    let closebt = document.createElement('button');
    closebt.style.backgroundColor = 'transparent'
    let bottomdiv = document.createElement('div');

    root_parent.className = "modal-box";
    topdiv.className = "modal-box-top";
    titlediv.className="modal-box-title";
    closebt.className="modal-close";
    closebt.addEventListener('click',function(){
        modalClose();
    });
    topdiv.appendChild(titlediv);
    topdiv.appendChild(closebt);
    contentdiv.className = "modal-box-content";
    bottomdiv.className = "modal-box-bottom";


    root_parent.appendChild(topdiv);
    root_parent.appendChild(contentdiv);
    root_parent.appendChild(bottomdiv);
    
    document.body.appendChild(root_parent);
    
}
AddModalDialog();
//显示模态框
function modalOpen() {
	//获取模态框对象   getElementsByClassName获取到的是一个数组对象
    let modal = document.getElementsByClassName("modal-box")[0];
    //获取浏览器当前宽高
    let documentWidth = window.innerWidth;
    let documentHeight = window.innerHeight;
    //获取模态框宽度
    
    let modalWidth = modal.offsetWidth;
    console.log('浏览器宽度',documentWidth);
    console.log('模态框宽度',modalWidth);
    console.log('起始位置',(documentWidth - modalWidth) / 2.0);
    //模态框距离浏览器右侧的距离就是（浏览器宽度-模态框宽）/ 2.0
    //注意，需要把结果转为字符串类型
    modal.style.left = ((documentWidth - modalWidth) / 2.0).toString() + 'px';
    //设置为可见
    modal.style.visibility = "visible";
}

//模态框关闭
function modalClose() {
	//获取模态框
    let modal = document.getElementsByClassName("modal-box")[0];
    //设置为不可见
    modal.style.visibility = "hidden";
}

console.log(' 你好');
//console.log(bt);
//bt.value='你好';

let sp = document.getElementsByClassName('MuiBottomNavigation-root css-we40v6');
let i = 0;
for (i = 0; i < sp.length; i++) {
    sp[i].style.backgroundColor = "red";
    let node=document.createElement("BUTTON");
    node.id='mybt'
    node.className="mybt"
    let bttxt=document.createTextNode("上传金蝶");
    node.style.width='80px'
    node.style.height='30px'
    node.style.backgroundColor='blue'
    //node.disabled = true;
    node.style.borderWidth='0px'
    node.style.textAlign = 'center'
    node.style.borderRadius='4px'
    node.style.color='white'
    node.style.padding='0px'
    node.addEventListener('click',function(){
        //window.alert('错误  顶顶顶顶');
        modalOpen();
        //showiframe();
    })
    
    node.appendChild(bttxt)
    sp[i].appendChild(node);
}
i = 0;
let list = document.getElementById('hotsearch-content-wrapper');
// let txtd = '';
// for (i = 0; i < list.length; i++) {
//     sp[i].style.backgroundColor = "red";
//     let node=document.createTextNode("这是一个新段落。");
//     sp[i].appendChild(node);
// }
function createiframe(){
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
    hideiframe();
})
imageElement.src = chrome.runtime.getURL("spinner_progress.gif");

modalDialogTextSpan.appendChild(modalDialogText);
modalDialogTextDiv.appendChild(modalDialogTextSpan);
modalDialogTextDiv.appendChild(breakElement);
modalDialogTextDiv.appendChild(breakElement);
modalDialogTextDiv.appendChild(imageElement);

modalDialogSiblingDiv.appendChild(modalDialogTextDiv);
modalDialogParentDiv.appendChild(modalDialogSiblingDiv);

wrapperDiv.id = "zjf11";
modalDialogParentDiv.id = "zjf22";
document.body.appendChild(wrapperDiv);
document.body.appendChild(modalDialogParentDiv);
}

createiframe();
document.getElementById("zjf11").style.visibility = 'hidden';
document.getElementById("zjf22").style.visibility = 'hidden';
function showiframe(){
    document.getElementById('zjf11').style.visibility="visible";
    document.getElementById('zjf22').style.visibility="visible";
}
function hideiframe(){
    document.getElementById('zjf11').style.visibility="hidden";
    document.getElementById('zjf22').style.visibility="hidden";
}
//不同页面判断添加上传按钮 同时在分录上进行判断 是否进行过上传，已经上传的部分将不能重复进行上传

//点击上传 解析页面数据

//将数据Post到服务器进行判断。确认上传是否成功

//数据回传更新单据状态