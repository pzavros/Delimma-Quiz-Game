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
            "<li>" +
            "<b>" + treasureHuntsArray[i].name + "</b><br/>" + // the treasure hunt name is shown in bold...
            "<i>" + treasureHuntsArray[i].description + "</i><br/>" +  // and the description in italics in the following line
            "<input   type = 'button' onclick='inputName()' value = 'Start'></input>" + // and the description in italics in the following line
            "</li>";
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

async function inputName(){
    document.getElementById("treasureHunts").innerHTML = "<div>Enter Name</div><br>" + "<input type='text' id='lname' name='lname' required>" + "<input   type = 'button' onclick='inputName1()' value = 'Start'></input>";
}

async function inputName1(){
    console.log("Selected treasure hunt with UUID: ");
}


async function select() {
    // For now just print the selected treasure hunt's UUID. Normally, you're expected to guide the user in entering
    // their name etc. and proceed to calling the '/start' command of the API to start a new session.
    console.log("Selected treasure hunt with UUID: ");
    // todo add your own code ...

}

