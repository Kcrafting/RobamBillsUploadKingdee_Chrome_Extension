// chrome devtools extension中不能使用console.log
// const log = (...args) => chrome.devtools.inspectedWindow.eval(`
//     console.log(...${JSON.stringify(args)});
// `);

// log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
// // 注册回调，每一个http请求响应后，都触发该回调
// chrome.devtools.network.onRequestFinished.addListener(async (...args) => {
//     let b = document.getElementById('body22');
//     b.appendChild(document.createTextNode("测试金蝶"));
//     try {
//         const [{
//             // 请求的类型，查询参数，以及url
//             request: { method, queryString, url },

//             // 该方法可用于获取响应体
//             getContent,
//         }] = args;
//         console.log('dddddddd  ',method, queryString, url);
//         log('dddddddd  ',method, queryString, url);

//         // 将callback转为await promise
//         // warn: content在getContent回调函数中，而不是getContent的返回值
//         const content = await new Promise((res, rej) => getContent(res));
//         // log(content);
//     } catch (err) {
//         log(err.stack || err.toString());
//     }
// });


chrome.devtools.network.onRequestFinished.addListener(request => {
    request.getContent((body) => {
      if (request.request && request.request.url) {
        //if (request.request.url.includes('<url-to-intercept>')) {
          chrome.runtime.sendMessage({
              response: body
          });
        //}
      }
    });
  });