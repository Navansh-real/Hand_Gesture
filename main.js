prediction="";
speak_to="";

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");
Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">'
    })
}

console.log("ml5.version:", ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YSlfSGe8N/model.json',ModelLoaded);
function ModelLoaded(){
    console.log("model is initialized")
}

function speak(){
synth=window.speechSynthesis;
speak_data=speak_to;
utterthis= new SpeechSynthesisUtterance(speak_data);
synth.speak(utterthis);
}

function check(){
    img=document.getElementById("capture_image");
    classifier.classify(img, gotresults);
}

function gotresults(error, result){
if (error){
console.error(error);
}
else {
    console.log(result);
    document.getElementById("result_emotion_name").innerHTML=result[0].label;

    prediction=result[0].label;

    if(result[0].label=="Amazing"){
        document.getElementById("update_emoji").innerHTML="&#128076";
        speak_to="This is amazing"
    }
    if(result[0].label=="Best"){
        document.getElementById("update_emoji").innerHTML="&#128077";
        speak_to="All the best"
    }
    if(result[0].label=="Victory"){
        document.getElementById("update_emoji").innerHTML="&#9996";
        speak_to="that was a marvelous victory"
    }
    speak();
}
}