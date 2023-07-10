export const SpeechRecognition=()=> {
    const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition ||
        window.mozSpeechRecognition ||
        window.msSpeechRecognition)();
      recognition.lang = "ru-RU";
      recognition.interimResults = true;
      recognition.continuous = true;
      recognition.maxAlternatives = 30;
      // recognition.start();
      
      recognition.onresult = function(event) {
        console.log("You said: ", event.results[0][0].transcript);
        console.log(event.results);
      };
return (
    <button onClick={()=>recognition.start()}>Listening</button>
)    
}