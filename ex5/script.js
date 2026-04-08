var count = 1;

function addfunction() {
    var area = document.getElementById("button-area");
    var btn = document.createElement("BUTTON");
    
    btn.innerHTML = `CLICK ME (${count})`;
    btn.setAttribute("id", "btn_" + count++);
    btn.setAttribute("class", "btn btn-outline-danger");
    
    area.appendChild(btn);
    console.log(btn);
}

function delfunction() {
    var area = document.getElementById("button-area");
    var btn = document.getElementById("btn_" + --count);
    
    if (btn) {
        area.removeChild(btn);
        console.log("Deleted:", btn.id);
    }
    
    if (count < 1) {
        count = 1;
    }
}