/**
 * Course: COMP 426
 * Assignment: a04
 * Author: Alex Morton
 *
 * This script uses jQuery to build an HTML page with content taken from the
 * data defined in data.js.
 */


/**
 * Given a hero object (see data.js), this function generates a "card" showing
 *     the hero's name, information, and colors.
 * @param hero  A hero object (see data.js)
 */
export const renderHeroCard = function(hero) {

    let colors = `<div style="color: ${hero.color}; background-color: ${hero.backgroundColor}"></div>`;
    let icon = `<img src=${hero.img}></img>`;
    let realName = `<div><span>${hero.first} ${hero.last}</span></div>`;
    let heroName = `<div><span>${hero.name}</span></div>`;
    let firstSeen = `<p>First seen: ${(hero.firstSeen).toISOString().split('T')[0]}</p>`;
    let description = `<p>${hero.description}</p>`;
    let button = `<button type="button">edit</button>`;

    return colors + icon + realName + heroName + firstSeen + description + button;

    // TODO: Generate HTML elements to represent the hero
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<div>${hero.name}</div>`;
};

/**
 * Given a hero object, this function generates a <form> which allows the
 *     user to edit the fields of the hero. The form inputs should be
 *     pre-populated with the initial values of the hero.
 * @param hero  The hero object to edit (see data.js)
 */
export const renderHeroEditForm = function(hero) {
    // TODO: Generate HTML elements to represent the hero edit form
    // TODO: Return these elements as a string, HTMLElement, or jQuery object
    // Example: return `<form>${hero.name}</form>`;

    let form = `<form>

        <input type="text" value=${hero.first}>
        <input type="text" value=${hero.last}>
        <input type="text" value=${hero.name}>
        <input type="date" value=${finalDate}>
        <textarea>${hero.description}</textarea>
        <button type="button">cancel</button>;
        <button type="submit">save</button>;

    </form>`;

    return form;

};



/**
 * Given an array of hero objects, this function converts the data into HTML and
 *     loads it into the DOM.
 * @param heroes  An array of hero objects to load (see data.js)
 */
export const loadHeroesIntoDOM = function(heroes) {
    // Grab a jQuery reference to the root HTML element
    const $root = $('#root');

    // TODO: Generate the heroes using renderHeroCard()

    for(let i = 0; i < heroes.length; i++) {
        $root.append(renderHeroCard(heroes[i]));
        $root.append('<div></div');
    }

    // TODO: Append the hero cards to the $root element

    // Pick a hero from the list at random
    const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

    // TODO: Generate the hero edit form using renderHeroEditForm()

    // TODO: Append the hero edit form to the $root element

    $root.append(renderHeroEditForm(randomHero));

};



/**
 * Use jQuery to execute the loadHeroesIntoDOM function after the page loads
 */
$(function() {
    loadHeroesIntoDOM(heroicData);
});
