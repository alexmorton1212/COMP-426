/* npx browser-sync start -sw */

export async function create() {

    const $root = $('#root');

    const test = await axios({
        method: 'get',
        url: 'https://comp426-1fa20.cs.unc.edu/a09/tweets',
        withCredentials: true,
    });
    
    let feed = `<div id="main">`;

    for (let i = 0; i < 50; i++) {

        if (test.data[i].isMine === false) {

            feed += `<div class="classtweet">

            <p>${test.data[i].author}</p>
            <br>
            <p>${test.data[i].body}</p>
            <br>

            <p>${test.data[i].likeCount} Likes</p>
            <button class="likebutton" id="${test.data[i].id}" value="${test.data[i].isLiked}">Like</button>  

            <p>${test.data[i].replyCount} Replies</p> 
            <button class="replybutton" id="${test.data[i].id}">Reply</button>

            <p>${test.data[i].retweetCount} Retweets</p>
            <button class="retweetbutton" id="${test.data[i].id}">Retweet</button>

            <hr>
            </div>`;

        } else {

            feed += `<div class="mytweet">

            <p>${test.data[i].author}
                <button class="editbutton" id="${test.data[i].id}">Edit</button>
                <button class="deletebutton" id="${test.data[i].id}">Delete</button>
            </p>
            <br>
            <p>${test.data[i].body}</p>
            <br>

            <p>${test.data[i].likeCount} Likes</p>
            <button class="likebutton" id="${test.data[i].id}" value="${test.data[i].isLiked}">Like</button> 

            <p>${test.data[i].replyCount} Replies</p> 
            <button class="replybutton" id="${test.data[i].id}">Reply</button>

            <p>${test.data[i].retweetCount} Retweets</p>
            <button class="retweetbutton" id="${test.data[i].id}">Retweet</button>

            <hr>
            </div>`;
            
        }
        
    }
    feed += `</div>`;
    $root.append(feed);
}

export async function likeOrUnlike(event) {
    if (event.target.value === "false") {
        likeTweet(event);
    } else {
        unlikeTweet(event);
    }
}

export async function likeTweet(event) {

    let url = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.id + "/like";
    await axios({
        method: 'put',
        url: url,
        withCredentials: true,
    });       
    $('#main').replaceWith(create());
}

export async function unlikeTweet(event) {

    let url = "https://comp426-1fa20.cs.unc.edu/a09/tweets/" + event.target.id + "/unlike";
    await axios({
        method: 'put',
        url: url,
        withCredentials: true,
    });   
    $('#main').replaceWith(create());
}

export async function makeTweet(event) {

    event.preventDefault();
    
    let url = 'https://comp426-1fa20.cs.unc.edu/a09/tweets';
    let body = $("textarea[id=message]").val();
    
    await axios({
        method: 'post',
        url: url,
        data: {
            body: body,
        },
        withCredentials: true,
    });
    $('#main').replaceWith(create());

}

export const update = function() {

    const $root = $('#root');

    $root.append(`
    <div>
        <form class="intro">
            <p>I couldn't really get anything besides the like/unlike feature to work, so...</p>
            <p>just letting you know thats the only button thats gonna work lol</p>
            <p>you can actually make a tweet too but thats it</p>
            <br>
            <p>Write a Tweet</p>
            <br>
            <textarea id="message"></textarea>
            <br>
            <button type="submit">Submit</button>
        </form>
        <hr>
    </div>`);

    create();

    $(document).on("submit", ".intro", makeTweet);
    $(document).on("click", ".likebutton", likeOrUnlike);

}

$(function () {
    update();
});