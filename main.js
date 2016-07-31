'use strict';

$(()=>{
  $('#sendinfo').submit(addInfos);
  let infos = namesFromStorage();
  let $lis = infos.map(obj => createLi(obj));  
  $('#list').append($lis);
  $('#list').on('click', 'button.del', removeInfo);
  $('#list').on('click', 'button.editbtn', openEditModal);
  $('#editForm').on('click', 'button.confirm', updateInfo);
});

function addInfos(event){
  event.preventDefault();

  let newContact = {};

  let name = $('#name').val();
  $('#name').val('');
  newContact.name = name;

  let phone = $('#phno').val();
  $('#phono').val('');
  newContact.phone = phone;

  let address = $('#address').val();
  $('#address').val('');
  newContact.address = address;

  let mail = $('#mail').val();
  $('#mail').val('');
  newContact.mail = mail;

  let colleague = $('#colleague').val();
  $('#colleague').val('');
  newContact.colleague = colleague;

  let family = $('#family').val();
  $('#family').val('');
  newContact.family = family;

  let friend = $('#friend').val();
  $('#friend').val('');
  newContact.friend = friend;

  let photo = " ";
  $('photo').val('');
  newContact.photo = photo;

  // console.log(newContact);
  let $li = createLi(newContact);
  $('#listContainer').append($li);
  addToStorage(newContact);
  location.reload();
}

function createLi(obj){
  let $div = $('#template').clone();
  $div.removeAttr('id');

  $div.find('.photo').attr('src', "");
  $div.find('.getName').text(obj["name"]);
  $div.find('.phno').text(obj["phone"]);
  $div.find('.address').text(obj["address"]);
  $div.find('.email').text(obj["mail"]);
  $div.find('.colleague').text(obj["colleague"]);
  $div.find('.family').text(obj["family"]);
  $div.find('.friend').text(obj["friend"]);

  return $div;
}

function addToStorage(obj){
  let infos = namesFromStorage();
  infos.push(obj);
  writeToStorage(infos);
}

function writeToStorage(infos) {
  localStorage.infos = JSON.stringify(infos);
}

function namesFromStorage() {
  // read 
  let json = localStorage.infos;
  let infos;
  // parse
  //judging the name is legal or not.
  try {
    infos = JSON.parse(json);  // parse a string as JSON, and transform a JS object.
  } catch(e) {
    infos = [];
  }
  return infos;
}

function removeInfo(){
  let $li = $(this).parent().parent().parent().parent().parent();
  let index = $li.index();
  removeFromStorage(index);
  $li.remove();
}

function removeFromStorage(index){
  let infos = namesFromStorage();
  infos.splice(index, 1);
  writeToStorage(infos);
}

function openEditModal(){
  let $li = $(this).parent().parent().parent().parent().parent();
  let index = $li.index();

  let name = $(this).parent().siblings('h3').text();
  $('#editName').val(name);

  let phone = $(this).parent().siblings('p#p').children().text();
  $('#editPhno').val(phone);

  let address = $(this).parent().siblings('p#a').children().text();
  $('#editAddress').val(address);

  let mail = $(this).parent().siblings('p#e').children().text();
  $('#editMail').val(mail);

  let colleague = $(this).parent().siblings('p#c').children().text();
  $('#editColleague').val(colleague);

  let family = $(this).parent().siblings('p#fa').children().text();
  $('#editFamily').val(family);

  let friend = $(this).parent().siblings('p#fr').children().text();
  $('#editFriends').val(friend);

  $('#editModal').data('index', index);  
}

function updateInfo(){
  let index = $('#editModal').data('index');
  let newName = $('#editName').val();
  let newPhno = $('#editPhno').val();
  let newAddress = $('#editAddress').val();
  let newMail = $('#editMail').val();
  let newColleague = $('#editColleague').val();
  let newFamily = $('#editFamily').val();
  let newFriends = $('#editFriends').val();

  let json = localStorage.infos;
  let infos = JSON.parse(json);
  let info = infos[index];
  info["name"] = newName;
  info["phone"] = newPhno;
  info["address"] = newAddress;
  info["mail"] = newMail;
  info["colleague"] = newColleague;
  info["family"] = newFamily;
  info["friend"] = newFriends;

  saveInfo(info, index);
  location.reload();
 
}

function saveInfo(obj, index){
  let json = localStorage.infos;
  let infos = JSON.parse(json);
  infos[index] = obj;
  localStorage.infos = JSON.stringify(infos);  
}



