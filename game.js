const TH_TEST_URL = "https://codecyprus.org/th/test-api/"; // the test API base url

/**
 * An asynchronous function to realize the functionality of getting the available 'treasure hunts' (using /list) and
 * processing the result to update the HTML with a bullet list with the treasure hunt names and descriptions. Also,
 * for each treasure hunt in the bullet list, a link is shown to trigger another function, the 'select'.
 * @return {Promise<void>}
 */


async function doList() {

    // call the web service and await for the reply to come back and be converted to JSON
    const reply = await fetch("https://codecyprus.org/th/api/" + "list");
    const json = await reply.json();

    // identify the spinner, if available, using the id 'loader'...
    let spinner = document.getElementById("loader");
    // .. and stop it (by hiding it)


    // access the "treasureHunts" array on the reply message
    let treasureHuntsArray = json.treasureHunts;
    let listHtml = "<ul>"; // dynamically form the HTML code to display the list of treasure hunts
    for(let i = 0; i < treasureHuntsArray.length; i++) {
        listHtml += // each treasure hunt item is shown with an individual DIV element
            "<ul>" +
            "<b><li class='trBorder'>" + treasureHuntsArray[i].name + "</b><br/>" + // the treasure hunt name is shown in bold...
            "<i>" + treasureHuntsArray[i].description + "</i><br/>" +  // and the description in italics in the following line
            "<input   type = 'button'  onclick='start(\"" + treasureHuntsArray[i].uuid + "\")' value = 'Start'></input>" +
            "</li></ul>";
    }
    listHtml += "</ul>";
    // update the DOM with the newly created list
    document.getElementById("treasureHunts").innerHTML = listHtml;
}
doList();
/**
 * This function is called when a particular treasure hunt is selected. This is merely a placeholder as you're expected
 * to realize this function-or an equivalent-to perform the necessary actions after a treasure hunt is selected.
 *
 * @param uuid this is the argument that corresponds to the UUID of the selected treasure hunt.
 * @return {Promise<void>}
 */

/**"<a href=\"https://codecyprus.org/th/api/start?player=stefanos&app='" + treasureHuntsArray[i].name +"'&treasure-hunt-id='" + treasureHuntsArray[i].uuid + "\')\">Start</a>" */





/**async function inputName(){
    document.getElementById("treasureHunts").innerHTML = "<div>Enter Name</div><br>" + "<input type='text' id='lname' name='lname' required>" + "<input   type = 'button' onclick='inputName1()' value = 'Start'></input>";

}

async function inputName1(){
    console.log("Selected treasure hunt with UUID: ");
}**/


async function select() {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.
    console.log("Selected treasure hunt with UUID: ");
    // todo add your own code ...

}

function setCookie(cname,cvalue,exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
        setCookie("username", user, 30);
    } else {
        user = prompt("Please enter your name:","");
        if (user != "" && user != null) {
            setCookie("username", user, 30);

        }
    }
    return user;
}

function start(treasureHuntID) {
    const playerName = checkCookie();
    console.log(playerName);
    console.log(treasureHuntID);
    const appName = "Team3App";

    const URL = "https://codecyprus.org/th/api/start?player=" + playerName + "&app=" + appName + "&treasure-hunt-id=" + treasureHuntID;

    console.log(URL);
    QuestionsID(URL);


}

async function QuestionsID(URL) {

    // call the web service and await for the reply to come back and be converted to JSON
    const reply = await fetch(URL);
    const json = await reply.json();
    console.log(json);
    if(json.status === "ERROR"){
        console.log(json.status);

    }
    else{
        setCookie("sessionID",json.session,30);
        const myID =getCookie("sessionID");
        console.log("Selected treasure hunt with UUID: " + myID);
        const URLquest = "https://codecyprus.org/th/api/question?session=" + myID;
        retrQuest(URLquest,myID);

    }

}

async function retrQuest(URL,myID){
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
    let question = json.questionText;
    document.getElementById("treasureHunts").style.display = "none";
    document.getElementById("hide").style.display = "inline";



    document.getElementById("quest").innerHTML = question;
    const URLans = "https://codecyprus.org/th/api/answer?session=" + myID;

    answer(URLans);
    console.log(json.canBeSkipped);
    if(json.canBeSkipped === true) {
        const myID =getCookie("sessionID");
        URLskip = "https://codecyprus.org/th/api/skip?session=" + myID;
        document.getElementById("skip").innerHTML = "<button id=\"skip\" onclick=\"skip(URLskip)\">Skip</button>";
    }

}

async function answer(URL){
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
}

function answer1(){

}

async function skip(URL){
    const response = await fetch(URL);
    const json = await response.json();

    console.log(json);
}

function getParameter(parameterName){
    let parameters = new URLSearchParams(window.location.search);
    return parameters.get(parameterName);
}