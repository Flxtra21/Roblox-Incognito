// login elements

const login = document.querySelector(".login")
const loginForm = login.querySelector(".login-form")
const loginInput = login.querySelector(".login-input")

//chat elements
const chat = document.querySelector(".chat")
const chatForm = chat.querySelector(".chat-form")
const chatInput = chat.querySelector(".chat-input")
const chatMessages = chat.querySelector(".chat-messages")
const chatAdmin = chat.querySelector(".Admin")





const colors = ["darkslateblue", "indigo", "deepskyblue", "fuchsia", "deeppink", "darkorange", "bisque",
    "blanchedalmond", "chocolate", "darkolivegreen", "darkorange", "darksalmon", "honeydew", "lightsalmon",
    "lime", "limegreen", "mintcream", "olive", "olivedrab", "orange", "orangered", "papayawhip",
    "peachpuff", "plum", "salmon", "tomato", "wheat"
]

const user = { id: "", name: "", color: "" }
let websocket

const createSelfMsg = (content,admin) => {       
    const div = document.createElement("div") 
    div.classList.add("message-self")
    div.innerHTML = content
    return div
}

const createOtherMsg = (admin, content, sender, senderColor) => {
    const div = document.createElement("div")
    const spanName = document.createElement("span")
    div.classList.add("message-other")
    spanName.classList.add("message-sender")
    spanName.style.color = senderColor
    div.appendChild(spanName)
    spanName.innerHTML = sender
    div.innerHTML += content 

    return div
}

const getRandomColors = () => {
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}



const processMessage = ({ data }) => {
    const { userId, userName, userColor, content } = JSON.parse(data) 
    const msg = userId == user.id ? createSelfMsg(content) : createOtherMsg(content,userName, userColor) 

    chatMessages.appendChild(msg)

}


const handleLogin = (event) => {
    event.preventDefault()
    
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = getRandomColors()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("ws://localhost:8080")
    websocket.onmessage = processMessage
}

const sendMessage = () => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))
    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)