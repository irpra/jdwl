document.addEventListener("DOMContentLoaded", () => {
  //fetch the data as soon as the page has loaded
  let url = "./assets/data/jadwal.xml";
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); //string
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      ambilMapel(xml);
      ambilGuru(xml);
      //  ambilHari(xml);
      lihatjadwalKelas(xml);
    });
});