"use strict";
document.addEventListener("DOMContentLoaded", () => {
  let listCompanies = [];
  fetch(
    "http://codeit.pro/codeitCandidates/serverFrontendTest/company/getList",
    {
      method: "get"
    }
  )
    .then(res => res.json())
    .then(json => {
      listCompanies = [...json.list];
      let result = [];
      for (let i = 0; i < listCompanies.length; i++) {
        let a = listCompanies[i].location.name;
        if (result[a] != undefined) {
          ++result[a];
        } else {
          result[a] = 1;
        }
        Array.from(result);
      }
      fetch(
        "http://codeit.pro/codeitCandidates/serverFrontendTest/news/getList",
        {
          method: "get"
        }
      )
        .then(res => res.json())
        .then(json => {
          const listNews = [...json.list];
          console.log(listNews);
          let newsList = document.getElementById("newsList");
          for (let i = 0; i < listNews.length; i++) {
            let div = document.createElement("div");
            div.className = "newsDiv";
            let div2 = document.createElement("div2");
            let slide = document.createElement("slide");
            let img = document.createElement("img");
            let author = document.createElement("p");
            let date = document.createElement("p");
            let d = new Date(listNews[i].date * 1000);
            let description = document.createElement("p");
            let link = document.createElement("a");
            link.href = "https://" + listNews[i].link;
            link.textContent = listNews[i].link;
            slide.className = "slide";
            description.className = "newsDesc";
            if (listNews[i].description.length < 200) {
              description.textContent = listNews[i].description;
            } else {
              let desc = listNews[i].description.slice(0, 200);
              description.textContent = desc + "...";
            }
            date.innerHTML = `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`;
            author.innerHTML = "Author: " + listNews[i].author;
            img.src = listNews[i].img;
            img.className = "newsImg";

            div2.appendChild(link);
            div2.appendChild(description);
            div.appendChild(img);
            //div.appendChild
            div.appendChild(author);
            div.appendChild(date);
            slide.appendChild(div);
            slide.appendChild(div2);
            newsList.appendChild(slide);
          }

          const slides = document.querySelectorAll("#newsList .slide");
          slides[0].className = "slide showing";
          let currentSlide = 0;

          function nextSlide() {
            goToSlide(currentSlide + 1);
          }

          function previousSlide() {
            goToSlide(currentSlide - 1);
          }

          function goToSlide(n) {
            slides[currentSlide].className = "slide";
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].className = "slide showing";
          }

          let next = document.getElementById("next");
          let previous = document.getElementById("previous");

          next.onclick = function() {
            nextSlide();
          };
          previous.onclick = function() {
            previousSlide();
          };
        });

      const listCompaniesName = [];
      for (let i = 0; i < listCompanies.length; i++) {
        listCompaniesName.push(listCompanies[i].name);
      }

      const load = document.getElementsByClassName("floatingCirclesG");
      const listOFCompanies = document.getElementById("list");
      const totalCompaies = document.getElementById("circle");
      const componentsByLocation = document.getElementById("piechart");
      const companyPartners = document.getElementById("companyPartners");
      const listPartners = document.getElementById("listPartners");
      const listCBL = document.getElementById("selectCBL");
      const labelCBL = document.getElementById("labelCBL");
      const sortPercentage = document.getElementById("sortPercentage");
      const news = document.getElementById("newsList");
      listOFCompanies.style.display = "none";
      totalCompaies.style.display = "none";
      componentsByLocation.style.display = "none";
      news.style.display = "none";

      function sortFromHightoLow(a, b) {
        if (a.value < b.value) return 1;
        if (a.value > b.value) return -1;
      }

      function sortFromLowtoHigh(a, b) {
        if (a.value > b.value) return 1;
        if (a.value < b.value) return -1;
      }
      createOptions();
      sortPercentage.addEventListener("click", () => {
        if (
          sortPercentage.childNodes[1].className === "fas fa-sort-amount-down"
        ) {
          sortPercentage.childNodes[1].classList.remove("fa-sort-amount-down");
          sortPercentage.childNodes[1].classList.add("fa-sort-amount-up");
          createOptions();
        } else {
          sortPercentage.childNodes[1].classList.remove("fa-sort-amount-up");
          sortPercentage.childNodes[1].classList.add("fa-sort-amount-down");
          createOptions();
        }
      });

      function createOptions() {
        for (let i = 0; i < listCompaniesName.length; i++) {
          let opt = listCompaniesName[i];
          let el = document.createElement("option");
          el.textContent = opt;
          el.value = opt;
          el.addEventListener("click", () => {
            companyPartners.style.display = "block";
            let arrPartners = [...listCompanies[i].partners];

            arrPartners.sort(sortFromHightoLow);

            //function changeSortPercentage() {
            //document.getElementById("sortPercentage").click();
            if (
              sortPercentage.childNodes[1].className ===
              "fas fa-sort-amount-down"
            ) {
              arrPartners.sort(sortFromLowtoHigh);
              createCompanyPartners();
            } else {
              arrPartners.sort(sortFromHightoLow);
              createCompanyPartners();
            }
            // }

            function createCompanyPartners() {
              listPartners.innerHTML = null;
              for (let i = 0; i < arrPartners.length; i++) {
                let containerLi = document.createElement("div");
                containerLi.className = "containerLi";
                let li = document.createElement("div");
                li.textContent = arrPartners[i].name;
                li.className = "rectangle";
                let li2 = document.createElement("div");
                li2.className = "neck";
                let li3 = document.createElement("div");
                li3.textContent = arrPartners[i].value + "%";
                li3.className = "circle";
                containerLi.insertAdjacentElement("afterbegin", li);
                containerLi.insertAdjacentElement("afterbegin", li2);
                containerLi.insertAdjacentElement("afterbegin", li3);

                listPartners.appendChild(containerLi);
              }
            }
            createCompanyPartners();
          });

          listOFCompanies.appendChild(el);
        }
      }

      setTimeout(() => {
        for (let l of load) {
          l.style.display = "none";
        }
        // Display all blocks when data loaded + 1.5 sec
        listOFCompanies.style.display = "block";
        totalCompaies.style.display = "block";
        componentsByLocation.style.display = "block";
        news.style.display = "block";
        totalCompaies.innerText = listCompanies.length;
      }, 1500);

      let arr = [];
      google.charts.load("current", { packages: ["corechart"] });
      google.charts.setOnLoadCallback(drawChart);
      for (let r in result) {
        arr.push([r, result[r]]);
      }
      arr.unshift(["header", "header"]); // Don`t work without header
      function drawChart() {
        let data = google.visualization.arrayToDataTable([...arr]);

        const chart = new google.visualization.PieChart(
          document.getElementById("piechart")
        );

        chart.draw(data);
        google.visualization.events.addListener(chart, "select", function(e) {
          console.log(getSelection().anchorNode.textContent);
          if (
            getSelection().anchorNode.textContent.length > 3 &&
            getSelection().anchorNode.textContent.length < 30
          ) {
            const selectedCountry = getSelection().anchorNode.textContent; // only legenda elem has prop textContent with location
            for (let i = 0; i < listCompanies.length; i++) {
              if (listCompanies[i].location.name === selectedCountry) {
                componentsByLocation.style.display = "none";
                listCBL.style.display = "block";
                let opt = listCompaniesName[i];
                let el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                listCBL.appendChild(el);
              }
            }
            let elem = document.createElement("i");
            elem.className = "fas fa-arrow-left";
            elem.style.cssFloat = "right";
            elem.addEventListener("click", backToLocation);

            labelCBL.appendChild(elem);

            function backToLocation() {
              listCBL.style.display = "none";
              componentsByLocation.style.display = "block";
              labelCBL.removeChild(elem);
              while (listCBL.firstChild) {
                listCBL.removeChild(listCBL.firstChild);
              }
            }
          } else {
            alert("to show list of companies by location type on legenda");
          }
        });
      }
    })
    .catch(error => console.log(error));
});
