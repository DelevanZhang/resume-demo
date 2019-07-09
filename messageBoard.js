! function () {
    //View
    var view = document.querySelector('#messageBoard')

    //Model
    var model = {
        //初始化
        init: function () {
            var APP_ID = 'jlXHyMdpOLRGadwHvJjJJwq8-gzGzoHsz';
            var APP_KEY = '4HXtoMdNeneHKGspScrLEiRO';

            AV.init({
                appId: APP_ID,
                appKey: APP_KEY
            });
        },
        //获取数据
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find();
        },
        //创建数据
        save: function (name, content) {
            //view
            var Message = AV.Object.extend('Message');
            var message = new Message();
            return message.save({
                'Name': name,
                'Content': content

            })

        }
    }

    //controller
    var controller = {
        view: null,
        model: null,
        ol: null,
        init: function (view, model) {
            this.view = view;
            this.model = model;
            this.form = view.querySelector('#postMessageForm')
            this.ol = view.querySelector('#messageList')
            this.model.init();
            this.loadMessages()
            this.bindEvent();

        },
        bindEvent: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessage();
            })
        },
        loadMessages: function () {

            this.model.fetch().then((message) => {
                let liArray = message.map((item) =>
                    item.attributes
                )

                liArray.forEach((item) => {
                    let li = document.createElement('li')
                    li.innerText = item.Name + ':' + item.Content
                    this.ol.append(li);
                })

            })
        },
        saveMessage: function () {
            let li = document.createElement('li')
            let name = this.form.querySelector('input[name=name]').value
            let content = this.form.querySelector('input[name=content]').value
            this.model.save(name, content).then((object) => {
                let li = document.createElement('li')
                li.innerText = object.attributes.Name + ':' + object.attributes.Content
                this.ol.append(li);
            })

        }
    }
    
    controller.init(view, model);
}.call()