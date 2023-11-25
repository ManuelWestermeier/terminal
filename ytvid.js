id = ytvid;
(cmd, elem, writeCommand) => {
    var yturl = new URL(cmd)
    var newView = writeCommand("<h1>Loading...</h1>", true)
    setTimeout(()=>newView.innerHTML = "Succes", 1000)
    elem.style.width = "100%"
    elem.style.height = "500px"
    elem.innerHTML =
        `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${yturl.searchParams.get("v")}" title="4K Relaxing River - Ultra HD Nature Video -  Water Stream &amp; Birdsong Sounds - Sleep/Study/Meditate" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
}
/*
In the first column is the app name in (id=testprogramm)
Afther That gets The code
The Code is written in a Callback
it takes 3 params
cmd : the user input
elem : the elem to render
writeCommand : to Create new windows or output in the Console two params (text,isHTML)

(cmd,elem,writeCommand)=>{

}

*/