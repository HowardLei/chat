webSocket = null

/**
 * 当点击上线按钮的时候，执行以下方法。
 * @returns {boolean} 当能够成功执行的时候，返回 true ，如果不满足条件，则返回 false
 */
function online() {
    // 获得 IP 地址
    let username = document.getElementById("username").value
    checkWebSocket(username)
    return true
}

/**
 * 当点击下线按钮，执行以下方法。
 * @returns {boolean}
 */
function offline() {
    if (webSocket.readyState === WebSocket.OPEN) {
        webSocket.close()
    } else {
        alert("对不起，该 socket 端口不可用，请重新尝试。")
        return false
    }
}

/**
 * 点击发送按钮向服务器发送消息。
 * @returns {boolean}
 */
function send() {
    let message = document.getElementById("sendMessage").value
    if (message == "") {
        alert("对不起，请先填写发送的消息。")
        return false
    }
    if (typeof webSocket == "undefined") {
        alert("对不起，webSocket 还没有连接。")
        return false
    }
    if (webSocket.readyState === WebSocket.CLOSED) {
        alert("webSocket 已经关闭。请重新连接")
        return false
    }
    webSocket.send(message)
    document.getElementById("sendMessage").value = ""
    return true
}

/**
 * 检查 socket 能否成功调用
 * @param username 检查一下该用户名是否被占用
 */
function checkWebSocket(username) {
    if (typeof WebSocket != "undefined") {
        initSocket(username)
    } else {
        alert("对不起，浏览器无法使用 webSocket。请更换支持的浏览器再进行操作。")
    }
}

/**
 * 初始化 socket
 * @param username 登录上线的用户名
 */
function initSocket(username) {
    webSocket = new WebSocket("ws://127.0.0.1:8080/myChat/" + username)
    webSocket.onopen = function (event) {
        alert("连接成功")
        writeToTextArea("<span style='color: red'>" + username + "已上线" + "</span>")
    }
    webSocket.onclose = function (event) {
        // alert("关闭连接")
        writeToTextArea("<span style='color: red'>" + username + "已下线" + "</span>")
        webSocket.close()
    }
    // FIXME: 2019/11/15 该方法现在无法接受别的用户登录的请求。
    webSocket.onmessage = function (event) {
        // alert("消息发送成功")
        // 接收到的消息 event.data
        let strings = event.data.split(":")
        let message = strings[1]
        // 当收到添加新用户的时候，由于其中发送到前端的消息没有 ':'，所以应该是 undefined
        if (message === undefined) {
            return
        }
        let sender = strings[0].split("[")[1].split("]")[0]
        if (sender === username) {
            writeToTextArea("<span style='color: #66e; font-size: 12px;'>" + formatDate(new Date()) + "</span>")
            writeToTextArea("<span style='color: #66e'>" + "我:" + message + "</span>")
        } else {
            writeToTextArea("<span style='color: purple; font-size: 12px;'>" + formatDate(new Date()) + "</span>")
            writeToTextArea("<span style='color: purple'>" + sender + ":" + message + "</span>")
        }
    }
    webSocket.onerror = function () {
        alert("出现错误了")
    }
}

/**
 * 当需要向 TextArea 写入消息的时候，调用下面的方法。
 */
function writeToTextArea(message) {
    // 将需要显示的内容封装成一个 div 标签来进行设置
    let divElement = document.createElement("div")
    divElement.className = "newMessage"
    divElement.innerHTML = message
    let outputView = document.getElementById("output")
    outputView.append(divElement)
    let views = outputView.getElementsByClassName("newMessage")
    let view = views[views.length - 1]
    // FIXME: 2019/11/15 当消息数量超过规定区域的时候，无法自动滚动到最新的一条数据。
    // 获得最底下 div 的偏移量
    let top = view.offsetTop
    // 判断什么时候进行滚动
    let viewScroll = (top >= outputView.clientHeight)
    // console.log("view.offsetTop = " + top)
    // console.log(outputView.clientHeight)
    // 当超出 div 的下边框的时候，将消息自动滚动到最新的消息
    if (viewScroll) {
    }
}

/**
 * 格式化日期函数
 * @param date 需要格式化的日期
 */
function formatDate(formatDate) {
    let year = formatDate.getFullYear()
    let month = formatDate.getMonth() + 1
    let date = formatDate.getDate()
    let hour = formatDate.getHours()
    let minute = formatDate.getMinutes()
    let second = formatDate.getSeconds()
    return year + "-" + (month = month < 10 ? ("0" + month) : month) + "-" + (date = date < 10 ? ("0" + date) : date) + " " + (hour = hour < 10 ? ("0" + hour) : hour) + ":" + (minute = minute < 10 ? ("0" + minute) : minute) + ":" + (second = second < 10 ? ("0" + second) : second)
}

window.onload = () => {
    let outputDiv = document.getElementById("output")
    outputDiv.addEventListener("scroll", evt => {
    })
}