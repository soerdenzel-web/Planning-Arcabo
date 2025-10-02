function getWeekNumber(dateStr) {
  const date = new Date(dateStr);
  const firstJan = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstJan) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstJan.getDay() + 1) / 7);
}

function voegRijToe() {
  const tabel = document.getElementById("planningTabel");
  const nieuweRij = document.createElement("tr");

  const kolommen = [
    { type: "date", placeholder: "" },
    { type: "date", placeholder: "" },
    { type: "text", placeholder: "Code Chalet" },
    "select",
    { type: "text", placeholder: "Model" },
    { type: "number", placeholder: "Lengte" },
    { type: "number", placeholder: "Breedte" },
    { type: "number", placeholder: "Aantal uren Zagerij" },
    { type: "number", placeholder: "Aantal uren Dynamisch" },
    { type: "number", placeholder: "Aantal uren Statisch" }
  ];

  const inputs = [];

  kolommen.forEach(kolom => {
    const cel = document.createElement("td");

    if (kolom === "select") {
      const select = document.createElement("select");
      const opties = ["-- Kies locatie --", "Hal 1/2", "Hal 3a", "Hal 3b", "Hal 4", "Hall 5a", "Hall 5b", "Hall 5c"];
      opties.forEach(loc => {
        const optie = document.createElement("option");
        optie.value = loc;
        optie.textContent = loc;
        select.appendChild(optie);
      });
      cel.appendChild(select);
      inputs.push(select);
    } else {
      const input = document.createElement("input");
      input.type = kolom.type;
      input.placeholder = kolom.placeholder;
      input.style.width = "100%";
      cel.appendChild(input);
      inputs.push(input);
    }

    nieuweRij.appendChild(cel);
  });

  const actieCel = document.createElement("td");

  const verwijderKnop = document.createElement("button");
  verwijderKnop.textContent = "Verwijder";
  verwijderKnop.classList.add("verwijder-knop");
  verwijderKnop.onclick = () => tabel.removeChild(nieuweRij);
  actieCel.appendChild(verwijderKnop);

  const opslaanKnop = document.createElement("button");
  opslaanKnop.textContent = "Opslaan";
  opslaanKnop.classList.add("opslaan-knop");
  opslaanKnop.onclick = () => {
    if (inputs.some(input => input.value === "")) {
      alert("Vul alle velden in voordat je opslaat.");
      return;
    }

    const opdracht = {
      startdatum: inputs[0].value,
      einddatum: inputs[1].value,
      code: inputs[2].value,
      locatie: inputs[3].value,
      model: inputs[4].value,
      lengte: inputs[5].value,
      breedte: inputs[6].value,
      zagerij: inputs[7].value,
      dynamisch: inputs[8].value,
      statisch: inputs[9].value,
      week: getWeekNumber(inputs[0].value)
    };

    let bestaandeOpdrachten = JSON.parse(localStorage.getItem("opdrachten")) || [];
    bestaandeOpdrachten.push(opdracht);
    localStorage.setItem("opdrachten", JSON.stringify(bestaandeOpdrachten));
    alert("Opdracht opgeslagen!");

    inputs.forEach(input => input.value = ""); // velden leegmaken
  };
  actieCel.appendChild(opslaanKnop);

  nieuweRij.appendChild(actieCel);
  tabel.appendChild(nieuweRij);
}

  const opdracht = {
    startdatum: document.getElementById("startdatum").value,
    einddatum: document.getElementById("einddatum").value,
    code: document.getElementById("code").value,
    locatie: document.getElementById("locatie").value,
    model: document.getElementById("model").value,
    lengte: document.getElementById("lengte").value,
    breedte: document.getElementById("breedte").value,
    zagerij: document.getElementById("zagerij").value,
    dynamisch: document.getElementById("dynamisch").value,
    statisch: document.getElementById("statisch").value,
    week: getWeekNumber(document.getElementById("startdatum").value)
  };

  let bestaandeOpdrachten = JSON.parse(localStorage.getItem("opdrachten")) || [];
  bestaandeOpdrachten.push(opdracht);
  localStorage.setItem("opdrachten", JSON.stringify(bestaandeOpdrachten));
  alert("Opdracht opgeslagen!");

  velden.forEach(id => document.getElementById(id).value = ""); // velden leegmaken
}

function slaEersteOpdrachtOp() {
  const opdracht = {
    Startdatum: document.getElementById("startdatum").value,
    Einddatum: document.getElementById("einddatum").value,
    Code: document.getElementById("code").value,
    Locatie: document.getElementById("locatie").value,
    Model: document.getElementById("model").value,
    Lengte: document.getElementById("lengte").value,
    Breedte: document.getElementById("breedte").value,
    Zagerij: document.getElementById("zagerij").value,
    Dynamisch: document.getElementById("dynamisch").value,
    Statisch: document.getElementById("statisch").value
  };

  // ✅ Haal bestaande opdrachten op
  const bestaande = JSON.parse(localStorage.getItem("opdrachten")) || [];

  // ✅ Voeg nieuwe opdracht toe
  bestaande.push(opdracht);

  // ✅ Sla alles opnieuw op
  localStorage.setItem("opdrachten", JSON.stringify(bestaande));

  alert("✅ Opdracht opgeslagen!");
}

function slaDezeOpdrachtOp(knop) {
  const rij = knop.closest("tr");

  const opdracht = {
    Startdatum: rij.querySelector(".veld-start").value,
    Einddatum: rij.querySelector(".veld-eind").value,
    Code: rij.querySelector(".veld-code").value,
    Locatie: rij.querySelector(".veld-locatie").value,
    Model: rij.querySelector(".veld-model").value,
    Lengte: rij.querySelector(".veld-lengte").value,
    Breedte: rij.querySelector(".veld-breedte").value,
    Zagerij: rij.querySelector(".veld-zagerij").value,
    ZagerijType: rij.querySelector(".veld-zagerijType").value,
    ZagerijMachine: rij.querySelector(".veld-zagerijMachine").value,
    ZagerijPersoneel: rij.querySelector(".veld-zagerijPersoneel").value,
    Dynamisch: rij.querySelector(".veld-dynamisch").value,
    DynamischType: rij.querySelector(".veld-dynamischType").value,
    DynamischResultaat: rij.querySelector(".veld-dynamischResultaat").value,
    Statisch: rij.querySelector(".veld-statisch").value,
    StatischControle: rij.querySelector(".veld-statischControle").value,
    StatischGewicht: rij.querySelector(".veld-statischGewicht").value
  };

  const bestaande = JSON.parse(localStorage.getItem("opdrachten")) || [];
  bestaande.push(opdracht);
  localStorage.setItem("opdrachten", JSON.stringify(bestaande));

  alert("✅ Opdracht opgeslagen!");
}

document.addEventListener("DOMContentLoaded", () => {
  voegRijToe(); // Voeg standaard één rij toe bij het laden
});

function verwijderRij(knop) {
  const rij = knop.closest("tr");
  rij.remove();
}
const verwijderKnop = document.createElement("button");
verwijderKnop.textContent = "Verwijder";
verwijderKnop.classList.add("verwijder-knop");
verwijderKnop.onclick = () => verwijderRij(verwijderKnop);






