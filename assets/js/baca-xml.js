document.addEventListener("DOMContentLoaded", () => {
  //fetch the data as soon as the page has loaded
  let url = "./assets/data/jadwal.xml";
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); //string
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      lihatjadwalKelas(xml);
    });
});

function lihatjadwalKelas(x) {
  //BACA LESSONIDCARD, PERIODCARD, DAYSCARD
  let i = 0;
  let tbody = document.createElement("tbody");

  while (i < x.getElementsByTagName("card").length) {
    let baris = document.createElement("tr");
    let arrayCardAtt = [
      i + 1,
      x.getElementsByTagName("card")[i].getAttribute("lessonid"),
      x.getElementsByTagName("card")[i].getAttribute("period"),
      x.getElementsByTagName("card")[i].getAttribute("days"),
    ];

    for (let j = 0; j < arrayCardAtt.length; j++) {
      let sel = document.createElement("td");
      console.log(arrayCardAtt[j]);
      let textSel = document.createTextNode(arrayCardAtt[j]);
      sel.appendChild(textSel);
      console.log(textSel);
      baris.appendChild(sel);
    }
    ++i;

    tbody.appendChild(baris);
  }
  document.getElementById("tbllihatjadwalKelas").appendChild(tbody);
}
