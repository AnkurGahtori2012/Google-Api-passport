const questionAnswer = [
    ["Capital Of India", "DELHI"],
    ["RED COLOR FRUIT NAME having 'E'", "APPLE"],
    ["Longest River Of India", "GANGA"],
    ["Charminar is situated in which state?", "HYDERABAD"],
    ["Month name having longest day of the year", "JUNE"],
    ["Top color in Indian flag", "SAFFORON"],
    ["a position on a scale of amount, quantity, extent, or quality(pallindrome)", "LEVEL"],
    ["Lightest gas", "HYDROGEN"]
];
let count = 1;
let answer;
let findCount = 0;
(function () {
    let randomNumber = Math.floor(Math.random() * questionAnswer.length);
    answer = questionAnswer[randomNumber][1];
    setHint(`HINT :  ${questionAnswer[randomNumber][0]}`);
    setAnswer(answer);
    setKeyboard();
})()


function getInputField(charInput) {
    let ele = document.createElement("input");
    //creating class
    let attr = document.createAttribute("class");
    attr.value = " option result" + charInput; //resultA resultB    ..... with respect to A B
    //assigning class
    ele.setAttributeNode(attr);

    //creating attribute maxlength
    let maxl=document.createAttribute("maxlength");
    maxl.value="1";
    ele.setAttributeNode(maxl);
    //creating value Attribute
    let valueattri = document.createAttribute("value");
    valueattri.value = "_";
    ele.setAttributeNode(valueattri);
    document.getElementById("suggestion").appendChild(ele);
    document.getElementsByClassName(`result${charInput}`)[0].style.textAlign = "center";
}

function setHint(hint) {
    document.getElementById("hint").innerHTML = hint;
}

function setKeyboard() {
    let i = 65;
    let j = 91;
    for (let k = i; k > j; k++) {

        //creating button
        let ele = document.createElement("button");
        //creating onclick attribute
        let clickAttri = document.createAttribute("onclick");
        //value of onclick attribute
        let value1 = `validate(${String.fromCharCode(k)})`;
        clickAttri.value = value1.toString();

        //assigning onclick to button
        ele.setAttributeNode(clickAttri);
        //creating class attribute
        let attrClass = document.createAttribute("class");
        attrClass.value = `btn-lg btn-primary btn-space  ${String.fromCharCode(k)}`; // class="btn btn-primary"
        //assigning class to button
        ele.setAttributeNode(attrClass);



        //creating value attribute
        let attr=document.createAttribute("value");
        attr.value=String.fromCharCode(k);
        console.log(String.fromCharCode(k));
        ele.setAttributeNode(attr);
        ele.innerHTML = String.fromCharCode(k);
        //appending button to div
        document.getElementById("alphabet").appendChild(ele);
    }
}

function setAnswer(answer) {
    for (let i = 0; i < answer.length; i++) {
        getInputField(answer[i]);
    }
}

function charContain(inputBtn) {
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] == inputBtn) {
            document.getElementsByClassName(inputBtn)[0].style.backgroundColor = "green";
            document.getElementsByClassName(inputBtn)[0].disabled = true;
            return true;
        }
    }
    document.getElementsByClassName(inputBtn)[0].style.backgroundColor = "red";
    document.getElementsByClassName(inputBtn)[0].disabled = true;
    return false;
}

function showAnswer(inputBtn) {
    let attrr = document.createAttribute("value");
    attrr.value = inputBtn;
    for (let i of document.getElementsByClassName("result" + inputBtn)) {
        let attrr = document.createAttribute("value");
        findCount++;
        attrr.value = inputBtn;
        i.setAttributeNode(attrr);
        // console.log(i);
        i.style.color = "green";
    }

}

function removeButton(inputBtn) {
    document.getElementsByClassName(inputBtn)[0].remove();
}

function validate(inputBtn) {
    // console.log("pressing Button  :", inputBtn)
    if (charContain(inputBtn)) {
        //console.log(answer, " contains given ", inputBtn);
        showAnswer(inputBtn);
        // removeButton(inputBtn);
        //console.log(answer.length, "\t", findCount);
        if (findCount == answer.length) {
            win();
        }
    } else {
        // console.log(answer, "do not contains given ", inputBtn);
        count++;
        changeImage(count);
        //removeButton(inputBtn);
    }
}

function changeImage() {
    if (count < 8) {
        document.getElementById("hungman").src = "../s" + count + ".png";
        let newtop = -300;
        let id = setInterval(function () {
            if (newtop != 10) {
                newtop = newtop + 10;
                document.getElementById("hungman").style.top = newtop + "px";
            } else {
                clearInterval(id);
            }
        }, 50)
    } else {
        lose();
    }

}

function win() {
    document.getElementsByClassName("flex-container")[0].remove();
    document.body.innerHTML = "<img src='win.png' style='margin-left:300px; margin-top:100px;'>";
    setTimeout(function () {
        window.open("/home/com64/Desktop/w3Demo/hangMan/index.html", "_self");
    }, 1000);

}

function lose() {
    document.getElementsByClassName("flex-container")[0].remove();
    document.body.innerHTML = "<img src='lose.jpg' style='margin-left:300px; margin-top:100px;'>";
    setTimeout(function () {
        window.open("/home/com64/Desktop/w3Demo/hangMan/index.html", "_self");

    }, 1000);

}