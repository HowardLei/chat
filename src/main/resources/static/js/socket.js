function checkWebSocket() {
    let websocket
    if (typeof WebSocket == "undefined") {
        alert("对不起，浏览器无法使用 webSocket。请更换支持的浏览器再进行操作。")
    } else {
        initSocket(websocket)
    }
}

function initSocket(websocket) {
    websocket = new WebSocket("ws://127.0.0.1:8080/websocket")
    websocket.onopen = function (event) {
        alert("连接成功")
        console.log("建立 websocket 连接")
    }

    websocket.onclose = function (event) {
        console.log("关闭 websocket 连接")
    }

    websocket.onmessage = function (event) {
        console.log("收到消息", event.data)
    }

    websocket.onerror = function () {
        console.log("WebSocket 出现错误")
    }

    websocket.onbeforeunload = function () {
        websocket.close()
    }
}

checkWebSocket()