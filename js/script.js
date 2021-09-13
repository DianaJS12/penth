const name = document.querySelector('.name')
const image = document.querySelector('#image')
const age = document.querySelector('.age')
const profession  = document.querySelector('.profession')
const button = document.querySelector('.add')
const container = document.querySelector('.card-result')

window.addEventListener('load' , () =>{
    if(!localStorage.getItem('user')){
        localStorage.setItem('user' , JSON.stringify([]))
    }else{
        const data = JSON.parse(localStorage.getItem('user'))

        

        const newdatawithid  = data.map((item , index) =>{
            return{
                ...item,
                id:index
            }
        })
        localStorage.setItem('user' , JSON.stringify([...newdatawithid]))

        const newdata = JSON.parse(localStorage.getItem('user'))

        console.log(newdata);
    
        cardtemplate(newdata)
        
    }
})

button.addEventListener('click' , e =>{
    e.preventDefault()

    if(name.value !== '' && image.value !== '' && age.value !== '' && profession.value !== ''){
        const user = JSON.parse(localStorage.getItem('user'))
    
        localStorage.setItem('user' ,JSON.stringify(
            [
                ...user,
                {
                    name:name.value,
                    image:image.value,
                    profession:profession.value,
                    age:age.value
                }

            ]
        ))
    }
    window.location.reload()
})

function cardtemplate(base){
    const card = base.map(({
        name , image , id , age , profession}) =>{
            return `
                <div class="card-person">
                    <div class="card-center">
                        <img src="${image}" alt="">
                        <i>${name}</i>
                        <h1>${age}</h1>
                        <h1>${profession}
                        <div class="tools">
                            <i class="fas fa-user-edit " data-id="${id}" onclick ="Edit(${id})"></i>
                            <i class="fas fa-trash" data-id="${id}" onclick ="Delete(${id})"></i>
                            <i class="fas fa-caret-square-down" data-id="${id}" onclick ="  More(${id})"></i>
                        </div>
                    </div>
                </div>
                `
        })
    
        container.innerHTML = card
}
function Delete(id){
    const base = JSON.parse(localStorage.getItem('user'))

    const DeletedBase = base.filter(item => item.id !==id)

    localStorage.setItem('user' , JSON.stringify([...DeletedBase]))
    window.location.reload()
}


function Edit(id){
    const base = JSON.parse(localStorage.getItem('user'))

    const fitered = base.map(item =>{
        if(item.id === id){
            return {
                ...item,
                name:prompt('new name')
            }
        }else{
            return item
        }
    })
    localStorage.setItem('user' , JSON.stringify([...filtered]))
    window.location.reload()
}



function More(id){
    const base =JSON.parse(localStorage.getItem('user'))
    localStorage.setItem('SingleUser' , JSON.stringify([base[id]]))

    window.open('single.html' , '_self')
}

const search = document.querySelector('#searching')

search.addEventListener('input' , e => {
    const value = e.target.value.toUpperCase()

    const data = JSON.parse(localStorage.getItem('user'))

    const filteredArray = data.filter(({name}) => name.toUpperCase().includes(value))
    

    cardtemplate(filteredArray)
})