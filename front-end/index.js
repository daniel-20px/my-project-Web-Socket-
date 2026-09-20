const socket = io();

const inputName = document.getElementById("name");
const inputMessage = document.getElementById("message");
const btnSendName = document.getElementById("btn-send");
const pError = document.getElementById('pp');
const messageArea = document.getElementById("welcome");


socket.on("welcome", (msg) => {
    const p = document.createElement("p");
    p.textContent = msg;
    p.classList.add("systemMsg"); 
    messageArea.appendChild(p);
    messageArea.scrollTop = messageArea.scrollHeight;
});

function handlesubmit(event) {
    event.preventDefault();

    if (inputName.value.trim() === "") {
        pError.classList.add('activep');
        return;
    }

    pError.classList.remove('activep');

    const data = {
        name: inputName.value,
        clientId: socket.id,
    };
    socket.emit("welcome", data);

    btnSendName.classList.add('disable');
    inputName.classList.add('disable');
    btnSendName.disabled = true;
    inputName.disabled = true;
}


function handleSendMessage(event) {
    event.preventDefault();

    if (inputName.value.trim() === "") {
        pError.classList.add('activep');
        return;
    }

    if (inputMessage.value.trim() === "") {
        return;
    }

    const data = {
        name: inputName.value,
        message: inputMessage.value,
        senderId: socket.id 
    };

    socket.emit("chat:message", data);
    
    inputMessage.value = "";
    inputMessage.focus();
}


socket.on("chat:sendmessage", (data) => {
    const p = document.createElement("p");
    
    p.textContent = data.message;
    
  
    if (data.senderId === socket.id) {
        p.classList.add("yourMsg"); 
    } else {
       
        p.classList.add("otherMsg"); 
    }

    messageArea.appendChild(p);
    messageArea.scrollTop = messageArea.scrollHeight;
});
