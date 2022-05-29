$( document ).ready(function() {
    let users = []
    let quizID = null
    localStorage.setItem('opt', 'text')
    $("#user-selector").click(()=>{
        BX24.init(function(){  
            void BX24.selectUsers(selectUsers) 
            function selectUsers(result){
                result.forEach(user => {
                    users.push(user.id)
                });
            }
        });      
    })

    $("#add").submit(async(e)=>{
        e.preventDefault()

        const url = '/api/quiz/add';
        const user = JSON.parse(localStorage.getItem("userData"))
        const data = { author: user.id, title: $('#title').val(), targets: users};

        if($('#title').val()==null || $('#title').val()==""){
            return sendMessage("Необходимо указать название опроса")
        }
        if(users.length == 0){
            return sendMessage("Необходимо выбрать пользователей для опроса")
        }

        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
                sendMessage(json.message)
                localStorage.setItem('quizID', json.id)
                $('#add').remove()
                $('#form-cover').append(
                    `<form id="add-question">
                        <label for="title">Вопрос</label>
                        <input type="text" name="title" id="title">
                        <div class="options">
                            <div class="option">
                                <select class="form-select" name="type" id="type" onchange="changeHandler(event)">
                                    <option value="text">Свой ответ</option>
                                    <option value="option">Варианты</option>
                                </select>
                            </div>
                            <div class="option option-multi">
                                <label for="multi">Мульти</label>
                                <input class="form-check-input" type="checkbox" name="multi" id="multi">
                            </div>
                        </div>
                        <div class="answer" id="answers-area">
                            <h4>Добавьте варианты ответа</h4>
                        </div>
                        <div class="btn-cover">
                            <button class="btn btn-secondary" id="save" onclick="deploy()">Сохранить</button>
                            <div class="btn btn-primary" id="save-add" onclick="deployAndAdd()">Сохранить и добавить вопрос</div>
                        </div>
                    </form>`
                )
        } catch (error) {
            console.error('Ошибка:', error);
        }
    })

    
});

function changeHandler(event){
    localStorage.setItem('opt', event.target.value)
    if(event.target.value != "text"){
        $('.option-multi').css("display", "flex")
        $('#answers-area').css("display", "flex")
        $('#answers-area').append(
            `<div class="input-group mb-3 col-lg-12">
                <input type="text" class="form-control answer-add" placeholder="Введите вариант ответа" aria-label="Введите вариант ответа" aria-describedby="basic-addon2">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" onclick="addOption(event)">+</button>
                </div>
            </div>`
        )
    }else{
        $('.option-multi').css("display", "none")
        $('#answers-area').css("display", "none")
    }
    
}

function addOption(event){
    $('#answers-area').append(
        `<div class="input-group mb-3 col-lg-12">
            <input type="text" class="form-control answer-add" placeholder="Введите вариант ответа" aria-label="Введите вариант ответа" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" onclick="addOption(event)">+</button>
            </div>
        </div>`
    )
}

async function deploy(){
    const vars = []
    let multi = null
    id = localStorage.getItem('quizID')
    const url = '/api/question/add';
    const opt = localStorage.getItem('opt')
    console.log(opt)

    if(opt != "option"){
        let data = {title: $('#title').val(), type: opt, multi: false,  options: null, quiz: id};

        if($('#title').val() == null || $('#title').val()==""){
            return sendMessage("Необходимо ввести вопрос")
        }

        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
        }catch(error){
            console.error('Ошибка:', error);
        }
    }else{
        $(".answer-add").each(function(){
            if($(this).val()!=""){
                vars.push($(this).val())
            }
        });
        if(vars.length == 0){
            return sendMessage('Нет ни одного варианта ответа')
        }

        if ($('#multi').is(':checked')){
            multi = true
        } else {
            multi = false
        }

        let data = {title: $('#title').val(), type: opt, multi: multi,  options: vars, quiz: id};
        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            sendMessage(json.message)
            $('#title').val('')
        }catch(error){
            console.error('Ошибка:', error);
        }
    }
}

async function deployAndAdd(){
    id = localStorage.getItem('quizID')
    const url = '/api/question/add';
    const opt = localStorage.getItem('opt')
    const vars = []
    let multi = null

    if($('#title').val() == null || $('#title').val()==""){
        return sendMessage("Необходимо ввести вопрос")
    }

    if(opt != "option"){
        let data = {title: $('#title').val(), type: opt, multi: false,  options: null, quiz: id};
        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            sendMessage(json.message)
            $('#title').val('')
        }catch(error){
            console.error('Ошибка:', error);
        }
    }else{
        $(".answer-add").each(function(){
            if($(this).val()!=""){
                vars.push($(this).val())
            }
        });
        if(vars.length == 0){
            return sendMessage('Нет ни одного варианта ответа')
        }

        if ($('#multi').is(':checked')){
            multi = true
        } else {
            multi = false
        }

        let data = {title: $('#title').val(), type: opt, multi: multi,  options: vars, quiz: id};
        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            sendMessage(json.message)
            $('#title').val('')
            $('.input-group').remove()
            $('#multi').prop('checked', false);
            $('#type').val('text')

        }catch(error){
            console.error('Ошибка:', error);
        }
    }
}

function sendMessage(message){
    $('#message').append(`<p id="msg">${message}</p>`)
    setTimeout(function(){
        $('#msg').slideUp("slow", ()=>{
            $('#msg').remove()
        })
    }, 3000);
}
