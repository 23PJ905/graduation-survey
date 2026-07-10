const DEBUG = true;

const startButton = document.getElementById("startButton");

const surveyScreen = document.getElementById("surveyScreen");

const startScreen = document.getElementById("startScreen");

startButton.addEventListener("click", function(){

    startScreen.style.display = "none";

    surveyScreen.style.display = "block";

});

const PHOTO_COUNT = 2;

const questions = [
    ["だらしのない", "きちんとした"],
    ["カジュアルな", "フォーマルな"],
    ["不真面目な", "真面目な"],
    ["非常識な", "常識的な"],
    ["無礼な", "礼儀正しい"],
    ["不誠実な", "誠実な"],
    ["無責任な", "責任感のある"],
    ["不潔な", "清潔な"],
    ["ラフな", "堅苦しい"],
    ["親しみにくい", "親しみやすい"],
    ["怖い", "優しい"],
    ["冷たい", "温かい"],
    ["安っぽい", "高級感のある"],
    ["下品な", "上品な"],
    ["不安である", "安心できる"],
    ["信頼できない", "信頼できる"],
    ["頼りない", "頼もしい"],
    ["未熟な", "熟練な"],
    ["子どもっぽい", "大人っぽい"],
    ["余裕がない", "余裕がある"],
    ["若々しい", "落ち着いた"],
    ["暗い", "明るい"],
    ["やる気がない", "やる気がある"],
    ["地味な", "華やかな"],
    ["消極的な", "積極的な"],
    ["魅力がない", "魅力がある"],
    ["野暮ったい", "おしゃれな"],
    ["平凡な", "個性的な"], 
    ["くだけた", "改まった"],
    ["弱気な", "強気な"],
    
];

const QUESTION_COUNT = questions.length;

let photoNumber = 1;

let answers = [];

const respondentID =
  "R" + Math.floor(Math.random() * 1000000).toString().padStart(6, "0");

const questionArea = document.getElementById("questionArea");

const photo = document.getElementById("photo");

const button = document.getElementById("nextButton");

const progress = document.getElementById("progress");

const photos = [
    "11.png",
    "21.png",
    "31.png",
    "45.png",
    "51.png",
    "61.png",
    "71.png",
    "81.png",
    "91.png",
    "101.png"
];

button.addEventListener("click", function(){
  if(!DEBUG){

    for (let i = 1; i <= QUESTION_COUNT; i++) {

        const checked = document.querySelector(
            'input[name="q' + i + '"]:checked'
        );

        if (!checked) {

            alert("Q" + i + "が未回答です。");

            return;

        }

    }

}

    const currentAnswers = {
    photo: photoNumber
};

    for (let i = 1; i <= QUESTION_COUNT; i++) {

    const checked = document.querySelector(
        'input[name="q' + i + '"]:checked'
    );

    if (checked) {
        currentAnswers["q" + i] = checked.id.split("-")[1];
    } else {
        currentAnswers["q" + i] = "";
    }

}

    answers.push(currentAnswers);

    console.log(answers);

    photoNumber++;

    if(photoNumber > PHOTO_COUNT){

      surveyScreen.style.display = "none";

      infoScreen.style.display = "block";

       return;

    }
    photo.src =  photos[photoNumber - 1];

    progress.textContent = "写真 " + photoNumber + " / " + PHOTO_COUNT;

    window.scrollTo({
    top: 0,
    behavior: "smooth"
    });

    document.querySelectorAll('input[type="radio"]').forEach(function(radio){

    radio.checked = false;

});

});


function createQuestions(){

    questionArea.innerHTML = "";

    const shuffledQuestions = [...questions];

    shuffledQuestions.sort(function(){

    return Math.random() - 0.5;
});    
    shuffledQuestions.forEach(function(question,index){

        let html = `
        <div class="questions">

            <h2>Q${index+1}</h2>

            <div class="choice-labels">
                <span></span>
                <span>当てはまる</span>
                <span>やや当てはまる</span>
                <span>どちらでもない</span>
                <span>やや当てはまる</span>
                <span>当てはまる</span>
                <span></span>
            </div>
         <div class="scale">
                <span class="left-word">${question[0]}</span>

                <div class="choices">
        `;

        for(let i=1;i<=5;i++){

            html += `
                <input
                    type="radio"
                    id="q${index+1}-${i}"
                    name="q${index+1}"
                >

                <label
                    for="q${index+1}-${i}">
                </label>
            `;

        }

        html += `

                </div>

                <span class="right-word">${question[1]}</span>

            </div>

        </div>
        `;

        questionArea.innerHTML += html;

    });

}

createQuestions();

photo.src =  photos[photoNumber - 1];

progress.textContent = "写真 " + photoNumber + " / " + PHOTO_COUNT;

const infoScreen = document.getElementById("infoScreen");

const thanksScreen = document.getElementById("thanksScreen");

const finishButton = document.getElementById("finishButton");

const age = document.getElementById("age");

const grade = document.getElementById("grade");

const sendingMessage = document.getElementById("sendingMessage");

finishButton.addEventListener("click", async function(){

    if(age.value == ""){

        alert("年齢を選択してください");

        return;

    }

    if(grade.value == ""){

        alert("学年を選択してください");

        return;

    }

    finishButton.disabled = true;
    sendingMessage.style.display = "block";

    await sendToGoogle();
    
    infoScreen.style.display = "none";

    thanksScreen.style.display = "block";

    window.scrollTo({
       top: 0,
       behavior: "smooth"
});

});

async function sendToGoogle() {

    const data = answers.map(function(answer){

        return [
             
            respondentID,

            age.value,

            grade.value,

            answer.photo,

            ...Array.from(
                {length: QUESTION_COUNT},
                (_,i)=>answer["q"+(i+1)]
            )

        ];

    });

    await fetch("https://script.google.com/macros/s/AKfycbw2nVaNsirLdOCnvyA0GEmlFEDAtuyxr56NYNfXHz3sasWSPfIXJOUmmbNmM5EzIgDggw/exec",{

        method:"POST",

        body:JSON.stringify(data)

    });

}

