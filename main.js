const doButton1 = document.getElementById("one");
const dotweet = document.getElementById("tweet");
const video = document.getElementById("video");

const bill = [
    {ratio:0.94, amount:1000},
    {ratio:0.98, amount:5000},
    {ratio:1, amount:10000}
];

let sum = 0;
let amo = 0;
let count = 0;

function gacha(){
    let i = Math.random();
    
    if(i <= bill[0].ratio){
        return bill[0].amount;
    } else if (i <= bill[1].ratio){
        return bill[1].amount;
    } else {
        return bill[2].amount;
    }
}

function turnmovie(){
    video.innerHTML = "";
    sum = 0;
    count = 1;
    amo = gacha();
    video.innerHTML += `<video width="480px" height="270px" src="${amo}yen.mov" autoplay muted playsinline></video>`
    sum = amo;
}

function tweet(){
    let text = "";
    text += encodeURI(`${count}回ガチャを引き合計金額${sum}円`) + "%0D%0A";
    text += "%23" + encodeURI("お札ガチャ2") + "%0D%0A";
    text += encodeURI("https://kyu099.github.io/billgacha2/") + "%0D%0A";
    window.open(`https://twitter.com/intent/tweet?text=${text}`,);
}

doButton1.onclick = turnmovie;
dotweet.onclick = tweet;