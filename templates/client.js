function openSocket() {
  socket = new WebSocket("ws://0.tcp.ap.ngrok.io:13176");
  let msg = document.getElementById("msg");
  socket.addEventListener("open", (e) => {
    document.getElementById("status").innerHTML = "Opened";
  });
  socket.addEventListener("message", (e) => {
    let ctx = msg.getContext("2d");
    let image = new Image();
    image.src = URL.createObjectURL(e.data);
    image.addEventListener("load", (e) => {
      ctx.drawImage(image, 0, 0, msg.width, msg.height);
    });
  });
}
