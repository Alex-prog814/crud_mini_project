(function initStorage(){
    if(!localStorage.getItem('products-data')){
        localStorage.setItem('products-data', '[]')
    }
}());

function setProductsToStorage(products){
    localStorage.setItem('products-data', JSON.stringify(products))
}

function getProductFromStorage(){
    let products = JSON.parse(localStorage.getItem('products-data'))
    return products
}


let addBtn = document.getElementById('add-product__btn');

function getData(){
    let dataObj = {
        name: $('#name-inp').val(),
        description: $('#desc-inp').val(),
        price: $('#price-inp').val()
    }
    return dataObj
}

function render(){
    $('.cards').html('')
    let products = getProductFromStorage()
    products.forEach((item, index) => {
        let newCard = `<div class="card" style="width: 18rem" id="${index}">
                        <img src="https://softech.kg/image/cache/54d8e1aa049541590a400e00f8564dff.jpg" class="card-img-top" alt="photo here">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text">${item.description}</p>
                            <p class="card-price">Price: ${item.price}$</p>
                            <a href="#" class="btn btn-danger">Delete</a>
                        </div>
                    </div>`
        $('.cards').append(newCard)
    })
}
render()

addBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let products = getProductFromStorage()
    let data = {...getData()}
    products.push(data)
    setProductsToStorage(products)
    render()
    $('#name-inp').val('')
    $('#desc-inp').val('')
    $('#price-inp').val('')
})

$('body').on('click', '.btn-danger', (e) => {
    let products = getProductFromStorage()
    let parentId = e.target.parentNode.parentNode.id;
    products.splice(parentId, 1)   
    setProductsToStorage(products) 
    render()
})

// CRUD create read/retrieve update delete
