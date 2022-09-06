chrome.devtools.panels.create(

    // title
    'RobanToKingdee',
  
    // iconPath
    null,
  
    // pagePath
    'panel.html'
  );
// // chrome.devtools.panels.create("Kingdee_Sync_Panel",
// //     "spinner_progress.gif",
// //     "devtools.html",
// //     function(panel) {
// //       // code invoked on panel creation
// //     }
// // );

// chrome.devtools.panels.create("My Panel",
//     "MyPanelIcon.png",
//     "Panel.html",
//     function(panel) {
//       // code invoked on panel creation
//     }
// );

// chrome.devtools.network.onRequestFinished.addListener((request)=>{
//     console.log('kingdee 0-> ',request);
// });

// // DevTools page -- devtools.js
// // Create a connection to the background page
// var backgroundPageConnection = chrome.runtime.connect({
//     name: "devtools-page"
// });

// backgroundPageConnection.onMessage.addListener(function (message) {
//     // Handle responses from the background page, if any
//     console.log('kingdee -> ',message.content);
// });



// // Relay the tab ID to the background page
// // backgroundPageConnection.postMessage({
// //     tabId: chrome.devtools.inspectedWindow.tabId,
// //     scriptToInject: "content_script.js"
// // });