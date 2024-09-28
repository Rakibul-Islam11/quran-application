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
    let getInput = recgetInptValue
    const api1 = fetch(`https://api.alquran.cloud/v1/surah/${getInput}/ar.alafasy`);
    const api2 = fetch(`https://api.alquran.cloud/v1/surah/${getInput}/bn.bengali`);

    Promise.all([api1, api2])
        .then(recponses => Promise.all(recponses.map(rec => rec.json())))
        .then(data => apiData(data[0], data[1]))
    
}
function apiData(recData1, recData2) {
    let finalData1 = recData1;
    let finalData2 = recData2
    console.log(recData1);
    console.log(recData2);
    
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
