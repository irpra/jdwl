document.addEventListener("DOMContentLoaded", () => {
  //fetch the data as soon as the page has loaded
  let url = "./assets/data/jadwal.xml";
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      //console.log(data); //string
      let parser = new DOMParser();
      let xml = parser.parseFromString(data, "application/xml");
      let y = 0;
      ambilMapel(xml);
      ambilGuru(xml);
      //  ambilHari(xml);
      //lihatjadwal1Kelas(xml);
      lihatAllKelas(xml, y);
      console.log(y);
    });
});

function ambilMapel(x) {
  // creates a <table> element and a <tbody> element
  //const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < x.getElementsByTagName("subject").length; i++) {
    // creates a table row
    const row = document.createElement("tr");

    let arraySubjectAtt = [
      x.getElementsByTagName("subject")[i].getAttribute("id"),
      x.getElementsByTagName("subject")[i].getAttribute("short"),
      x.getElementsByTagName("subject")[i].getAttribute("name"),
    ];

    for (let j = 0; j < arraySubjectAtt.length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      const cellText = document.createTextNode(arraySubjectAtt[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  document.getElementById("tblMapel").appendChild(tblBody);
  $("#tblMapel").DataTable({
    responsive: true,
    scrollX: false,

    dom: "Blftrip",
    buttons: ["pdf", "print"],
    columnDefs: [
      {
        targets: 0,
        visible: false,
        searchable: false,
        orderable: false,
      },
    ],
    order: [[1, "asc"]],
    //buttons: ["copy", "csv", "excel", "pdf", "print"],
    //dom: '<"top"if>rt<"bottom"lp><"clear">',
  });
}

function ambilGuru(x) {
  // creates a <table> element and a <tbody> element
  //const tbl = document.createElement("table");
  const tblBody = document.createElement("tbody");

  // creating all cells
  for (let i = 0; i < x.getElementsByTagName("teacher").length; i++) {
    // creates a table row
    const row = document.createElement("tr");
    gender = x.getElementsByTagName("teacher")[i].getAttribute("gender");
    if (gender == "M") {
      gender = "LAKI-LAKI";
    } else {
      gender = "PEREMPUAN";
    }

    let arrayTeacherAtt = [
      x.getElementsByTagName("teacher")[i].getAttribute("id"),
      x.getElementsByTagName("teacher")[i].getAttribute("short"),
      x.getElementsByTagName("teacher")[i].getAttribute("name"),
      gender,
    ];

    for (let j = 0; j < arrayTeacherAtt.length; j++) {
      // Create a <td> element and a text node, make the text
      // node the contents of the <td>, and put the <td> at
      // the end of the table row
      const cell = document.createElement("td");
      const cellText = document.createTextNode(arrayTeacherAtt[j]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }

    // add the row to the end of the table body
    tblBody.appendChild(row);
  }
  document.getElementById("tblGuru").appendChild(tblBody);
  // put the <tbody> in the <table>
  //tbl.appendChild(tblBody);
  // appends <table> into <body>
  //document.body.appendChild(tbl);
  // sets the border attribute of tbl to '2'
  //tbl.setAttribute( "align", "center");
  // tbl.setAttribute("border","1");

  //$(document).ready(function () {
  $("#tblGuru").DataTable({
    responsive: true,
    scrollX: false,

    dom: "Blftrip",
    buttons: ["pdf", "print"],
    columnDefs: [
      {
        targets: 0,
        visible: false,
        searchable: false,
        orderable: false,
      },
    ],
    order: [[1, "asc"]],
    //buttons: ["copy", "csv", "excel", "pdf", "print"],
    //dom: '<"top"if>rt<"bottom"lp><"clear">',
  });
  //});
}

function lihatAllKelas(x, y) {
  for (y = 0; y < x.getElementsByTagName("class").length; y++) {
    lihatjadwal1Kelas(x, y);
  }
}

function lihatjadwal1Kelas(x, iclass) {
  // CEK IDCLASS UTK MENAMPILKAN NAMA KELAS DAN WALI KELAS
  let idClass = x.getElementsByTagName("class")[iclass].getAttribute("id");
  let nameClass = x.getElementsByTagName("class")[iclass].getAttribute("name");

  let teacheridClass = x
    .getElementsByTagName("class")
    [iclass].getAttribute("teacherid");
  /*
    document
    .getElementById("jdlKelas")
    .appendChild(document.createTextNode("Kelas: " + nameClass));
  for (let i = 0; i < x.getElementsByTagName("teacher").length; i++) {
    idTeacher = x.getElementsByTagName("teacher")[i].getAttribute("id");
    nameTeacher = x.getElementsByTagName("teacher")[i].getAttribute("name");
    if (teacheridClass == idTeacher) {
      document
        .getElementById("walas")
        .appendChild(document.createTextNode("Wali Kelas: " + nameTeacher));
      console.log(nameTeacher);
    }
  }
*/
  //MEMILAH DAFTAR PEMBELAJARAN BERDASARKAN IDCLASS
  countLessonidClass = 0;
  console.log(nameClass)
  document.getElementById(
    "lihatjadwalKelas"
  ).innerHTML += `<h1>Kelas: `+nameClass+`</h1><hr style="border-top: 2px solid red;">`;
  let ul = document.createElement("ol");
  for (let i = 0; i < x.getElementsByTagName("lesson").length; i++) {
    idLesson = x.getElementsByTagName("lesson")[i].getAttribute("id");
    classidsLesson = x
      .getElementsByTagName("lesson")
      [i].getAttribute("classids");
    periodspercardLesson = x
      .getElementsByTagName("lesson")
      [i].getAttribute("periodspercard");
    teachersidsLesson = x
      .getElementsByTagName("lesson")
      [i].getAttribute("teacherids");
    teachersidsLesson = teachersidsLesson.split(",");

    if (classidsLesson == idClass) {
      countLessonidClass = ++countLessonidClass;
      subjectidLesson = x
        .getElementsByTagName("lesson")
        [i].getAttribute("subjectid");
    }

    //KONVERSI SUBJECTID DI PEMBELAJARAN MENJADI NAMA MATA PELAJARAN
    nameSubjectLesson = "";
    if (classidsLesson == idClass && subjectidLesson != "") {
      for (j = 0; j < x.getElementsByTagName("subject").length; j++) {
        idSubject = x.getElementsByTagName("subject")[j].getAttribute("id");
        if (subjectidLesson == idSubject) {
          nameSubjectLesson = x
            .getElementsByTagName("subject")
            [j].getAttribute("name");
        }
      }

      //KONVERSI TEACHERSID DI PEMBELAJARAN MENJADI GENDER & NAMA GURU YANG MENGAMPU MATA PELAJARAN
      nameTeacherLesson = ""; //variabel untuk nama guru di pembelajaran
      titleTeacherLesson = ""; //variabel untuk sebutan guru berdasar gender (akan terisi dg Bapak/Ibu)
      gendernameTeacherLesson = ""; //variabel untuk sebutan dan nama guru
      genderTeacher = ""; //variabel gender di tabel Teacher (isinya M / F)
      periodCard = "";
      daysCard = "";
      namedaysCard = "";
      let li = document.createElement("li"); //persiapan ordered/undered list
      for (t = 0; t < teachersidsLesson.length; t++) {
        for (j = 0; j < x.getElementsByTagName("teacher").length; j++) {
          idTeacher = x.getElementsByTagName("teacher")[j].getAttribute("id");
          
          if (teachersidsLesson[t] == idTeacher) {
            genderTeacher = x
              .getElementsByTagName("teacher")
              [j].getAttribute("gender");
            if (genderTeacher == "M") {
              titleTeacherLesson = "Bapak ";
            } else if (genderTeacher == "F") {
              titleTeacherLesson = "Ibu ";
            } else {
              titleTeacherLesson = "";
            }
            nameTeacherLesson = x
              .getElementsByTagName("teacher")
              [j].getAttribute("name");

            if (teachersidsLesson.length > 1) {
              if (gendernameTeacherLesson != "") {
                gendernameTeacherLesson =
                  gendernameTeacherLesson +
                  " dan " +
                  (titleTeacherLesson + nameTeacherLesson);
              } else
                gendernameTeacherLesson =
                  gendernameTeacherLesson +
                  (titleTeacherLesson + nameTeacherLesson);
            } else {
              gendernameTeacherLesson = titleTeacherLesson + nameTeacherLesson;
            }
            
          }
        }
      }

      //MENGAMBIL HARI-HARI DAN JAM-JAM PERIODE PEMBELAJARAN DI TAG-ID CARD
      countLessonidCard = "";
      namedaysperiodCard = "";
      for (c = 0; c < x.getElementsByTagName("card").length; c++) {
        lessonidCard = x
          .getElementsByTagName("card")
          [c].getAttribute("lessonid");
        if (idLesson == lessonidCard) {
          daysCard = x.getElementsByTagName("card")[c].getAttribute("days");
          for (d = 0; d < x.getElementsByTagName("daysdef").length; d++) {
            daysDaysdef = x
              .getElementsByTagName("daysdef")
              [d].getAttribute("days");
            if (daysDaysdef == daysCard) {
              namedaysCard = x
                .getElementsByTagName("daysdef")
                [d].getAttribute("name");
              periodCard = x
                .getElementsByTagName("card")
                [c].getAttribute("period");
            }
          }
          console.log(
            countLessonidClass,
            nameClass,
            nameSubjectLesson,
            gendernameTeacherLesson,
            namedaysCard,
            periodCard
          );
          let br = document.createElement("br");
          let liText = document.createTextNode(
            "Kelas: " +
              nameClass +
              " Mapel: " +
              nameSubjectLesson +
              " dengan Guru: " +
              gendernameTeacherLesson +
              ", pada hari: " +
              namedaysCard +
              " jam ke-" +
              periodCard
          );
          li.appendChild(liText);
          li.appendChild(br);
          ul.appendChild(li);
        }
      }

      document
        .getElementById("lihatjadwalKelas")
        .appendChild(ul).innerHTML += `<hr style="border-top: 2px solid red;">`;
    }
  }
}

/*

function ambilHari(x) {
  //DEKLARASI VARIABEL YANG DIPERLUKAN
  let idClass = x.getElementsByTagName("class")[10].getAttribute("id");
  let nameClass = x.getElementsByTagName("class")[10].getAttribute("name");
  let teacheridClass = x
    .getElementsByTagName("class")[10]
    .getAttribute("teacherid");
  let periodPeriod = "";
  let periodCard = "";
  let daysCard = "";
  let lessonidCard = "";
  //let idLesson = "";
  let daysDaysdef = "";
  let idSubject = "";

  // MENAMPILKAN NAMA KELAS
  document
    .getElementById("jdlKelas")
    .appendChild(document.createTextNode("Kelas: " + nameClass));

  // MENAMPILKAN WALI KELAS
  for (let i = 0; i < x.getElementsByTagName("teacher").length; i++) {
    idTeacher = x.getElementsByTagName("teacher")[i].getAttribute("id");
    nameTeacher = x.getElementsByTagName("teacher")[i].getAttribute("name");
    if (teacheridClass == idTeacher) {
      document
        .getElementById("walas")
        .appendChild(document.createTextNode("Wali Kelas: " + nameTeacher));
      console.log(nameTeacher);
    }
  }

  // MENAMPILKAN JUDUL KOLOM DALAM HARI
  let thead = document.createElement("thead");
  let rowhead = document.createElement("tr");
  for (let i = 0; i < x.getElementsByTagName("daysdef").length; i++) {
    let cellhead = document.createElement("th");
    let cellheadText = document.createTextNode(
      x.getElementsByTagName("daysdef")[i].getAttribute("name")
    );
    let shortHari = x.getElementsByTagName("daysdef")[i].getAttribute("short");
    if (shortHari != "X" && shortHari != "E") {
      cellhead.appendChild(cellheadText);
    } else {
      i++;
      cellhead.appendChild(document.createTextNode("Jam Ke-"));
    }
    rowhead.appendChild(cellhead);
    //console.log(cellheadText);
  }
  thead.appendChild(rowhead);
  document.getElementById("tblHari").appendChild(thead);

  // MENAMPILKAN ISI JADWAL PELAJARAN KELAS
  console.log(idClass, nameClass);
  let tBody = document.createElement("tBody");
  for (let i = 0; i < x.getElementsByTagName("period").length; i++) {
    let rowbody = document.createElement("tr");
    periodPeriod = x.getElementsByTagName("period")[i].getAttribute("period");
    let jmlsesuaiKelas = 0;
    for (let j = 0; j < x.getElementsByTagName("lesson").length; j++) {
      classidsLesson = x
        .getElementsByTagName("lesson")
        [j].getAttribute("classids");
      if (classidsLesson == idClass) {
        jmlsesuaiKelas = ++jmlsesuaiKelas;
        idLesson = x.getElementsByTagName("lesson")[j].getAttribute("id");
        subjectidLesson = x.getElementsByTagName("lesson")[j].getAttribute("subjectid")
        for (k = 0; k < x.getElementsByTagName("card").length; k++) {
          lessonidCard = x
            .getElementsByTagName("card")
            [k].getAttribute("lessonid");
          periodCard = x.getElementsByTagName("card")[k].getAttribute("period");
          
          if ((idLesson = lessonidCard)&&(periodCard == periodPeriod)) {
            //adaCardLesson = ++adaCardLesson;
            
            //nameLesson = x.getElementsByTagName("subject")[k].getAttribute("name");
            cellbodyText = document.createTextNode(subjectidLesson);
            let cellbody = document.createElement("td");
            cellbody.appendChild(cellbodyText);
            rowbody.appendChild(cellbody);
            console.log(classidsLesson, jmlsesuaiKelas, idLesson);
          }
        }
      }

      console.log(x.getElementsByTagName("lesson").length);
    }
    tBody.appendChild(rowbody);
  }

  document.getElementById("tblHari").appendChild(tBody);
}
*/
