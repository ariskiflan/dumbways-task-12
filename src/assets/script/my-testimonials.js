////////////// OOP CONCEPT //////////////
// class MyTestimonials {
//   #image = "";
//   #content = "";
//   #author = "";

//   constructor(image, content, author) {
//     this.#image = image;
//     this.#content = content;
//     this.#author = author;
//   }

//   html() {
//     return `
//     <div class="box">
//             <a href="detail-project.html">
//               <img src="${this.#image}" alt="" class="testimonials-img" />
//             </a>
//             <p class="testimonials-project-description">${this.#content}</p>
//             <h3 class="testimonials-project-title">- ${this.#author}</h3>
//           </div>
//     `;
//   }
// }

// const myTestimonial1 = new MyTestimonials(
//   "https://cdn0-production-images-kly.akamaized.net/VlfIPSwzuGv-jlIDNf6orv3L4WY=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/980310/original/053143900_1441626669-sanji-472600-untitled_35.png",
//   "mantab sekali!",
//   "Sanji"
// );
// const myTestimonial2 = new MyTestimonials(
//   "https://c4.wallpaperflare.com/wallpaper/605/539/788/one-piece-anime-roronoa-zoro-wallpaper-preview.jpg",
//   "Good Game!",
//   "Zoro"
// );
// const myTestimonial3 = new MyTestimonials(
//   "https://awsimages.detik.net.id/community/media/visual/2022/04/01/manga-one-piece_43.webp?w=600&q=90",
//   "Makasih",
//   "Luffy"
// );

// console.log(myTestimonial1.html());

// const testimonials = [myTestimonial1, myTestimonial2, myTestimonial3];
// let myTestimonialEl = "";

// for (let i = 0; i < testimonials.length; i++) {
//   myTestimonialEl += testimonials[i].html();
// }

// document.querySelector(".testimonials-box").innerHTML = myTestimonialEl;

////////////// HOF //////////////
// const testimonials = [
//   {
//     image:
//       "https://awsimages.detik.net.id/community/media/visual/2022/04/01/manga-one-piece_43.webp?w=600&q=90",
//     content: "Makasih",
//     author: "Luffy",
//     rating: 1,
//   },
//   {
//     image:
//       "https://c4.wallpaperflare.com/wallpaper/605/539/788/one-piece-anime-roronoa-zoro-wallpaper-preview.jpg",
//     content: "Good Game!",
//     author: "Zoro",
//     rating: 2,
//   },
//   {
//     image:
//       "https://cdn0-production-images-kly.akamaized.net/VlfIPSwzuGv-jlIDNf6orv3L4WY=/1200x900/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/980310/original/053143900_1441626669-sanji-472600-untitled_35.png",
//     content: "mantab sekali!",
//     author: "Sanji",
//     rating: 2,
//   },
//   {
//     image:
//       "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/11/28/3045962496.jpg",
//     content: "boleh juga",
//     author: "usop",
//     rating: 4,
//   },
//   {
//     image:
//       "https://static.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/p1/682/2023/10/28/20231028_140338-4278103081.jpg",
//     content: "asikkk bang",
//     author: "nami",
//     rating: 5,
//   },
// ];

// const ratingBtnAll = document.querySelector(".rating-btn-el");

// const allTestimonials = function () {
//   const myTestimonialsEL = testimonials.map((item) => {
//     return `
//     <div class="box">
//     <a href="detail-project.html">
//       <img src="${item.image}" alt="" class="testimonials-img" />
//     </a>
//     <p class="testimonials-project-description">${item.content}</p>
//     <h3 class="testimonials-project-title">- ${item.author}</h3>
//     <p class="testimonials-project-rating">
//       ${item.rating}<i class="ri-star-fill"></i>
//     </p>
//   </div>
//          `;
//   });
//   document.querySelector(".testimonials-box").innerHTML =
//     myTestimonialsEL.join(" ");
// };
// allTestimonials();
// ratingBtnAll.addEventListener("click", allTestimonials);

// function filterTestimonials(rating) {
//   const filteredTestimonial = testimonials
//     .filter((item) => item.rating === rating)
//     .map((item) => {
//       return `
//       <div class="box">
//       <a href="detail-project.html">
//         <img src="${item.image}" alt="" class="testimonials-img" />
//       </a>
//       <p class="testimonials-project-description">${item.content}</p>
//       <h3 class="testimonials-project-title">- ${item.author}</h3>
//       <p class="testimonials-project-rating">
//         ${item.rating}<i class="ri-star-fill"></i>
//       </p>
//     </div>
//          `;
//     });

//   document.querySelector(".testimonials-box").innerHTML =
//     filteredTestimonial.join(" ");
// }

////////////// ASYNC AWAIT, PROMISE, AJAX //////////////

function getDataTestimonials() {
  return new Promise((myResolve, myReject) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://api.npoint.io/22de2ebc1f585670095a", true); // mengirim request

    xhttp.onload = () => {
      if (xhttp.status === 200) {
        const responseText = JSON.parse(xhttp.responseText); // merubah data yang di ambil dari fake api, string menjadi object
        myResolve(responseText); // jika dipenuhi
      } else {
        myReject("ERROR!"); // jika tidak terpenuhi
      }
    };

    xhttp.onerror = () => {
      myReject("Network Error!");
    };

    xhttp.send(); // mengirim request
  });
}

async function allTestimonials() {
  const testimonials = await getDataTestimonials();
  const myTestimonialsEL = testimonials.map((item) => {
    return `
    <div class="box">
    <a href="detail-project.html">
      <img src="${item.image}" alt="" class="testimonials-img" />
    </a>
    <p class="testimonials-project-description">${item.content}</p>
    <h3 class="testimonials-project-title">- ${item.author}</h3>
    <p class="testimonials-project-rating">
      ${item.rating}<i class="ri-star-fill"></i>
    </p>
  </div>
         `;
  });
  document.querySelector(".testimonials-box").innerHTML =
    myTestimonialsEL.join(" ");
}
allTestimonials();

async function filterTestimonials(rating) {
  const testimonials = await getDataTestimonials();
  const filteredTestimonial = testimonials
    .filter((item) => item.rating === rating)
    .map((item) => {
      return `
      <div class="box">
      <a href="detail-project.html">
        <img src="${item.image}" alt="" class="testimonials-img" />
      </a>
      <p class="testimonials-project-description">${item.content}</p>
      <h3 class="testimonials-project-title">- ${item.author}</h3>
      <p class="testimonials-project-rating">
        ${item.rating}<i class="ri-star-fill"></i>
      </p>
    </div>
         `;
    });

  if (!filteredTestimonial.length) {
    return (document.querySelector(
      ".testimonials-box"
    ).innerHTML = `<div class="not-found-box">
      <img src="asset/img/notfound.jpg" alt="" class="not-found img" />
      <h1 class="not-found-title">Data not found!</h1>
      </div>
      `);
  }
  document.querySelector(".testimonials-box").innerHTML =
    filteredTestimonial.join(" ");
}
