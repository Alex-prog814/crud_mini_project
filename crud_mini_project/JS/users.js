(function initStorage(){
    if(!localStorage.getItem('users-data')){
        localStorage.setItem('users-data', '[]')
    }
}());

function setUserToStorage(users){
    localStorage.setItem('users-data', JSON.stringify(users))
}

function getUsersFromStorage(){
    let users = JSON.parse(localStorage.getItem('users-data'));
    return users
}

function render(){
    let users = getUsersFromStorage()
    $('table').html(`<tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Photo</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>`)
    users.forEach((item, index) => {
        let newUser = `<tr id="${index}">
                            <td><a class="modal-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${item.name}</a></td>
                            <td>${item.email}</td>
                            <td>${item.age}</td>
                            <td class="photo_td"><img src="${item.photoUrl}" alt="" class="user-photo"></td>
                            <td><button class="btn btn-success">Update</button></td>
                            <td><button class="btn btn-danger">Delete</button></td>
                        </tr>`
        $('table').append(newUser)
    })
}
render()

// get data from input
function getData(){
    let userData = {
        name: $('#name-inp').val(),
        email: $('#email-inp').val(),
        age: $('#age-inp').val(),
        photoUrl: $('#photo-inp').val()
    }
    $('#name-inp').val('')
    $('#email-inp').val('')
    $('#age-inp').val('')
    $('#photo-inp').val('')
    return userData
}

// add user
$('.add-user__btn').on('click', (e) => {
    e.preventDefault()
    let data = {...getData()}
    let users = getUsersFromStorage()
    users.push(data)
    setUserToStorage(users)
    render()
})

// delete user
$('body').on('click', '.btn-danger', (e) => {
    let users = getUsersFromStorage()
    let parentId = e.target.parentNode.parentNode.id
    users.splice(parentId, 1)
    setUserToStorage(users)
    render()
})

// get edit data to input
$('body').on('click', '.btn-success', (e) => {
    let users = getUsersFromStorage()
    let parentId = e.target.parentNode.parentNode.id
    let currElem = users[parentId]
    $('#name-inp').val(`${currElem.name}`)
    $('#email-inp').val(`${currElem.email}`)
    $('#age-inp').val(`${currElem.age}`)
    $('#photo-inp').val(`${currElem.photoUrl}`)
    $('.edit-user__btn').attr('id', parentId)
})

// edit user
$('.edit-user__btn').on('click', (e) => {
    e.preventDefault()
    if(e.target.id === '') return
    let users = getUsersFromStorage()
    let editElem = users[e.target.id]
    editElem = {...getData()}
    users.splice(e.target.id, 1, editElem)
    setUserToStorage(users)
    $('.edit-user__btn').attr('id', '')
    render()
})

// modal
$('body').on('click', '.modal-link', (e) => {
    let users = getUsersFromStorage()
    let currElem = users[e.target.parentNode.parentNode.id]
    $('.modal-title').text(`${currElem.name}`)
    $('.modal-img').attr('src', `${currElem.photoUrl}`)
    $('.modal-email').text(`${currElem.email}`)
})





