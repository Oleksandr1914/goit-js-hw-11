// getEl = x => document.querySelector(x);
// let numberPage = 1;

// getEl('#search-form').addEventListener('submit', onSubmitForm);

// async function onSubmitForm(event) {
//   event.preventDefault();

//   const inputVal = event.target.elements.searchQuery.value;
//   const getData = await getDataOnRequest();
//   function getDataOnRequest() {
//     numberPage += 1;
//     axios
//       .get(
//         `https://pixabay.com/api/?key=30743658-420b85cc9935254192e6e5527&q=${inputVal}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${numberPage}`
//       )
//       .then(response => {
//         ({
//           data: { hits },
//         } = response);
//         return hits;
//       })
//       .then(hits => {
//         const arrCard = hits
//           .map(el => {
//             return `<div class="photo-card">
//           <img src=${el.webformatURL} alt=${el.tags} loading="lazy" width=320 height=200/>
//           <div class="info">
//             <p class="info-item">
//               <b>Likes</b>${el.likes}
//             </p>
//             <p class="info-item">
//               <b>Views</b>${el.views}
//             </p>
//             <p class="info-item">
//               <b>Comments</b>${el.comments}
//             </p>
//             <p class="info-item">
//               <b>Downloads</b>${el.downloads}
//             </p>
//           </div>
//           </div>`;
//           })
//           .join(',');
//         return arrCard;
//       })
//       .then(response => (getEl('.gallery').innerHTML = response))
//       .catch(error => console.log(error));
//   }
// }
