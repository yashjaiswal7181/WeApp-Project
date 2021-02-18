const $$card = document.querySelector('.card')

if(document.querySelector('#removeIcon')){
    document.querySelector('#removeIcon').addEventListener('click', (e) => {
  $$card.classList.add('removed')
  
  $$card.addEventListener('animationend', () => {
    $$card.classList.add('hide')
  })
})
}

if($$card){
    $$card.addEventListener('pointerdown', () => {
  let timeout = setTimeout(() => {
    $$card.classList.add('draggable')
    $$card.draggable = true;
  }, 300);
  
  
  document.addEventListener('pointerup', function cardEvent() {
    clearTimeout(timeout);
    $$card.classList.remove('draggable');
    $$card.draggable = false;
    $$card.removeEventListener('pointerup', cardEvent);
  })
  
})
}
export function time(unix_timestamp){
    var date = new Date(unix_timestamp * 1000);
// Hours part from the timestamp
var hours = date.getHours();
// Minutes part from the timestamp
var minutes = "0" + date.getMinutes();
// Seconds part from the timestamp
var seconds = "0" + date.getSeconds();

// Will display time in 10:30:23 format
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
return formattedTime
}