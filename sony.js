
let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    console.log("Current hour:", hours);

    if (hours >= 0 && hours < 12) {
        console.log("Good Morning triggered");
        speak("Good Morning");
    } else if (hours >= 12 && hours < 16) {
        console.log("Good Afternoon triggered");
        speak("Good Afternoon");
    } else {
        console.log("Good Evening triggered");
        speak("Good Evening");
    }
}

window.addEventListener('load', () => {
    wishMe();
});


let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let reco = new SpeechRecognition();

reco.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    let content = document.getElementById("content");

    if (content) {
        content.innerText = transcript;
    }

    console.log("Recognized Speech:", transcript);

    takeCommand(transcript);
};

document.getElementById("btn").addEventListener("click", () => {

    reco.start();
    btn.style.display = "none"
    voice.style.display = "block"
});

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    message = message.toLowerCase();

    if (message.includes("hello")) {
        speak("Hello sir, what can I help you with?");
    }
    else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Harshita.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube for you.");
        window.open("https://www.youtube.com/");
    }
    else if (message.includes("looking")) {
        speak("you are very beautifull with  the best smile");

    }
    else if (message.includes("open google")) {
        speak("Opening Google for you.");
        window.open("https://www.google.com", "_blank");
    } else if (message.includes("open facebook")) {
        speak("Opening Facebook for you.");
        window.open("https://www.facebook.com", "_blank");
    } else if (message.includes("open instagram")) {
        speak("Opening Instagram for you.");
        window.open("https://www.instagram.com", "_blank");
    } else if (message.includes("open contacts")) {
        speak("Opening contacts in your phone.");
        window.open("content://contacts/people/", "_self");
    } else if (message.includes("open messages")) {
        speak("Opening messages in your phone.");
        window.open("sms:", "_self");
    }
    else if (message.includes("open calculator")) {
        speak("open calculator");
        window.open("calculator://");
    }
    else if (message.includes("open gmail")) {
        speak("Opening Gmail for you.");
        window.open("https://mail.google.com", "_blank");
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(date)
    }
    else {
        let finalText = "this is what i found on internet regarding " + message.replace(('jack,'), '')
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace(('jack,'), '')}`, "_blank")
    }
}

function speak(text) {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "en-US";
    speechSynthesis.speak(speech);
}
