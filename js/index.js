// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:8100');
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
});
// alert("I am an alert box!");

/* eslint-disable require-jsdoc */

// initialize userId/roomId
$('#userId').val('user_' + parseInt(Math.random() * 100000000));
$('#roomId').val('889988');

let rtc = null;

$('#join').on('click', function(e) {
  e.preventDefault();
  console.log('join');
  if (rtc) return;
  const userId = $('#userId').val();
  const roomId = $('#roomId').val();
  const config = genTestUserSig(userId);
  rtc = new RtcClient({
    userId,
    roomId,
    sdkAppId: config.sdkAppId,
    userSig: config.userSig,
    video: true
  });
  rtc.join();
  let sendData = {client: true, roomId: roomId, userId: userId};
  console.log("walaosenddddddd")
  socket.send(JSON.stringify(sendData));
});

$('#joinCall').on('click', function(e) {
  e.preventDefault();
  console.log('join');
  if (rtc) return;
  const userId = $('#userId').val();
  const roomId = $('#roomId').val();
  const config = genTestUserSig(userId);
  rtc = new RtcClient({
    userId,
    roomId,
    sdkAppId: config.sdkAppId,
    userSig: config.userSig,
    video: false
  });
  rtc.join();
  let sendData = {client: true, roomId: roomId, userId: userId};
  console.log("walaosenddddddd", sendData)
  socket.send(JSON.stringify(sendData));
});

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
