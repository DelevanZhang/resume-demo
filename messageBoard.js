var APP_ID = 'jlXHyMdpOLRGadwHvJjJJwq8-gzGzoHsz';
var APP_KEY = '4HXtoMdNeneHKGspScrLEiRO';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

//test code

//view
let myForm = document.querySelector('#messageBoard')

//获取留言的姓名和值

let subform = myForm.querySelector('#postMessageForm')
console.log('subform')
subform.addEventListener('onsubmit', function (e) {
    console.log('submit')
    e.preventDefault
    let name = subform.querySelector('input[name=name]').value
    let content = subform.querySelector('input[name=content]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'Name': name,
        'Content': content
    }).then(function (object) {
        alert('存入成功')
    })
})
