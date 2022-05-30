$( document ).ready(async function() {
    BX24.init(function(){
        BX24.callMethod('user.get', {ID: 1}, function(res){
            if(res.data())
            {
                var user = res.data()[0];
            }
        });        
    });

    const url = '/api/quiz/get.for.complete';
    const user = JSON.parse(localStorage.getItem("userData"))
    const data = {targets : user.id};

    try {
        const response = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        json.result.forEach(el => {
            console.log(el)
            $('#quizzes').append(
                `<div class="quiz-el" name=${el._id}>
                    <h3>${el.title}</h3>
                    <div class="controls" id=${el._id}>
                        <a href="#" name=${el._id} class="complete btn btn-primary">Приступить</a>
                    </div>
                </div>`)
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }

    $('.complete').click(async(event)=>{
        const url = '/api/question/getall';
        let id = event.target.name
        localStorage.setItem('quizID', id)
        const data = {id: id};

        try {
            const response = await fetch(url, {
                method: 'POST', 
                body: JSON.stringify(data),
                headers: {
                'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            $('h1').remove()
            $('#quizzes').remove()

            json.result.forEach(el => {
                $('.content').append(
                    `<div class="answer-el" name=${el._id}>
                        <h3>${el.title}</h3>
                        <div class="answer-vars" id=${el._id}>    
                        </div>
                    </div>`)
                if(el.type == 'option'){
                    el.options.forEach(v => {
                        $(`#${el._id}`).append(
                            `<div class="var" name=${el._id}>
                            ${v}
                            </div>`
                        )
                    })
                }else{
                    $('.answer-vars').append(`
                        <textarea name="${el._id}" cols="30" rows="5" placeholder="Введите ответ"></textarea>
                    `)
                }
            })


        } catch (error) {
            console.error('Ошибка:', error);
        }
    })
    
});