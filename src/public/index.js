const socket = io();

let user;
let chatBox = document.getElementById("chatBox");

Swal.fire({
  title: "Enter your name",
  input: "text",
  text: "Enter your name",
  inputValidator: (value) => {
    if (!value) {
      return "You need to write something!";
    }
  },
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

chatBox.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", {
        user: user,
        message: chatBox.value,
      });
      chatBox.value = "";
    }
  }
});

//SOCKETS

socket.on("newUser", (data) => {
  alert("new user");
  //   Swal.fire({
  //     icon: "success",
  //     text: "Usuario conectado",
  //     toast: true,
  //     position: "top-end",
  //   });
});

socket.on("log", (data) => {
  let log = document.getElementById("log");
  let messages = "";
  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message}</br>`;
  });
  log.innerHTML = messages;
});
