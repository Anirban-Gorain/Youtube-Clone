const darkModeColorScheme=
{
    backgroundColor: "#212121",
    textColor: "#fafafa",
    hoverBgc: "#424242"
};

const lightModeColorScheme=
{
    backgroundColor: "	#fafafa",
    textColor: "#000000",
    hoverBgc: "#e4e5f1"
};

// Side menu section

const menuButton=document.querySelector("#menu-button");
const overlay=document.querySelector("#overlay");
const sideMenu=document.querySelector("#side-menu");

overlay.addEventListener("click", sideMenuManager);
menuButton.addEventListener("click", sideMenuManager);

function sideMenuManager()
{    
    const sideMenuStyle=window.getComputedStyle(sideMenu);
    const sideMenuMarginLeft=sideMenuStyle.getPropertyValue("margin-left");
    const sideMenuWidth=sideMenuStyle.getPropertyValue("width");


    if(sideMenuMarginLeft==="0px")
    {
        sideMenu.style.marginLeft=`-${sideMenuWidth}`;

        // Overlay

        overlay.style.width="0";
        overlay.style.height="0";
        overlay.style.backgroundColor="transparent";
    }
    else
    {
        sideMenu.style.marginLeft=`0px`;

        // Overlay
        
        overlay.style.width="100%";
        overlay.style.height="100vh";
        overlay.style.backgroundColor="rgba(0, 0, 0, 0.2)"
    }
}

// Side menu (Show more and show less button of youtube functionalities)

let showMoreYTFunctionalitiesBTN=document.querySelector("#show-more-yt-functionalities");
let showLessYTFunctionalitiesBTN=document.querySelector("#show-less-yt-functionalities");
const youtubeFunctionalitiesContainer=document.querySelector("#youtube-functionalities-container");
const youtubeFunctionalities=
{
    f1:{link:"", iconClass:"fa-solid fa-puzzle-piece", functionName:"Gaming"},
    f2:{link:"", iconClass:"fa-regular fa-newspaper", functionName:"News"},
    f3:{link:"", iconClass:"fa-solid fa-graduation-cap", functionName:"Learning"},
}

showMoreYTFunctionalitiesBTN.addEventListener("click", (event)=>
{
    event.preventDefault();
    showMoreYTFunctionalities();
});

showLessYTFunctionalitiesBTN.addEventListener("click", (event)=>
{
    event.preventDefault();
    showLessYTFunctionalities();
});

function showMoreYTFunctionalities()
{


    for(const functions in youtubeFunctionalities)
    {
        let link, iconClass, functionName;
        
        for(const functionalities in youtubeFunctionalities[functions])
        {
            if(functionalities==="link")
                link=youtubeFunctionalities[functions][functionalities];
            else if(functionalities==="iconClass")
                iconClass=youtubeFunctionalities[functions][functionalities];
            else
                functionName=youtubeFunctionalities[functions][functionalities];
        }
        
        let node=
        `
            <li class="content new-added-YT-Functions">
                <a href="${link}"><i class="${iconClass}"></i>${functionName}</a>
            </li>
        `;

        // insertAdjacentHTML converts the HTML text to actual HTML node then insert is in the specified position. beforebegin for before the mentioned element.
        showMoreYTFunctionalitiesBTN.insertAdjacentHTML('beforebegin', node);
    }

    showMoreYTFunctionalitiesBTN.classList.add("invisible");
    showLessYTFunctionalitiesBTN.classList.remove("invisible");
}

function showLessYTFunctionalities()
{
    const newlyAddedYTFunctionNodes=document.querySelectorAll(".new-added-YT-Functions");

    newlyAddedYTFunctionNodes.forEach((element) =>
    {
        element.remove();   
    });

    showMoreYTFunctionalitiesBTN.classList.remove("invisible");
    showLessYTFunctionalitiesBTN.classList.add("invisible");
}

// Side menu (Show more and show less button of subscribed channel)

const showMoreYTSBChannelBTN=document.querySelector("#show-more-sb-channel");
const showLessYTSBChannelBTN=document.querySelector("#show-less-sb-channel");
const sbChannelData=
{
    c6:{channelLink:"", channelName:"Channel name 6", channelLogo:""},
    c7:{channelLink:"", channelName:"Channel name 7", channelLogo:""},
    c8:{channelLink:"", channelName:"Channel name 8", channelLogo:""},
    c9:{channelLink:"", channelName:"Channel name 9", channelLogo:""},
    c10:{channelLink:"", channelName:"Channel name 10", channelLogo:""},
}

showMoreYTSBChannelBTN.addEventListener("click", (even)=>
{
    even.preventDefault();
    showMoreYTSBChannel();
});

showLessYTSBChannelBTN.addEventListener("click", (even)=>
{
    even.preventDefault();
    showLessYTSBChannel();
});

function showMoreYTSBChannel()
{
    showMoreYTSBChannelBTN.classList.add("invisible");
    showLessYTSBChannelBTN.classList.remove("invisible"); 

    for(const channels in sbChannelData)
    {
        let channelLink, channelName, channelLogo;

        for(const channel in sbChannelData[channels])
        {
            if(channel==="channelLink")
                channelLink=sbChannelData[channels][channel];
            else if(channel==="channelName")
                channelName=sbChannelData[channels][channel];
            else
            channelLogo=sbChannelData[channels][channel];
        }
        
        const node=
        ` 
            <li class="content unavailable newly-add-sb-channels">
                <a href="${channelLink}"><div class="channel-profile"></div>${channelName}</a>
            </li>
        `;

        showMoreYTSBChannelBTN.insertAdjacentHTML("beforeBegin", node);
    }    
}

function showLessYTSBChannel()
{
    showMoreYTSBChannelBTN.classList.remove("invisible");
    showLessYTSBChannelBTN.classList.add("invisible");

    const newlyAddYTSBChannelNodes=document.querySelectorAll(".newly-add-sb-channels");

    newlyAddYTSBChannelNodes.forEach((element) =>
    {
        element.remove();    
    });
}

// Unavailable YT-functionalities error handling

const contents=document.querySelectorAll(".unavailable");

contents.forEach((element) =>
{
    element.childNodes[1].addEventListener("click", (event) => event.preventDefault());

    element.addEventListener("click", showNotAvailable);
});

function showNotAvailable()
{
    const errorContainer=document.querySelector(".error-container");
    errorContainer.style.marginTop="0";

    setTimeout(() =>
    {
        errorContainer.style.marginTop="-100vh";
    }, 1000*2);
}

document.querySelector("#avatar").addEventListener("click", showNotAvailable);
document.querySelector(".notification").addEventListener("click", showNotAvailable);
document.querySelector(".live").addEventListener("click", showNotAvailable);

// Search feature

const searchBar=document.querySelector("#search-bar");
const searchBtn=document.querySelector("#search-btn");

searchBar.addEventListener("keydown", (event) => 
{
    if(event.key==="Enter" && (searchBar.value.length)>0)
    {
        // Search result

        const searchQuery=searchBar.value;
        const response=loadData(searchQuery);

        let suggestionContainer=document.querySelector(".suggestion-container");

        if(suggestionContainer!=null)
            suggestionContainer.remove();
        
        return;
    }

    // We have add a few ms of delay because of we are not getting correctly the value of SearchBar.
    
    setTimeout(()=>
    {
        const valueOfSearchBar=searchBar.value;

        fetch(`http://suggestqueries.google.com/complete/search?client=firefox&q=${valueOfSearchBar}`)
        .then((response)=>
        {
            response.json().then((response)=>
            {
                showSearchSuggestions(response[1]);
            });
        })
        .catch((error)=>
        {
            console.log(error);
        });
    }, 2);
});

searchBtn.addEventListener("click", ()=>
{
    if((searchBar.value.length)>0)
    {
        // Search result
        const searchQuery=searchBar.value;
        loadData(searchQuery);

        let suggestionContainer=document.querySelector(".suggestion-container");

        if(suggestionContainer!=null)
            suggestionContainer.remove();
        
        return;
    }
});

function showSearchSuggestions(response)
{
    let suggestionContainer=document.querySelector(".suggestion-container");

    if(suggestionContainer===null)
    {
        // Creating the box

        suggestionContainer=document.createElement("div");
        suggestionContainer.classList.add("suggestion-container");
        document.querySelector("body").prepend(suggestionContainer);

        // Setting the dimensions (width, height, top, left)

        const dimensionsOfSearchBar=searchBar.getBoundingClientRect();
        const dimensionsOfSearchBtn=searchBtn.getBoundingClientRect();
        
        suggestionContainer.style.width=`${dimensionsOfSearchBar.width+dimensionsOfSearchBtn.width}px`;
        suggestionContainer.style.left=`${dimensionsOfSearchBar.x}px`;
        suggestionContainer.style.top=`${dimensionsOfSearchBar.bottom+5}px`;
    }

    suggestionContainer.innerHTML="";

    response.forEach((element)=>
    {
        const suggestion=`<div class="suggestion-items" onclick="fillSearchBar()">${element}</div>`;
        suggestionContainer.insertAdjacentHTML("beforeend", suggestion);
    });
}

document.addEventListener("click", (event)=>
{
    const clickedElement=event.target;

    // When we are clicking outside of the suggestion container and if suggestion container is present remove that.
    
    const suggestionContainer=document.querySelector(".suggestion-container");

    /*
        is 'clickedElement' has a class
        
        Yes :  Suggestion-container must be present and that should't be search-bar and suggested-items.

        No : Remove the suggestion container, because that is neither Search-bar nor Suggested-items.

    */

    if(clickedElement.classList.length!=0)
    {
        if((suggestionContainer!==null) && (clickedElement.classList.contains("search-bar")==false && clickedElement.classList.contains("suggestion-items")==false))
            suggestionContainer.remove();
    }
    else
    {
        if(suggestionContainer!==null)
            suggestionContainer.remove();
    }
});

function fillSearchBar()
{
    const event=window.event;
    const clickedElement=event.target;
    searchBar.value=clickedElement.innerText;

    // Search result

    console.log("Search result");
    let suggestionContainer=document.querySelector(".suggestion-container");
    suggestionContainer.remove();
}

// Loading video data and showing that

const LoadingTimeKeywords=["New videos", "Trending", "New uploads", "Recent videos"];

document.onload = loadData(getRandomInt(0, LoadingTimeKeywords.length-1));

function getRandomInt(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadData(searchQuery)
{
    const apiKey="AIzaSyAgfB0noF6UPgBcMULr8b9IDECWkXqGadQ";
    const url=`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q="${searchQuery}"&part=snippet&maxResults=50&type=video`;
    const responsePromise=fetch(url);
    let channelIds="";

    responsePromise.then((rawResponse) =>
    {
        rawResponse.json().then((response)=>
        {
            let requiredResponse=[];
            
            for(let i=0; i<50; i++)
            {
                let videoId=response["items"][i]["id"]["videoId"], videoTitle=response["items"][i]["snippet"]["title"], channelId=response["items"][i]["snippet"]["channelId"], thimbleLink=response["items"][i]["snippet"]["thumbnails"]["high"]["url"];
                channelIds=channelId+","+channelIds;
                let temp=[];
                temp.push(videoId, videoTitle, thimbleLink, channelId);
                requiredResponse.push(temp);
            }

            channelIds=channelIds.slice(0, channelIds.length-1)

            const thumbnailResponse=fetch(`https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&part=snippet&id=${channelIds}&maxResults=50`);
            let channelIdAndLink=new Map();

            thumbnailResponse.then((rawResponse)=>
            {
                rawResponse.json().then((response)=>
                {
                    response["items"].forEach((elem)=>
                    {
                        const channelId=elem["id"];
                        const thumbnailLink=elem["snippet"]["thumbnails"]["default"]["url"];

                        channelIdAndLink.set(channelId, thumbnailLink);
                    });

                    requiredResponse.forEach((elem) =>
                    {
                        elem.push(channelIdAndLink.get(elem[3]));
                    });

                    showData(requiredResponse);
                });
            })
            .catch((error)=>
            {
                console.log(error);
            });
        });
    })
    .catch((error)=>
    {
        console.log(error);
    });
}

function showData(response)
{
    const videoContainer=document.querySelector(".video-thumbnail-container");

    videoContainer.innerHTML="";

    response.forEach((elem)=>
    {
        const videoThumbnail=
        `
            <div class="thumbnail-box ${elem[0]}" onclick="playVideo()">
                <div class="thumbnail" style="background-image: url(${elem[2]});}"></div>
                <div class="video-metadata">
                    <div class="channel">
                        <div class="channel-logo" style="background-image: url(${elem[4]});}"></div>
                    </div>
                    <div class="video-info">
                        <span class="video-title">${elem[1]}</span>
                    </div>
                </div>
            </div>
        `;
        videoContainer.insertAdjacentHTML("beforeend", videoThumbnail);
        });

        fixThumbnailBoxSize();
}

/* 

    This following function will find the width of the first thumbnailBox then it will take the thumbnailBoxes from the last if width is grater than the first thumbnailBox it will set the width to first thumbnailBox.

*/

function fixThumbnailBoxSize()
{
    const thumbnailBoxes=document.querySelectorAll(".thumbnail-box");

    if(thumbnailBoxes==0 || thumbnailBoxes==null)
        return;

    // If number of thumbnail boxes are lesser than the number of thumbnail boxes can be accommodated in a row.

    // Bug to be fixed.

    
    // If number of thumbnail boxes are grater than the number of thumbnail boxes can be accommodated in a row.
    
    const firstThumbnailBoxWidth=Number(thumbnailBoxes[0].getBoundingClientRect().width);
    const len=thumbnailBoxes.length;
    
    for(let i=len-1; i>=0; i--)
    {
        const width=Number(thumbnailBoxes[i].getBoundingClientRect().width);
        
        if(width>firstThumbnailBoxWidth)
        {
                thumbnailBoxes[i].style.maxWidth=firstThumbnailBoxWidth+"px";
        }
        else
        {
            break;
        }
    }
}