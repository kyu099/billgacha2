const doButton1 = document.getElementById("one");
const doButton10 = document.getElementById("ten");
const dotweet = document.getElementById("tweet");
const video = document.getElementById("video");
const result = document.getElementById("result");
const skipButton = document.getElementById("skip");

const bill = [
    {ratio:0.94, amount:1000},
    {ratio:0.98, amount:5000},
    {ratio:1, amount:10000}
];

let sum = 0;
let count = 0;

function gacha(){
    let i = Math.random();
    
    if(i <= bill[0].ratio){
        return {videoname: bill[0].amount + "yen.mp4", imagename: "money_" + bill[0].amount + ".png", amount: bill[0].amount};
    } else if (i <= bill[1].ratio){
        return {videoname: bill[1].amount + "yen.mp4", imagename: "money_" + bill[1].amount + ".png", amount: bill[1].amount};
    } else {
        let j = Math.random();
        if(j > 0.75) return {videoname: "nise" + bill[2].amount + "yen.mp4", imagename: "money_" + bill[2].amount + ".png", amount: bill[2].amount};
        else return {videoname: bill[2].amount + "yen.mp4", imagename: "money_" + bill[2].amount + ".png", amount: bill[2].amount};
    }
}

async function turnmovie(num){
    video.innerHTML = "";
    result.innerHTML = "";
    dotweet.hidden = true;
    doButton1.hidden = true;
    doButton10.hidden = true;
    skipButton.hidden = false;
    sum = 0;
    count = num;
    for(let i=0; i<num; i++){
        const billdata = gacha();
        const resultVideo = document.createElement("video");
        resultVideo.src = billdata.videoname;
        resultVideo.playsInline = true;
        video.innerHTML = "";
        video.appendChild(resultVideo);
        await playVideo(resultVideo);
        result.innerHTML += `<img src="${billdata.imagename}"><br>`;
        sum += billdata.amount;
    }
    video.innerHTML = "";
    dotweet.hidden = false;
    doButton1.hidden = false;
    doButton10.hidden = false;
    skipButton.hidden = true;
    result.innerHTML += `合計${sum}円<br>`;
}
const playVideo = (video) => {
    const p = new Promise((resolve, reject) => {
        video.onended = () => resolve();
        skipButton.onclick = () => resolve();
        video.play();
    });
    return p;
}

function tweet(){
    let text = "";
    console.log(count, sum);
    text += encodeURI(`${count}回ガチャを引き合計金額${sum}円`) + "%0D%0A";
    text += "%23" + encodeURI("お札ガチャ2") + "%0D%0A";
    text += encodeURI("https://kyu099.github.io/billgacha2/") + "%0D%0A";
    window.open(`https://twitter.com/intent/tweet?text=${text}`,);
}

doButton1.onclick = () => turnmovie(1);
doButton10.onclick = () => turnmovie(10);
dotweet.onclick = tweet;