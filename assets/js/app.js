const cl = console.log;

const todoform = document.getElementById('todoform')
const todocontainer = document.getElementById('todocontainer')
const todoinput = document.getElementById('todoinput')
const addtodobtn =  document.getElementById('addtodobtn')
const updatetodobtn =  document.getElementById('updatetodobtn')
const alertmsg =  document.getElementById('alertmsg')



let todoarr = localStorage.getItem('todoarr') ? JSON.parse(localStorage.getItem('todoarr')) : []
const showalerttodo = () => {
    if(todoarr.length === 0){
        alertmsg.classList.remove('d-none')
        todocontainer.classList.add('d-none')
    }else{
        alertmsg.classList.add('d-none')
        todocontainer.classList.remove('d-none') 
    }
}
showalerttodo()


const generateUuid = ()=>{
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  };
  const showmsg = (msg, iconname) =>{
    Swal.fire({
        title: msg,
        icon: iconname
      });
  }
const createlis = (arr) =>{
let result = ``
arr.forEach(li => {
    result += `<li class="list-group-item d-flex justify-content-between" id="${li.id}"><strong>${li.todo}</strong> 
<div class="btns"> 
    <i class="fas fa-edit fa-2x text-info mx-2" onclick="ontodoedit(this)"></i>
    <i class="fas fa-trash fa-2x text-danger mx-2" onclick="ontodoremove(this)"></i></div></li> `
})
todocontainer.innerHTML = result

}
createlis(todoarr)

const ontodoedit = (e) => {
    let editid = e.closest('li').id
    localStorage.setItem('editid', editid)
  let editobj =   todoarr.find(li => li.id === editid)
  todoinput.value = editobj.todo
  addtodobtn.classList.add('d-none')
  updatetodobtn.classList.remove('d-none')
  }
  
  const onupdatetodo = () =>{
    let editid = localStorage.getItem('editid')
    let newobj = {
        todo : todoinput.value,
        id : editid
    }
    todoform.reset()
    let editindex = todoarr.findIndex(todo => todo.id === editid)
    todoarr[editindex] = newobj
    localStorage.setItem('todoarr', JSON.stringify(todoarr))
    let editli = document.getElementById(editid).firstElementChild
    editli.innerHTML = newobj.todo
    addtodobtn.classList.remove('d-none')
    updatetodobtn.classList.add('d-none')
showmsg('TODO Updated Succesfully!', 'success')

  }
const ontodoremove = (e) => {
    let getconfirm = confirm('Are you sure want to remove')
    if(getconfirm){
        let removeid = e.closest('li').id
        let removeidex = todoarr.findIndex(todo => todo.id === removeid)
        todoarr.splice(removeidex, 1)
        localStorage.setItem('todoarr', JSON.stringify(todoarr))
        document.getElementById(removeid).remove()
showmsg('TODO Removed Succesfully!', 'success')
showalerttodo()
    }
   
}

const ontodosubmit = (e) => {
e.preventDefault()
let obj = {
    todo : todoinput.value,
    id : generateUuid()
}
todoarr.unshift(obj)
localStorage.setItem('todoarr', JSON.stringify(todoarr))
let li = document.createElement('li')
li.className = `list-group-item d-flex justify-content-between`
li.id = obj.id
li.innerHTML = ` <strong>${obj.todo}</strong> 
<div class="btns"> 
    <i class="fas fa-edit fa-2x text-info mx-2" onclick="ontodoedit(thisthis)"></i>
    <i class="fas fa-trash fa-2x text-danger mx-2" onclick="ontodoremove(thisthis)"></i></div>`
    todocontainer.prepend(li)
todoform.reset()
showmsg('TODO Added Succesfully!', 'success')
showalerttodo()
}



updatetodobtn.addEventListener('click', onupdatetodo)
todoform.addEventListener('submit', ontodosubmit)



const stdform = document.getElementById('stdform')
const fname = document.getElementById('fname')
const lname = document.getElementById('lname')
const contact = document.getElementById('contact')
const email = document.getElementById('email')
const stdcontainer = document.getElementById('stdcontainer')
const stdtable = document.getElementById('stdtable')
const stdalert = document.getElementById('stdalert')
const stdsubmit = document.getElementById('addstdbtn')
const updatestdbtn = document.getElementById('updatestdbtn')



let stdarr = localStorage.getItem('stdarr') ? JSON.parse(localStorage.getItem('stdarr')) : []
let stdalertmsg = () => {
    if (stdarr.length === 0){
        stdalert.classList.remove('d-none')
        stdtable.classList.add('d-none')
    }else{
        stdalert.classList.add('d-none')
        stdtable.classList.remove('d-none') 
    }
}

stdalertmsg()

const createtrs = (arr) =>{
    let result = ``
    arr.forEach((tr, i) => {
        result += `  <tr>
            <td>${i + 1}</td>
            <td>${tr.fname}</td>
            <td>${tr.lname}</td>
            <td>${tr.contact}</td>
            <td>${tr.email}</td>
            <td><i class="fas fa-edit fa-2x text-info mx-2" onclick="onstdedit(this)"></i></td>
            <td> <i class="fas fa-trash fa-2x text-danger mx-2" onclick="onstdremove(this)"></i></td>
        </tr>`
    })
    stdcontainer.innerHTML = result
    
    }
    createtrs(stdarr)

const onstdedit = (e) =>{
  
        let stdeditid = e.closest('tr').id
        localStorage.setItem('stdeditid', stdeditid)
      let editobj =   stdarr.find(tr => tr.id === stdeditid)
      fname.value = editobj.fname
      lname.value = editobj.lname
      contact.value = editobj.contact
      email.value = editobj.email

      stdsubmit.classList.add('d-none')
      updatestdbtn.classList.remove('d-none')
      
}
const onupdatestd = () => {
let stdeditid = localStorage.getItem('stdeditid')
    let newobj = {
        fname : fname.value,
        lname : lname.value,
        contact : contact.value,
        email : email.value,
        id : stdeditid
    }
    stdform.reset()
    let editindex = stdarr.findIndex(tr => tr.id === stdeditid)
    stdarr[editindex] = newobj
    localStorage.setItem('stdarr', JSON.stringify(stdarr))
    let edittr = [...document.getElementById(stdeditid).children]
    edittr[1].innerHTML = newobj.fname
    edittr[2].innerHTML = newobj.lname
    edittr[3].innerHTML = newobj.contact
    edittr[4].innerHTML = newobj.email

    stdsubmit.classList.remove('d-none')
    updatestdbtn.classList.add('d-none')
showmsg('Student Updated Succesfully!', 'success')

}
const onstdremove = (e) => {
    let getconfirm = confirm('Are you sure want to remove')
    if(getconfirm){
        let removeid = e.closest('tr').id
        let removeidex = stdarr.findIndex(tr => tr.id === removeid)
        stdarr.splice(removeidex, 1)
        localStorage.setItem('stdarr', JSON.stringify(stdarr))
       document.getElementById(removeid).remove()
showmsg('Student Removed Succesfully!', 'success')
stdalertmsg()
let trs = [...document.querySelectorAll('#stdcontainer tr')]
trs.forEach((tr, i) => {
    tr.firstElementChild.innerHTML =  i + 1
})
    }
   
}
const onstdadd = (e) => {
e.preventDefault()
let obj = {
    fname : fname.value,
    lname : lname.value,
    contact : contact.value,
    email : email.value,
    id : generateUuid()
}
stdarr.push(obj)
localStorage.setItem('stdarr', JSON.stringify(stdarr))
let newtr = document.createElement('tr')
newtr.id = obj.id
newtr.innerHTML = ` <td>${stdarr.length}</td>
            <td>${obj.fname}</td>
            <td>${obj.lname}</td>
            <td>${obj.contact}</td>
            <td>${obj.email}</td>
            <td><i class="fas fa-edit fa-2x text-info mx-2" onclick="onstdedit(this)"></i></td>
            <td> <i class="fas fa-trash fa-2x text-danger mx-2" onclick="onstdremove(this)"></i></td>`
            stdcontainer.append(newtr)
            stdform.reset()
stdalertmsg()
showmsg('Student Added Successfully!', 'success')
}



updatestdbtn.addEventListener('click', onupdatestd)
stdform.addEventListener('submit', onstdadd)
