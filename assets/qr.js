var params = new URLSearchParams(window.location.search);

function generateQRCode() {
    var qrContainer = document.getElementById("qr_code");
    qrContainer.innerHTML = "";

    var pesel = params.get("pesel") || "12345678901";
    new QRCode(qrContainer, {
        text: pesel,
        width: 220,
        height: 220,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

function generateQRNumber() {
    var number = "";
    for (var i = 0; i < 5; i++) {
        number += Math.floor(Math.random() * 10);
    }
    document.getElementById("qr_number").innerHTML = number;
    return number;
}

var timeLeft = 176;

function updateTimer() {
    var minutes = Math.floor(timeLeft / 60);
    var seconds = timeLeft % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;
    document.getElementById("qr_timer_text").innerHTML = "Kod wygaśnie za: " + minutes + " min " + seconds + " sek";

    var percentage = (timeLeft / 176) * 100;
    document.getElementById("qr_timer_bar").style.width = percentage + "%";

    if (timeLeft > 0) {
        timeLeft--;
        setTimeout(updateTimer, 1000);
    } else {
        generateQRCode();
        generateQRNumber();
        timeLeft = 176;
        updateTimer();
    }
}

document.querySelector(".back_button").addEventListener("click", () => {
    window.location.href = "card.html?" + params;
});

generateQRCode();
generateQRNumber();
updateTimer();
