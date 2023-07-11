import { useState,useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
    mozSpeechRecognition:any;
    msSpeechRecognition:any;
    transcript:string
  }
}

export const SpeechRecognition=()=> {
    const [speech, setSpeech]=useState<string[][]>([[" "]]);  
    const recognitionRef = useRef(new (window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition)());
    recognitionRef.current.lang = "ru-RU";   
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.maxAlternatives = 30;  
      
      let phrase:string[]=[]     
      const startListening=()=> {
        setSpeech([]);
        recognitionRef.current.start();
        recognitionRef.current.onresult = function(event:any) { 
          console.log(recognitionRef.current);
          console.log(event)
          let current = event.resultIndex;
          window.transcript = event.results[current][0].transcript;
          let a=Math.floor(Math.random() * 500);
          phrase[current]=(`${window.transcript} ${a}`)
          console.log(phrase);
          setSpeech(() => [phrase])
        };
      }
    const stopListening=()=> {    
      recognitionRef.current.stop();       
      }



return (
    <>
    <div>
    <Button variant="light" onClick={()=>startListening()}>Начать слушать</Button>
    <Button style={{margin: "0 10px"}}variant="light" onClick={()=>stopListening()}>Закончить</Button>
    <Button variant="light" onClick={()=>setSpeech([])}>Очистить</Button>
    </div>
    <ul style={{listStyleType: "none", marginTop:"40px"}}>
    {speech[0]&&speech[0].map(item=><li key={uuidv4()}>{item}</li>)}
    </ul>
    </>
)    
}