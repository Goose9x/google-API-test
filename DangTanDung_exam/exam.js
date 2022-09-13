let input = document.getElementById("inputText");

function getData(url, fn) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        fn(undefined, JSON.parse(xhr.responseText));
      } else {
        fn(new Error(xhr.statusText), undefined);
      }
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
}

input.addEventListener("keyup", () => {
  let list = document.getElementById("autoSuggestionBox");
  list.innerHTML = "";
  getData(
    `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${input.value}`,
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
      let title = [];

      for (i = 0; i < res[1].length; i++) {
        // title.push(res[1][i]);
        let testThuXem = res[1][i];
        let wikiLink = res[3][i];
        console.log(testThuXem);
        getData(
          `https://en.wikipedia.org/w/api.php?
        origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${testThuXem}`,
          (errImg, resImg) => {
            if (err) {
              console.log(errImg);
            } else {
              console.log(resImg);
              // Lấy link ảnh
              let ggImg = resImg.query.pages;
              // console.log(Object.keys(ggImg)[0]); //Lấy số
              let a = Object.keys(ggImg)[0];
              let imgFinalLink = resImg.query.pages[a].thumbnail.source;
              // console.log(imgFinalLink);
              // Lấy link miêu tả
              let finalDes =
                resImg.query.pages[a].pageprops["wikibase-shortdesc"];
              list.innerHTML += `<a href="${wikiLink}"><li class="miniSuggection">
              <div class="thumbnail"><img src="${imgFinalLink}" alt=""></div>
              <div class="infor">
                  <div class="title">${testThuXem}</div>
                  <div class="description">${finalDes}</div>
              </div>
            </li></a>`;
            }
          }
        );
      }
      console.log(title);

      // Tìm ảnh
      // for (j = 0; j < title.length; j++) {
      //   getData(
      //     `https://en.wikipedia.org/w/api.php?
      //   origin=*&action=query&prop=pageprops|pageimages&format=json&titles=${title[j]}`,
      //     (errImg, resImg) => {
      //       if (err) {
      //         console.log(errImg);
      //       } else {
      //         console.log(resImg);
      //       }
      //       // let imgJson = JSON.parse(resImg)
      //       // console.log(imgJson.query.thumbnail.source);
      //       let ggImg = resImg.query.pages;
      //       console.log(Object.keys(ggImg)[0]); //Lấy số
      //       let a = Object.keys(ggImg)[0];
      //       let imgFinalLink = resImg.query.pages[a].thumbnail.source;
      //       console.log(imgFinalLink);
      //     }
      //   );
      //   // Đẩy vào ul
      //   // list.innerHTML += `<li class="miniSuggection">
      //   //   <div class="thumbnail"><img src="${imgFinalLink[j]}" alt=""></div>
      //   //   <div class="infor">
      //   //       <div class="title">${title[i]}</div>
      //   //       <div class="description">this is an example of this test</div>
      //   //   </div>
      //   // </li>`;
      // }
    }
  );
});
