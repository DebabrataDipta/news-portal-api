const loadNews = async() =>{
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const newData = data.data.news_category.slice(0,5);
    console.log(newData);
    const tabContainer = document.getElementById('tab-container');
    newData.forEach(news =>{
        const divElement = document.createElement('div');
        divElement.innerHTML=`
        <a onclick="handleShowAll('${news.category_id}')" role="tab" class="tab text-2xl text-[#EB5757] font-semibold">${news.category_name}</a>
        `;
        tabContainer.appendChild(divElement);
    })
};
const handleShowAll = async(categoryId) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`);
    const data = await response.json();
    const newData = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML="";
    newData?.forEach(news => {
        console.log(news);
        const cardElement = document.createElement('div');
        cardElement.innerHTML=`
        <figure><img src="${news.image_url}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${news.title}</h2>
          <p>${news.details.slice(0,110)}</p>
          <p>Total Views: ${news.total_view? news.total_view : "No views"}</p>            
          <div class="card-actions justify-end">
            <button onclick="handleModal('${news._id}')" class="btn btn-primary">Read More</button>
          </div>
        </div>
        `;
        cardContainer.appendChild(cardElement);
    })
};


const handleModal = async(newsId) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await response.json();
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML="";
    const newData = data.data;
    newData.forEach(news => {
        const divElement = document.createElement('div');
        divElement.innerHTML = `
        <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
            <form method="dialog">
                <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <figure><img src="${news.image_url}" alt="Image is not done" /></figure>
            <h3 class="font-bold text-lg">${news.title}</h3>
            <p class="py-4">${news.details}</p>
        </div>
    </dialog>
        `;
        modalContainer.appendChild(divElement);
    })
    const getModel = document.getElementById('my_modal_3');
    getModel.showModal();
}
handleShowAll("01");
loadNews();