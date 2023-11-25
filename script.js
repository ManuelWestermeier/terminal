var inp = document.querySelector("input")
var cmd = document.querySelector(".cmd")
var log = console.log
var usedCommands = ["help", "clear", "install ", "delete "]
var usedCommandsIndex = -1


window.addEventListener("focus", e => {
    inp.focus()
})


window.onkeydown = (e) => {
    if (e.key == "ArrowUp") {
        try {
            if (!usedCommands[usedCommandsIndex + 1]) return
            usedCommandsIndex++;
            inp.value = usedCommands[usedCommandsIndex]
        } catch (error) { }
    }
    if (e.key == "ArrowDown") {
        try {
            if (!usedCommands[usedCommandsIndex - 1]) return
            usedCommandsIndex--;
            inp.value = usedCommands[usedCommandsIndex]
        } catch (error) { }
    }
}


function getCommands() {
    var downloadedApps = JSON.parse(localStorage.getItem("apps")) || {}
    var downloadedAppsParsed = {}

    Object.keys(downloadedApps).forEach(key => {
        try {
            downloadedAppsParsed[key] = eval(eval(downloadedApps[key]))
        } catch (error) {
            writeCommand(error)
        }

    });

    var commands = {
        ...downloadedAppsParsed,
        help: () => {
            writeCommand(Object.keys(commands).join("\n"))
        },
        run: (cmd) => writeCommand(eval(cmd)),
        clear: () => cmd.innerHTML = "",
        install: async (cmd) => {
            writeCommand("is downloading...")
            var text = (await (await fetch(cmd.split(" ")[0])).text())
            if (text.length > 500000) return writeCommand("Programm is to big (max size : 0.5MB")
            var lines = text.split("\n")
            var name = lines[0].replace("id=", "").replace("id = ", "").replace("id= ", "").replace("id =", "").replace(";", "").replace("\r", "").replace("\r", "")
            if (name == "<!DOCTYPE html>") return writeCommand("wrong URL")
            var programm = lines.slice(1, lines.length).join("\n")
            writeCommand("programm ID/NAME is " + name)
            downloadedApps[name] = programm
            localStorage.setItem("apps", JSON.stringify(downloadedApps))
            writeCommand("Finished >> run " + name)
            writeCommand("Its restarting...")
            setTimeout(() => window.location.reload(), 1000)
            setInterval(() => { writeCommand("=>") }, 100)
            //install testapp.js
        },
        [""]: () => writeCommand("\n"),
        delete: (cmd, elem) => {
            delete downloadedApps[cmd]
            localStorage.setItem("apps", JSON.stringify(downloadedApps))
            setTimeout(() => { window.location.reload() }, 500)
            setInterval(() => { elem.innerHTML += ` => \n` }, 10)
        }
    }

    log(commands)

    return commands
}


const commands = getCommands()


document.querySelector("form").onsubmit = e => {
    e.preventDefault()
    var input = inp.value.split(" ")
    var programm = input[0]
    var command = input.slice(1, input.length).join(" ")
    var elem = writeCommand(inp.value)
    //if (!usedCommands.includes(inp.value))
    usedCommands.unshift(inp.value)
    inp.value = ""
    if (!commands[programm]) {
        writeCommand("<h3 style='color:red'>Error : Command Doesn't exists</h3>", true)
        return
    }
    commands[programm](command, elem, writeCommand)
    usedCommandsIndex = -1
}


function writeCommand(text, isHTML) {
    var elem = document.createElement("div")
    cmd.appendChild(elem)
    isHTML ?
        elem.innerHTML = text :
        elem.innerText = text
    return elem
}


window.onerror = (e, s, l, c, err) => {
    writeCommand(
        `<h3 style='color:red'>Error : ${err.stack}</h3>`,
        true)
}