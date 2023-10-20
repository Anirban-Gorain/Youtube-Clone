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


console.log(showMoreYTSBChannelBTN, showLessYTSBChannelBTN);

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