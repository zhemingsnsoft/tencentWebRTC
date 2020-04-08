// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:6000');
console.log("walaoeheheheheh")
// Connection opened
socket.addEventListener('open', function (event) {
  let pingpong = setInterval(() => {
    console.log("walaosend")
    socket.send('Hello Server!');
  }, 20000);
  // socket.send('Hello Server!');
  console.log("walaoheheheheh")
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
  let message = "";
  try {
    console.log("trywalao")
    message = JSON.parse(event.data);
  } catch (e) {
    console.log("catchwalao", e)
    message = event.data
  }

  if (message && message.client && message.roomId) {
    console.log("walaohahaha1111")
    var r = confirm(message.userId + "呼叫!");
    if (r == true) {
      console.log("walaohahahaha2")
      // e.preventDefault();
      console.log('join');
      if (rtc) return;
      const userId = $('#userId').val();
      // const roomId = $('#roomId').val();
      const config = genTestUserSig(userId);
      rtc = new RtcClient({
        userId,
        roomId: message.roomId,
        sdkAppId: config.sdkAppId,
        userSig: config.userSig,
        video: true
      });
      rtc.join();
    }
  }
});

/* eslint-disable require-jsdoc */

// initialize userId/roomId
$('#userId').val('user_' + parseInt(Math.random() * 100000000));
$('#roomId').val('889988');

let rtc = null;

// $('#join').on('click', function(e) {
//   e.preventDefault();
//   console.log('join');
//   if (rtc) return;
//   const userId = $('#userId').val();
//   const roomId = $('#roomId').val();
//   const config = genTestUserSig(userId);
//   rtc = new RtcClient({
//     userId,
//     roomId,
//     sdkAppId: config.sdkAppId,
//     userSig: config.userSig
//   });
//   rtc.join();
// });

$('#publish').on('click', function(e) {
  e.preventDefault();
  console.log('publish');
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.publish();
});

$('#unpublish').on('click', function(e) {
  e.preventDefault();
  console.log('unpublish');
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.unpublish();
});

$('#leave').on('click', function(e) {
  e.preventDefault();
  console.log('leave');
  if (!rtc) {
    Toast.error('请先加入房间！');
    return;
  }
  rtc.leave();
  rtc = null;
});

$('#settings').on('click', function(e) {
  e.preventDefault();
  $('#settings').toggleClass('btn-raised');
  $('#setting-collapse').collapse();
});
