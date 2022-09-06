console.log("kingdee-test 成功加载");
function InjectAction(){
    let group = document.getElementsByClassName("group-page")[0];
    let bt = document.createElement('button');
    bt.addEventListener('click',function(){
        GoThroughList();
    });
    let bttxt=document.createTextNode("测试金蝶");
    bt.appendChild(bttxt);
    group.appendChild(bt);
}
function GoThroughList(){
    let txt = '';
    //let s = document.getElementById('memberContainer') ;
    let ci = 0;
    let s = document.querySelectorAll('#memberContainer tr') ,i;
    for(i = 0;i < s.length;++i){
        // if(s[i].innerHTML.indexOf('<') == -1){
        //     ci ++;
        //     txt+=s[i].innerHTML+'\n';
        // }
        let bt = document.createElement('input');
        bt.setAttribute("type","checkbox");
        let bttxt=document.createTextNode("测试子项");
        bt.appendChild(bttxt);
        s[i].appendChild(bt);
        // if(ci == 5){
        //     ci = 0;
        //     txt+=s[i].innerHTML+'\n\n\n';
        // }
    }
    console.log(txt);
}

InjectAction();