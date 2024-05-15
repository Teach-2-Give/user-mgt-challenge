let username = document.getElementById('name')
let phone = document.getElementById('phone_no')
let email = document.getElementById('email')

let nameError = document.querySelector('#nameError')
let phonenoError = document.querySelector('#phonenoError')
let emailError = document.querySelector('#emailError')

let createUserForm = document.querySelector('.create-user-form')

let allUsers = JSON.parse(localStorage.getItem('users')) || []

createUserForm.addEventListener('submit', (event)=>{
    event.preventDefault();

    fullname = username.value.trim() !== ''
    phonenumber = phone.value.trim() !== '' 
    useremail = email.value.trim() !== '' 

    if(!fullname){
        nameError.textContent = 'Name is required'
        nameError.style.color = 'red'
        setTimeout(() => {
            nameError.textContent = ''
        }, 3000);
    }
    if(!phonenumber){
        phonenoError.textContent = 'Phone number is required'
        phonenoError.style.color = 'red'
        setTimeout(() => {
            phonenoError.textContent = ''
        }, 3000);
    }
    if(!useremail){
        emailError.textContent = 'Email is required'
        emailError.style.color = 'red'
        setTimeout(() => {
            emailError.textContent = ''
        }, 3000);
    }
    
    user = fullname && phonenumber && useremail

    let newUser ={
        full_name: username.value.trim(),
        phone_number: phone.value.trim(),
        user_email: email.value.trim()
    }

    if(user == true){
        let editIndex = parseInt(createUserForm.dataset.editIndex)
        if (isNaN(editIndex)) {
            // Add new user
            allUsers.push(newUser)
        } else {
            // Edit existing user
            allUsers[editIndex] = newUser
            // Reset edit index
            createUserForm.dataset.editIndex = ''
            // Change button back to Create
            createUserForm.querySelector('.btnsubmit').value = 'Create Account'
        }
        
        console.log(allUsers);

        localStorage.setItem('users', JSON.stringify(allUsers))

        username.value = ''
        phone.value = ''
        email.value = ''

        displayUsers()
    }
})

function displayUsers(){

    let existingUsers = document.querySelectorAll('#displayUserstbl .userdata')
    existingUsers.forEach(userRow=>{
        userRow.remove();
    })
  
    allUsers.forEach((user, index)=>{

        let userNumber = document.createElement('td')
        userNumber.textContent = index + 1

        let userName = document.createElement('td')
        userName.textContent = user.full_name

        let userPhone = document.createElement('td')
        userPhone.textContent = user.phone_number

        let userEmail = document.createElement('td')
        userEmail.textContent = user.user_email

        let deleteUserbtn = document.createElement('button')
        deleteUserbtn.textContent = 'Delete'
        deleteUserbtn.addEventListener('click', ()=>{
            allUsers.splice(index, 1)
            localStorage.setItem('users', JSON.stringify(allUsers))
            displayUsers()
        })

        let updateUserbtn = document.createElement('button')
        updateUserbtn.textContent = 'Update'
        updateUserbtn.style.marginLeft = '10px'
        updateUserbtn.addEventListener('click', ()=>{
            // Populate form fields with user details
            username.value = user.full_name
            phone.value = user.phone_number
            email.value = user.user_email

            // Change Create button to Save button
            createUserForm.querySelector('.btnsubmit').value = 'Save'
            
            // Save the index of the user being edited
            createUserForm.dataset.editIndex = index
        })

        let row = document.createElement('tr')
        row.className = 'userdata'

        row.appendChild(userNumber)
        row.appendChild(userName)
        row.appendChild(userPhone)
        row.appendChild(userEmail)
        row.appendChild(deleteUserbtn)
        row.appendChild(updateUserbtn)

        let displayUserstbl = document.querySelector('#displayUserstbl')
        displayUserstbl.appendChild(row)

    })
}

displayUsers()

