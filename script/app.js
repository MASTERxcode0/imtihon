const keyboard = document.querySelector("#keyboard");
const inputes = document.querySelector("#inputes");
const btn = document.querySelector("#btn");
const phonetic = document.querySelector("#phonetic");
const audio = document.querySelector("#audio");
const chekkeds = document.querySelector("#chekkeds");
const definition1 = document.querySelector("#definition1");
const ulaydi = document.querySelector("#ulaydi");
const sinonim = document.querySelector("#sinonim");
const darMcode = document.querySelector(".checkbox");
const source = document.querySelector("#source");

function nevCard(card) {
  keyboard.innerHTML = card.name;
  phonetic.innerHTML = card.phonetic;
  sinonim.innerHTML = card.status;
}
function hato() {
  return `
     <div class="hato">
       <img src="images/Animation - 1734349150400.gif" alt="">
         
          <h2>No Definitions Found</h2>
          <p>
            Sorry pal, we couldn't find definitions for the word you were
            looking for. You can try the search again at later time or head to
            the web instead.
          </p>

        </div>
    `;
}
function li(datax) {
  return `
  <li>${datax}</li>
  `;
}

const audioBtn = document.querySelector("#audioBtn");
const audios = document.querySelector("#audio");
const content = document.querySelector("main");

// console.log(audios);

function translayt() {
  if (inputes.value.length == 0) {
    return (content.innerHTML = hato());
  }

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputes.value}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if ((inputValueWalidey = 0)) {
        keyboard.innerHTML = "Whoops, can’t be empty…";
        keyboard.style.color = "red";
        inputes.style.border = "red";
        return;
      }
      // console.log(data[0]);

      // console.log(audio);

      let card = {
        name: inputes.value,
        phonetic: data[0].phonetic,
        status: data[0].meanings[0].synonyms[0],
      };
      nevCard(card);

      const phonetics = data[0].phonetics;

      // console.log(phonetics);
      // ulaydi.innerHTML += "";
      const definitions = data[0].meanings[0].definitions;

      phonetics.forEach((audionon) => {
        if (audionon.audio != "") {
          audios.src = audionon.audio;
        }
      });

      definitions.forEach((definitin) => {
        ulaydi.innerHTML += li(definitin.definition);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
btn && btn.addEventListener("click", translayt);

// Darc mode funksiyalari

// localStorage.setItem("qora", "true")

if (localStorage.getItem("qora") === "true") {
  chekkeds.checked = true;
  document.body.classList.add("darc");
}

chekkeds &&
  chekkeds.addEventListener("change", function () {
    if (document.body.classList.contains("darc")) {
      document.body.classList.remove("darc");
      localStorage.setItem("qora", "false");
    } else {
      document.body.classList.add("darc");
      localStorage.setItem("qora", "true");
    }
  });

// font stylini o'zgartirish
const fontes = document.getElementById("dropdownValues");
const hammaNarsa = document.querySelectorAll("body *");
// console.log(hammaNarsa)

fontes.addEventListener("change", function (event) {
  // console.log(event.target.value);
  let valuese = event.target.value;
  hammaNarsa.forEach((narsa) => {
    narsa.style.fontFamily = valuese;
    localStorage.setItem("fontFamily", valuese);
  });
});

const fontFamily = localStorage.getItem("fontFamily");

if (fontFamily) {
  document.body.style.fontFamily = fontFamily;
  hammaNarsa.forEach((narsa) => {
    narsa.style.fontFamily = fontFamily;
  });
}

// audio kodlari

audioBtn.addEventListener("click", () => {
  if (audios.src != "") {
    audios.play();
  }
});
