// Extension event listeners are a little different from the patterns you may have seen in DOM or
// Node.js APIs. The below event listener registration can be broken in to 4 distinct parts:
//
// * chrome      - the global namespace for Chrome's extension APIs
// * runtime     – the namespace of the specific API we want to use
// * onInstalled - the event we want to subscribe to
// * addListener - what we want to do with this event
//
// See https://developer.chrome.com/docs/extensions/reference/events/ for additional details.
// chrome.runtime.onInstalled.addListener(async () => {

//   // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
//   // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
//   // runtime.
//   let url = chrome.runtime.getURL("hello.html");

//   // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
//   //
//   // Many of the extension platform's APIs are asynchronous and can either take a callback argument
//   // or return a promise. Since we're inside an async function, we can await the resolution of the
//   // promise returned by the tabs.create call. See the following link for more info on async/await.
//   // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
//   let tab = await chrome.tabs.create({ url });

//   // Finally, let's log the ID of the newly created tab using a template literal.
//   // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
//   //
//   // To view this log message, open chrome://extensions, find "Hello, World!", and click the
//   // "service worker" link in the card to open DevTools.
//   console.log(`Created tab ${tab.id}`);
// });

// chrome.action.onClicked.addListener((tab) => {
//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     files: ['content-script.js']
//   });
// });

console.log('kingdee background loaded');

chrome.runtime.onMessage.addListener((message, sender, reply) => {
    //chrome.runtime.onMessage.removeListener(event);
    console.log('message -> kingdee ',message);
  });

const filter = {
    url: [
      {
        urlMatches: 'http://fx.hzrobam.com/*',
      },
    ],
  };

chrome.webNavigation.onCompleted.addListener(
    ()=>{
        chrome.tabs.query({
            active: true,
            lastFocusedWindow: true
          }, (tabs) => {
            console.log('tabs -> ',tabs);
            let message = {
              //这里的内容就是发送至content-script的内容
              info: 'Stock'
            }
            chrome.tabs.sendMessage(tabs[0].id, message, res => {
              console.log('bg=>content');
              console.log(res);
            })
          })
    },
    filter
  )

  chrome.webRequest.onCompleted.addListener(
    (details)=>{
      
      if(details.url == 'http://fx.hzrobam.com/DWGateway/restful/Base/IWarehouseService/getWarehouseList'){
        //console.log('kingde onCompleted for WarehouseList',details);
      }else{
        //console.log('onCompleted other -> ',details);
      }
    },
    {urls: ["http://fx.hzrobam.com/*"]},
  )
  
  chrome.webRequest.onBeforeRequest.addListener(
    (details)=> {
      if (details.url=="http://fx.hzrobam.com/DWGateway/restful/Base/IWarehouseService/getWarehouseList") {
        //console.log('kingde onBeforeRequest  for WarehouseList',details);
      }else{
        //console.log('onBeforeRequest other -> ',details);
      }
    },
    {urls: ["http://fx.hzrobam.com/*"]},
    );


//   chrome.runtime.onConnect.addListener(function(devToolsConnection) {
//     // assign the listener function to a variable so we can remove it later
//     var devToolsListener = function(message, sender, sendResponse) {
//         // Inject a content script into the identified tab
//         chrome.scripting.executeScript(message.tabId,
//             { file: message.scriptToInject });
//     }
//     // add the listener
//     devToolsConnection.onMessage.addListener(devToolsListener);

//     devToolsConnection.onDisconnect.addListener(function() {
//          devToolsConnection.onMessage.removeListener(devToolsListener);
//     });
// });
var TabHasBeenAttach = [];
var currentTab_id=null
 
chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {
  //得到当前标签
chrome.tabs.query(
    {
        active: true,
        lastFocusedWindow: true
    },
    function(tabArray) {
        var currentTab = tabArray[0];
        if(currentTab.url)
        if(currentTab_id==currentTab.id)
        {
          return
        }else{
          Attach(currentTab.id)
        }
    }
  )
 
//将当前页面Attach到调试器
  function Attach(id)
  {
    //if(TabHasBeenAttach.indexOf(id) == -1){
      TabHasBeenAttach.push(id);
      chrome.debugger.attach({ 
        tabId: id
      }, "1.3", onAttach.bind(null, id));
    //}else{
    //  console.log('已经附加调试器的窗口禁止再次附加');
    //}
  }
//Attach成功后,开启网络并禁止缓存
  function onAttach(tabId) {
    currentTab_id=tabId
    chrome.debugger.sendCommand({ //first enable the Network
        tabId: tabId
    }, 
    "Network.enable",
    function(){
      chrome.debugger.sendCommand(
        { tabId: tabId }, 
        "Network.setCacheDisabled",
        {cacheDisabled:true},
        function(){
          console.log("缓存已经禁用!")
        }
      )
    });
    console.log("调试器已经附加")
    chrome.debugger.onEvent.addListener(allEventHandler);
 
    };
  
  //接受Debugger的Events
  function allEventHandler(debuggeeId, message, params){
  
    // console.log(params)
    if (currentTab_id != debuggeeId.tabId) {
        return;
    }
  
    if (message == "Network.responseReceived") {
        console.log("responseReceived ",params,"\nmessage ",message)
        chrome.debugger.sendCommand({tabId: debuggeeId.tabId}, "Network.getResponseBody", {"requestId": params.requestId}, 
        function(response) {
          console.log ('1111 response -> ',response)
            //response就是接受到的ResponseBody,可以通过RequstId来判断是哪个Request的Response
            if(typeof response?.base64Encoded != 'undefined' /*&& response?.base64Encoded*/)
            {
              if(typeof response?.body != 'undefined'){
                
                try{
                  if(typeof JSON.parse(response?.body) != 'undefined' ){
                    //console.log('Network.getResponseBody requestId -> ',response);
                    if(typeof JSON.parse(response?.body)?.duration != 'undefined'){
                      if(JSON.parse(response?.body)?.duration != -1){
                        //仓库处理情况
                        if(typeof JSON.parse(response?.body)?.response?.data?.datas != 'undefined'){
                          console.log('库存类型已经获取 ==>  ',JSON.parse(response?.body)?.response?.data?.datas);
                        }
                        //console.log('Network.getResponseBody requestId -> ',JSON.stringify(response));
                        
                      }
                    }
                  }
                }catch(e){
                  //console.log('error occ -> ',e);
                }
             
              }else{
                //console.log('Network.getResponseBody requestId -> ',response);
              }
            }
            //else{
            //   //console.log('Network.getResponseBody requestId -> ',response);
            // }
            
        });
    }
  
  }
  
});
