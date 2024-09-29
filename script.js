'use strict'

let catchInput = document.getElementById("inpt");
let catchBtn = document.getElementById("btn");
let catchAudioParent = document.getElementById("audioParent");
let catchSuraTafsir = document.getElementById("suraTafsir");
let catchAyahNo = document.getElementById("ayahNo")
let catchJuz = document.getElementById("juz")
let catchMuljil = document.getElementById("munjil");
let catchRuku = document.getElementById("ruku");
let catchSajda = document.getElementById("sajda");
let catchSuraName = document.getElementById("suraName");
let catchloaderForTafsir = document.getElementById("loaderForTafsir");

function inptValidatio() {
    let getInptValue = catchInput.value; 
    if (getInptValue === '') {
        alert("Input box cannot be blank!");
    }
    else if (isNaN(getInptValue)) {
        alert("Please enter a valid number!");
    } else if (getInptValue <= 114) {
        resApi(getInptValue);
        
    }
    else {
        alert('please enter sura name between 1 to 114')
    }
}
function resApi(recgetInptValue) {
    catchloaderForTafsir.style.display = 'block';
    let getInput = recgetInptValue
    const api1 = fetch(`https://api.alquran.cloud/v1/surah/${getInput}/ar.alafasy`);
    const api2 = fetch(`https://api.alquran.cloud/v1/surah/${getInput}/bn.bengali`);
    const api3 = fetch(` `)

    Promise.all([api1, api2])
        .then(recponses => Promise.all(recponses.map(rec => rec.json())))
        .then(data => {
            apiData(data[0], data[1])
            catchloaderForTafsir.style.display = 'none';
        })
    
}
function apiData(recData1, recData2) {
    let finalData1 = recData1;
    let finalData2 = recData2

    let curentAudoLength = finalData1.data.ayahs.length;
    let curentTafsirLength = recData2.data.ayahs.length;
    
    let audioCountFlag = 0;
    function forAdioWork() {
        
        if (audioCountFlag < curentAudoLength && audioCountFlag < curentTafsirLength) {
            //sura audio play section
            catchAudioParent.innerHTML = `<audio id="adio" src="${finalData1.data.ayahs[audioCountFlag].audio}" controls autoplay></audio>`
            //sura name
            catchSuraName.innerHTML = `<h2 class = "text-white font-bold">সুরা নাম ${finalData2.data.englishName}</h2>`
            //sura tafsir print section
            catchSuraTafsir.innerHTML = `<h2 class = "text-red-400 text-3xl ">${finalData2.data.ayahs[audioCountFlag].text}</h2>`
            //sura info print section
            // ayah count
            catchAyahNo.innerHTML = `<button class="text-white font-bold border border-accent rounded-sm px-4 py-2">আয়াত নং ${recData2.data.ayahs[audioCountFlag].numberInSurah}</button>`

            //juz
            catchJuz.innerHTML = ` <button class="text-white font-bold border border-accent rounded-sm px-4 py-2">পারা ${recData2.data.ayahs[audioCountFlag].juz}</button>`
            //manzil
            catchMuljil.innerHTML = `<button class="text-white font-bold border border-accent rounded-sm px-4 py-2">মঞ্জিল ${recData2.data.ayahs[audioCountFlag].manzil}</button>`
            //ruku
            catchRuku.innerHTML = `<button class="text-white font-bold border border-accent rounded-sm px-4 py-2">রুকু ${recData2.data.ayahs[audioCountFlag].ruku} </button>`
            //sajda
            catchSajda.innerHTML = ` <button class="text-white font-bold border border-accent rounded-sm px-4 py-2">${recData2.data.ayahs[audioCountFlag].sajda ? "কোনো সেজদা আয়াত আছে" : "সেজদা আয়াত নেই"}</button>`


            let catchAudio = document.getElementById('adio');
            catchAudio.onended = () => {
                audioCountFlag++
                forAdioWork()
            }
        } else {
            alert("the sura is end would you play it again or another")
        }
    }
    forAdioWork()
}

catchBtn.addEventListener('click', function () {
    inptValidatio()
});

// for radio start
let catchRAdio = document.getElementById("forRADIO");
let catchforUtptRadio = document.getElementById("forUtptRadio");
let catchmy_modal_4 = document.getElementById("my_modal_4");
let loader = document.getElementById("loader"); 

function resRaioApi() {
    
    loader.style.display = 'block';

    fetch('https://mp3quran.net/api/v3/radios?language=eng')
        .then(res => res.json())
        .then(data => {
            setRadio(data);
            
            loader.style.display = 'none';
        })
        .catch(err => {
            if ( err ) {
                alert("some error maybe happend ")
            }
            
            loader.style.display = 'none';
        });
}

function setRadio(resRadioData) {
    let finalRadioDat = resRadioData;

    catchforUtptRadio.innerHTML = `<audio id="gg" src="${finalRadioDat.radios[11].url}" controls autoplay></audio>`;
    let ggg = document.getElementById("gg");
    catchmy_modal_4.addEventListener("close", function () {
        ggg.pause();
    });
}

catchRAdio.addEventListener("click", function () {
    resRaioApi();
});


//for tv start
let catchTv = document.getElementById("forTv");
const modal = document.getElementById('my_modal_3');
const videoPlayer = document.getElementById('videoPlayer');
const video = document.getElementById('videoPlayer');
const m3u8Url = 'https://dzkyvlfyge.erbvr.com/PeaceTvBangla/index.m3u8';

function tvFunc() {
    if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => video.play());
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', () => video.play());
    } else {
        alert('Your browser does not support HLS streaming.');
    }

}
catchTv.addEventListener("click", function () {
    tvFunc()
})
modal.addEventListener("close", function () {
    videoPlayer.pause()
})
