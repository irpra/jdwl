document.addEventListener("DOMContentLoaded", () => {
  //fetch the data as soon as the page has loaded
  let url = "./assets/data/jadwal.xml";
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      lihatjadwalKelas(xml);
    });
});

function lihatjadwalKelas(x) {
  //BACA LESSONIDCARD, PERIODCARD, DAYSCARD
  let countTagLesson = x.getElementsByTagName("lesson").length;
  let countTagClass = x.getElementsByTagName("class").length;
  let countTagDaysdef = x.getElementsByTagName("daysdef").length;
  let countTagSubject = x.getElementsByTagName("subject").length;
  let countTagTeacher = x.getElementsByTagName("teacher").length;
  let i = 0;
  let tbody = document.createElement("tbody");
  let arrayPembelajaran = [];
  let nameClass = "";
  let nameSubject = "";
  let nameTeacher = "";
  let titleTeacher = "";

  while (i < x.getElementsByTagName("card").length) {
    let baris = document.createElement("tr");
    let lessonidCard = x
      .getElementsByTagName("card")
      [i].getAttribute("lessonid");
    let periodCard = x.getElementsByTagName("card")[i].getAttribute("period");
    let daysCard = x.getElementsByTagName("card")[i].getAttribute("days");
    let j = 0;
    while (j < countTagLesson) {
      let idLesson = x.getElementsByTagName("lesson")[j].getAttribute("id");
      let classidsLesson = x
        .getElementsByTagName("lesson")
        [j].getAttribute("classids");
      let subjectidLesson = x
        .getElementsByTagName("lesson")
        [j].getAttribute("subjectid");
      let teacheridsLesson = x
        .getElementsByTagName("lesson")
        [j].getAttribute("teacherids");
      teacheridsLesson = teacheridsLesson.split(",");

      if (lessonidCard == idLesson) {
        let k = 0;
        while (k < countTagClass) {
          let idClass = x.getElementsByTagName("class")[k].getAttribute("id");
          if (idClass == classidsLesson) {
            nameClass = x.getElementsByTagName("class")[k].getAttribute("name");
            let l = 0;
            while (l < countTagDaysdef) {
              let daysDaysdef = x
                .getElementsByTagName("daysdef")
                [l].getAttribute("days");
              if (daysCard == daysDaysdef) {
                nameDaysdef = x
                  .getElementsByTagName("daysdef")
                  [l].getAttribute("name");
              }
              ++l;
            }
          }
          ++k;
        }
        let m = 0;
        let n = 0;
        let o = 0;

        while (m < countTagSubject) {
          idSubject = x.getElementsByTagName("subject")[m].getAttribute("id");
          if (idSubject == subjectidLesson) {
            nameSubject = x
              .getElementsByTagName("subject")
              [m].getAttribute("name");
            let titlenameTeacher = "";
            while (n < teacheridsLesson.length) {
              while (o < countTagTeacher) {
                idTeacher = x
                  .getElementsByTagName("teacher")
                  [o].getAttribute("id");
                if (idTeacher == teacheridsLesson[n]) {
                  titleTeacher = x
                    .getElementsByTagName("teacher")
                    [o].getAttribute("gender");
                  if (titleTeacher == "M") {
                    titleTeacher = "Bapak ";
                  } else if (titleTeacher == "F") {
                    titleTeacher = "Ibu ";
                  } else {
                    titleTeacher = "";
                  }
                  nameTeacher = x
                    .getElementsByTagName("teacher")
                    [o].getAttribute("name");
                  let newline = document.createElement("br");
                  if (teacheridsLesson.length > 1) {
                    if (titlenameTeacher != "") {
                      titlenameTeacher =
                        titlenameTeacher + " <br> " +(titleTeacher + nameTeacher);
                    } else titlenameTeacher = titleTeacher + nameTeacher;
                  } else titlenameTeacher = titleTeacher + nameTeacher;
                }
                ++o;
              }
              o = 0;
              ++n;
            }

            arrayPembelajaran = [
              i + 1,
              nameClass,
              nameDaysdef,
              periodCard,
              nameSubject,
              titlenameTeacher,
            ];
          }
          ++m;
        }
      }
      ++j;
    }

    let ctk = 0;
    while (ctk < arrayPembelajaran.length) {
      let sel = document.createElement("td");
      let textSel = document.createTextNode(arrayPembelajaran[ctk]);
      sel.innerHTML = textSel.nodeValue;
      baris.appendChild(sel);
      ++ctk;
    }

    ++i;

    tbody.appendChild(baris);
  }
  document.getElementById("tbllihatjadwalKelas").appendChild(tbody);
  $("#tbllihatjadwalKelas").DataTable({
    responsive: true,
    scrollX: false,

    dom: "Blftrip",
    buttons: ["pdf", "print"],
    columnDefs: [
      {
        type: "natural",
        targets: 3,
        targets: 1,
      },
      {
        type: "natural",
        targets: 0,
        visible: false,
      },
    ],
    order: [
      [2, "desc"],
      [3, "asc"],
    ],
    //buttons: ["copy", "csv", "excel", "pdf", "print"],
    //dom: '<"top"if>rt<"bottom"lp><"clear">',
  });
}
