const totalFLuid = document.getElementById("total-fluid");
const durationRadio12 = document.getElementById("halfday");
const durationRadio24 = document.getElementById("fullday");
const nsThird = document.getElementById("ns-third");
const d10TwoThird = document.getElementById("d10-two-third");
const nsVol = document.getElementById("ns-vol");
const d5Vol = document.getElementById("d5-vol");
const d40Vol = document.getElementById("d40-vol");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");
const weightIn = document.getElementById("weight");
const main = document.querySelector(".main-container");
const popup = document.querySelector(".popupInput");
const popup2 = document.querySelector(".info-popup");
const datac = document.querySelector(".data-container")
const weightc = document.querySelector(".weight-container")
const infoButton = document.getElementById('info')

var currentWeight = parseFloat(weightIn.innerHTML);
var currentDuration = durationRadio12.checked ? true : false;

const audioSrc = '/assets/audio/tick.mp3';
const preloadAudio = new Audio(audioSrc);
preloadAudio.preload = 'auto';
preloadAudio.load();

weightIn.addEventListener('click', ()=>{
    showPopUp();
    document.getElementById('weightInput').value = currentWeight;
    const sound = new Audio(audioSrc);
    sound.play();
})

plus.addEventListener('click', ()=>{
let value = parseFloat(weightIn.innerHTML);
    if(value < 50)
        weightIn.innerHTML = (value + 0.1).toFixed(1);
    updateWeight();
    const sound = new Audio(audioSrc);
    sound.play();
});

minus.addEventListener('click', ()=>{
    let value = parseFloat(weightIn.innerHTML);
    if(value > 0)
       weightIn.innerHTML = (value - 0.1).toFixed(1);
    updateWeight();
    const sound = new Audio(audioSrc);
    sound.play();
    });

    durationRadio24.addEventListener('change', ()=>{
        updateWeight();
        const sound = new Audio(audioSrc);
    sound.play();
    })    

    durationRadio12.addEventListener('click', ()=>{
        updateWeight();
        const sound = new Audio(audioSrc);
    sound.play();
    })    

infoButton.addEventListener('click',()=>{
    if(popup2.classList.contains('show')){
        hideInfo();
        const sound = new Audio(audioSrc);
    sound.play();
    }
    else{
        showInfo();
        const sound = new Audio(audioSrc);
    sound.play();
    }
})

function showPopUp(){
    main.classList.add('hide')
    popup.classList.add("show");
    document.getElementById('weightInput').focus();
}

function hidePopUp(){
    main.classList.add('show')
    popup.classList.remove("show");
}

function showInfo(){
    datac.classList.add('hide')
    weightc.classList.add('hide')
    popup2.classList.add("show");
    popup2.style.flexDirection = 'column';
}

function hideInfo(){
    datac.classList.remove('hide')
    weightc.classList.remove('hide')
    popup2.classList.remove("show");
    const sound = new Audio(audioSrc);
    sound.play();
}

function updateWeight(){
    currentWeight = parseFloat(weightIn.innerHTML);
    currentDuration = durationRadio12.checked ? true : false;
    updateOthers();
}

function updateOthers(){
    totalFLuid.innerHTML = (parseFloat(getTotalVolume())).toFixed(1) + " ml";
    nsThird.innerHTML = (parseFloat(getNSVol())).toFixed(1) + " ml";
    nsVol.innerHTML = (parseFloat(getNSVol())).toFixed(1) + " ml";
    d10TwoThird.innerHTML = (parseFloat(getd10Vol())).toFixed(1) + " ml";
    d5Vol.innerHTML = (parseFloat(getd5Vol())).toFixed(1) + " ml";
    d40Vol.innerHTML = (parseFloat(getd40Vol())).toFixed(1) + " ml";

}

function getTotalVolume(){
    var totVol = 0;
    var temp = parseFloat(weightIn.innerHTML);
    var i = 0;
    var multiplier = [100.0, 50.0, 20.0];

    var duration = currentDuration ? 0.5 : 1;

    while (i < 3) {
      if (temp >= 10) {
        if (i >= 2) {
          totVol = totVol + (temp * multiplier[i]);
          break;
        }
        totVol = totVol + (10 * multiplier[i]);
        temp = temp - 10;
      } else {
        totVol = totVol + (temp * multiplier[i]);
        break;
      }

      i++;
    }
    return totVol * duration;
}

function getNSVol(){
    let temp = getTotalVolume();
    return temp/3;
}

function getd10Vol(){
    let temp = getTotalVolume();
    return (temp/3) * 2;
}

function getd5Vol(){
    let temp = getd10Vol();

    return temp * 0.85;
}

function getd40Vol(){
    let temp = getd10Vol();

    return temp * 0.15;
}



//popup section

const popIn = document.getElementById('weightInput');
const okButton =document.getElementById('ok');

okButton.addEventListener('click', ()=>{
    let weight = parseFloat(popIn.value);
    if(weight > 0 && weight <= 50){
        weightIn.innerHTML = (weight).toFixed(1);
        updateWeight();
        hidePopUp();
        const sound = new Audio(audioSrc);
    sound.play();

    }
    else{
        alert('Please enter a weight between 1 and 50 kg');
        hidePopUp();
        const sound = new Audio(audioSrc);
        sound.play();

    }
})
