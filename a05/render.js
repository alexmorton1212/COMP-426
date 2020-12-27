/**
 * Course: COMP 426
 * Assignment: a05
 * Author: <type your name here>
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */


/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function (hero) {

    return `<div>

        <div id="${hero.id}" class="card" style="border-style: solid; border-color: black;color:${hero.color}; background-color:${hero.backgroundColor}; padding:30px">
            <div class="container">
                <div class="columns is-vcentered">

                    <div class="column has-text-centered">
                        <img src="${hero.img}" style="vertical-align:top"></img>
                    </div>

                    <div class="column has-text-centered">
                        <p>${hero.first} ${hero.last}</p>
                    &nbsp;
                    <span>${hero.name}</span>
                    &nbsp;
                    <p>First seen: ${(hero.firstSeen).toISOString().split('T')[0]}</p>
                    &nbsp;
                    <p>${hero.description}</p>
                    </div>
                    <div class="column has-text-centered">
                        <button type="button" class="button"
                            style="font-size: 24px; border-radius: 12px; border-color: transparent; background-color: ${hero.color}; color:${hero.backgroundColor};">
                            Edit
                    </button>
                    </div>

                </div>
            </div>
        </div>

    </div>`

};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function (hero) {

    return `<form id="form">

    <hr></hr>

    <h1 style="text-align: center; font-size:30px; color:black" >Edit "${hero.name}"</h1>

    <hr></hr>



    <label>
        <b>Name</b>
        <input class="input" name="name" type="text" value ="${hero.name}">
       </input>
    </label>

    <hr></hr>

    <label>
    <b>First Name</b>
    <input class="input" name="first" type="text" value="${hero.first}">
       </input>
    </label> 

    <hr></hr>

    <label>
    <b>Last Name</b>
    <input class="input" name="last" type="text"value ="${hero.last}">
       </input>
    </label>

    <hr></hr>
    
    <label>
    <b>Description</b>
    <textarea class="textarea" name="description">${hero.description}</textarea>
    </label>

    <hr></hr>

    <label>
    <b>First Seen</b>
    <input class="input" name="seen" type="text" value ="${hero.firstSeen}" name="firstSeen">
       </input>
    </label>

    <hr></hr>

    <div>
        <div class="cancel" id="${hero.id}">
        <button class ="button" style = "float: right; width: 49%;  border-color: black; background-color: ${hero.color}; color:white;">Cancel </button>
        </div>
    
        <button type ="submit" class ="button" style = "float: left; width: 49%; border-color: black; background-color: ${hero.color}; color:white;">Save </button>  
    </div>

    <div id ="holdID" style="color: white">${hero.id}</div>

    </form>`

};


/**
 * Handles the JavaScript event representing a user clicking on the "edit"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditButtonPress = function (event) {
    // TODO: Render the hero edit form for the clicked hero and replace the
    //       hero's card in the DOM with their edit form instead


    for (let i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id == event.id) {
            $(`#${heroicData[i].id}`).remove();
            $('#root').append(renderHeroEditForm(heroicData[i]));
        }
    }

};


/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleCancelButtonPress = function (event) {
    // TODO: Render the hero card for the clicked hero and replace the
    //       hero's edit form in the DOM with their card instead


    for (let i = 0; i < heroicData.length; i++) {
        if (heroicData[i].id == event.id) {
            $(`#form`).remove();
            $('#root').append(renderHeroCard(heroicData[i]));
        }
    }

};



/**
 * Handles the JavaScript event representing a user clicking on the "cancel"
 *     button for a particular hero.
 * @param event  The JavaScript event that is being handled
 */
export const handleEditFormSubmit = function (event) {
    // TODO: Render the hero card using the updated field values from the
    //       submitted form and replace the hero's edit form in the DOM with
    //       their updated card instead


    let thisID= parseInt(document.getElementById('holdID').innerHTML);
    let form = $('#form').serializeArray();

    for (let i = 0; i < heroicData.length; i++) {

        if (heroicData[i].id == thisID) {
            heroicData[i].name = form[0].value;
            heroicData[i].first = form[1].value;
            heroicData[i].last = form[2].value;
            heroicData[i].description = form[3].value;
            heroicData[i].firstSeen = new Date(form[4].value);

            $('#form').remove();
            $('#root').append(renderHeroCard(heroicData[i]))
        }
    }

};



/**
 * Given an array of hero objects, this function converts the data into HTML,
 *     loads it into the DOM, and adds event handlers.
 * @param  heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function (heroes) {

    // TODO: Generate the heroes using renderHeroCard()
    //       NOTE: Copy your code from a04 for this part

    // TODO: Append the hero cards to the $root element
    //       NOTE: Copy your code from a04 for this part

    for (let i = 0; i < heroes.length; i++) {
        $('#root').append(renderHeroCard(heroes[i]));
    }

    // TODO: Use jQuery to add handleEditButtonPress() as an event handler for
    //       clicking the edit button

    $(`#root`).on('click', '.card', function () {
        handleEditButtonPress(this)
    });

    // TODO: Use jQuery to add handleEditFormSubmit() as an event handler for
    //       submitting the form

    $(`#root`).on('submit', '#form', function () {
        handleEditFormSubmit(this)
    });

    // TODO: Use jQuery to add handleCancelButtonPress() as an event handler for
    //       clicking the cancel button

    $(`#root`).on('click', '.cancel', function () {
        handleCancelButtonPress(this);
    });

};


/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function () {
    loadHeroesIntoDOM(heroicData);
});
