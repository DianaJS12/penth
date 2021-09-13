const base = JSON.parse(localStorage.getItem('SingleUser'))
const title = document.querySelector('.title')
const container = document.querySelector('.center-block')
const temp = base.map(({name , image , age , profession}) =>{
    container.innerHTML = `
    <div class="card">
        <div class="card-image">
            <img src="${image}" alt="">
        </div>
        <div class="card-body">
            <h2>${name}</h2>
            <h1>${age}</h1>
            <h1>${profession}
        </div>
    </div>
    `

    title.innerHTML = name
})