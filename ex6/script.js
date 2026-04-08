var container = document.getElementById('container');

function randomChar() {
    return String.fromCharCode(97 + Math.floor(Math.random() * 26));
}

function add_new_chars() {
    var numChars = Math.floor(Math.random() * 3) + 1;
    for (var i = 0; i < numChars; i++) {
        container.textContent += randomChar();
    }
}

window.onload = function() {
    var numChars = Math.floor(Math.random() * 3);
    for (var i = 0; i < numChars; i++) {
        container.textContent += randomChar();
    }
};

window.addEventListener("keyup", function(e) {
    if (e.key.length === 1) {
        var str = container.textContent;
        if (str.length > 0 && str[0] === e.key) {
            container.textContent = str.substring(1);
        }
        add_new_chars();
    }
});