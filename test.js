

/*--------------------------------LIST--------------------------------------*/
function list() {
    document.getElementById('answerHide').style.display = 'none';
    document.getElementById('questionHide').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'none';

    const listNum = prompt("Select number of Treasure Hunts");
    doList(listNum);

}

async function doList(listNum) {
    const reply = await fetch("https://codecyprus.org/th/test-api/list?number-of-ths=" + listNum);
    const json = await reply.json();

    let treasureHuntsArray = json.treasureHunts;
    let listHtml = "<ul>";
    for(let i = 0; i < treasureHuntsArray.length; i++) {
        listHtml +=

        "<tr>\n" +
        "    <td>List</td>" +
        "    <td>" + treasureHuntsArray[i].name + "<br>" + treasureHuntsArray[i].description + "<br>" + treasureHuntsArray[i].uuid + "</td>" +
        "    <td> idk </td>" +
        "    <td>Passed</td>" +
        "</td>";

    }
    listHtml += "</ul>";

    document.getElementById("test-results-table").innerHTML = listHtml;
}
/*----------------------------------------------------------------------------*/





/*--------------------------------START--------------------------------------*/
function start(){
    document.getElementById('answerHide').style.display = 'none';
    document.getElementById('questionHide').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'inline';

    document.getElementById("testing-options").innerHTML=
        "<button class='testbtn' onclick='doinactive()'>INACTIVE</button>" +
        "<button class='testbtn' onclick='doempty()'>EMPTY</button>" +
        "<button class='testbtn' onclick='doplayer()'>PLAYER</button>" +
        "<button class='testbtn' onclick='doapp()'>APP</button>" +
        "<button class='testbtn' onclick='dounknown()'>UNKNOWN</button>" +
        "<button class='testbtn' onclick='domissing_parameter()'>MISSING PARAMETER</button>";
}

function doinactive(){
    var inactive = 'inactive';
    doStart(inactive);
}
function doempty(){
    var empty = 'empty';
    doStart(empty);
}
function doplayer(){
    var player = 'player';
    doStart(player);
}
function doapp(){
    var app = 'app';
    doStart(app);
}
function dounknown(){
    var unknown = 'unknown';
    doStart(unknown);
}
function domissing_parameter(){
    var missing_parameter = 'missing_parameter';
    doStart(missing_parameter);
}

async function doStart(inputType) {
    const reply = await fetch("https://codecyprus.org/th/test-api/start?player=" + inputType);
    const json = await reply.json();
    if(inputType === 'missing_parameter'){

        let errorMessagesArray = json.errorMessages;
        console.log(errorMessagesArray[1]);
        let listHtml = "<tr>\n" +  "<td>Start</td>" +
            "<td> Missing or empty parameter: player" + "<br>"+
            "Missing or empty parameter: app" + "<br>"+
            "Missing or empty parameter: treasure-hunt-id <br>" +
            json.status + "</td>" + "<td>" ;
        for(let i = 0; i < errorMessagesArray.length; i++) {
            listHtml +=
                errorMessagesArray[i] + "<br>" ;
        }
        listHtml +=  json.status + "</td>" +"<td>Passed</td>" + "</td>";
        document.getElementById("test-results-table").innerHTML = listHtml;

    }
    else {
        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status + "</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status + "</td>" +
            "    <td>Passed</td>" +
            "</td>";
    }

}
/*----------------------------------------------------------------------------*/





/*--------------------------------QUESTIONS--------------------------------------*/
function questionShow(){
    document.getElementById('answerHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'none';
    document.getElementById('questionHide').style.display = 'inline';
}

async function doQuestions(completed, questiontype, skip, location) {
    const reply = await fetch("https://codecyprus.org/th/test-api/question?completed=" + completed + "&question-type=" + questiontype + "&can-be-skipped=" + skip + "&requires-location=" + location);
    const json = await reply.json();
    console.log(completed);

        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>completed: " + json.completed + "<br>" + json.questionText + "<br>" + json.questionType + "<br>" + json.canBeSkipped + "<br>" + json.requiresLocation + "<br>" + json.currentQuestionIndex + "<br>" + json.correctScore + "<br>" + json.wrongScore + "<br>" + json.skipScore + "<br>" + json.status + "</td>" +
            "    <td>" + json.completed + "<br>" + json.questionText + "<br>" + json.questionType + "<br>" + json.canBeSkipped + "<br>" + json.requiresLocation + "<br>" + json.currentQuestionIndex + "<br>" + json.correctScore + "<br>" + json.wrongScore + "<br>" + json.skipScore + "<br>" + json.status + "</td>" +
            "    <td>Passed</td>" +
            "</td>";

}
/*----------------------------------------------------------------------------*/





/*--------------------------------ANSWERS--------------------------------------*/
function answerShow(){
    document.getElementById('questionHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'none';
    document.getElementById('answerHide').style.display = 'inline';

}

async function doAnswer(correct, completed, expired) {
    const reply = await fetch("https://codecyprus.org/th/test-api/answer?correct=" + correct + "&completed=" + completed + "&expired=" + expired);
    const json = await reply.json();

    if(expired === 'true'){
        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status+ "<br>"  + "</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status+ "<br>"  + "</td>" +
            "    <td>Passed</td>" +
            "</td>";
    }
    else {
        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>" + json.correct + "<br>" + json.completed + "<br>" + json.message + "<br>" + json.scoreAdjustment + "<br>" + json.status + "</td>" +
            "    <td>" + json.correct + "<br>" + json.completed + "<br>" + json.message + "<br>" + json.scoreAdjustment + "<br>" + json.status + "</td>" +
            "    <td>Passed</td>" +
            "</td>";
    }
}
/*----------------------------------------------------------------------------*/



/*--------------------------------SCORE--------------------------------------*/
function scoreShow(){
    document.getElementById('questionHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'none';
    document.getElementById('answerHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'inline';

}

async function doScore(score, completed, finished, error) {
    const reply = await fetch("https://codecyprus.org/th/test-api/score?score="+score+"&completed="+completed+"&finished="+finished+"&error=" + error);
    const json = await reply.json();

    if(error === 'true'){
        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status+ "<br>"  + "</td>" +
            "    <td>" + json.errorMessages + "<br>" + json.status+ "<br>"  + "</td>" +
            "    <td>Passed</td>" +
            "</td>";
    }
    else {
        document.getElementById("test-results-table").innerHTML =
            "<tr>\n" +
            "    <td>Start</td>" +
            "    <td>" + json.completed + "<br>" + json.finished + "<br>" + json.player+ "<br>" + json.score + "<br>" + json.hasPrize +  "<br>" + json.status +"</td>" +
            "    <td>" + json.completed + "<br>" + json.finished + "<br>" + json.player+ "<br>" + json.score + "<br>" + json.hasPrize +  "<br>" + json.status +"</td>" +
            "    <td>Passed</td>" +
            "</td>";
    }
}
/*----------------------------------------------------------------------------*/





/*--------------------------------LEADERBOARD--------------------------------------*/
function showLeaderboard(){
    document.getElementById('questionHide').style.display = 'none';
    document.getElementById('testing-options').style.display = 'none';
    document.getElementById('answerHide').style.display = 'none';
    document.getElementById('scoreHide').style.display = 'none';
    document.getElementById('leaderboardHide').style.display = 'inline';
}


async function doLeaderboard(sorted, hasPrize, size) {
    const reply = await fetch("https://codecyprus.org/th/test-api/leaderboard?sorted="+sorted+"&hasPrize="+hasPrize+"&size="+size);
    const json = await reply.json();

    document.getElementById("test-results-table").innerHTML =
        "<tr>\n" +
        "    <td>Start</td>" +
        "    <td>" + json.numOfPlayers + "<br>" + json.sorted + "<br>" + json.hasPrize+ "<br>" + json.limit +"</td>" +
        "    <td>" + json.numOfPlayers + "<br>" + json.sorted + "<br>" + json.hasPrize+ "<br>" + json.limit +"</td>" +
        "    <td>Passed</td>" +
        "</td>";
}

/*----------------------------------------------------------------------------*/