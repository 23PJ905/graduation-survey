const DEBUG = false;

const startButton = document.getElementById("startButton");

const studentScreen = document.getElementById("studentScreen");


const ageScreen = document.getElementById("ageScreen");

const exampleScreen = document.getElementById("exampleScreen");

const instructionScreen = document.getElementById("instructionScreen");

const endScreen = document.getElementById("endScreen");

const studentNextButton = document.getElementById("studentNextButton");

const ageNextButton = document.getElementById("ageNextButton");

const exampleNextButton = document.getElementById("exampleNextButton");

const instructionNextButton = document.getElementById("instructionNextButton");

const surveyScreen = document.getElementById("surveyScreen");

const startScreen = document.getElementById("startScreen");

startButton.addEventListener("click", function(){

    startScreen.style.display = "none";

    studentScreen.style.display = "block";

});

studentNextButton.addEventListener("click", function(){

    const studentType = document.querySelector(
        'input[name="studentType"]:checked'
    );

    if(studentType == null){

        alert("現在の立場を選択してください。");

        return;

    }

    studentTypeValue = studentType.value;

    studentScreen.style.display = "none";

    if(
    studentTypeValue == "大学生" ||
    studentTypeValue == "専門・短大"
    ){

        ageScreen.style.display = "block";

    }else{

        endScreen.style.display = "block";

    }

});

ageNextButton.addEventListener("click", function(){

    const gender = document.querySelector('input[name="gender"]:checked');
    
    if(gender == null){

    alert("性別を選択してください。");

    return;

    }

    genderValue = gender.value;

    if(age.value == ""){

        alert("年齢を選択してください。");

        return;

    }

    ageScreen.style.display = "none";

    exampleScreen.style.display = "block";

});

exampleNextButton.addEventListener("click", function(){

    exampleScreen.style.display = "none";

    instructionScreen.style.display = "block";

});

instructionNextButton.addEventListener("click", function(){

    instructionScreen.style.display = "none";

    surveyScreen.style.display = "block";

});

const PHOTO_COUNT = 10;

const questions = [
    ["だらしのない", "きちんとした"],
    ["カジュアルな", "フォーマルな"],
    ["不真面目な", "真面目な"],
    ["非常識な", "常識な"],
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

let questionOrder = [];

let answers = [];

let studentTypeValue = "";

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
    "41.png",
    "51.png",
    "61.png",
    "71.png",
    "81.png",
    "91.png",
    "101.png"
];

async function finishSurvey(){

    sendingMessage.style.display = "block";

    button.style.display = "none";

    await sendToGoogle();

    surveyScreen.style.display = "none";

    thanksScreen.style.display = "block";

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });

}

button.addEventListener("click", async function(){
  if(!DEBUG){

    for (let i = 0; i < QUESTION_COUNT; i++) {

      const questionNumber = questionOrder[i];

      const checked = document.querySelector(
        'input[name="q' + (questionNumber + 1) + '"]:checked'
      );

      if (!checked) {

          alert("Q" + (i + 1) + "が未回答です。");

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

    await finishSurvey();

    return;

   }

  if(photoNumber === PHOTO_COUNT + 1){

    button.textContent = "送信する";

  }

   createQuestions();

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

    questionOrder = [...Array(QUESTION_COUNT).keys()];

    questionOrder.sort(function(){
    return Math.random() - 0.5;
    });   

    questionOrder.forEach(function(questionNumber,index){

        const question = questions[questionNumber];

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
                    id="q${questionNumber+1}-${i}"
                    name="q${questionNumber+1}"
                >

                <label
                    for="q${questionNumber+1}-${i}">
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

const thanksScreen = document.getElementById("thanksScreen");

const age = document.getElementById("age");

const sendingMessage = document.getElementById("sendingMessage");


async function sendToGoogle() {

  const row = [

            respondentID,

            studentTypeValue,

            genderValue,

            age.value
        ]   

 answers.forEach(function(answer){

    for(let i=1;i<=QUESTION_COUNT;i++){

        row.push(answer["q"+i]);

    }

 });

const data = [row];

    await fetch("https://script.google.com/macros/s/AKfycbzPNJaQN3AKxgj79KHXGGsiGHyhWPpeCdQs0qWJyLbrhTPbGqYJvd4MYA0gJUinNMpa/exec",{

        method:"POST",

        body:JSON.stringify(data)

    });

}

