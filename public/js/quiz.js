$( document ).ready(async function() {
    BX24.init(function(){
        BX24.callMethod('user.get', {ID: 1}, function(res){
            if(res.data())
            {
                var user = res.data()[0];
            }
        });        
    });

    const url = '/api/quiz/get';
    const user = JSON.parse(localStorage.getItem("userData"))
    const data = { author: user.id};

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
                        <a href="#" name=${el._id} class="update">Изменить</a>
                        <a href="#" name=${el._id} class="delete">Удалить</a>
                    </div>
                </div>`)
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
    
    $('.delete').click(async(event)=>{
        const url = '/api/quiz/delete';
        let id = event.target.name
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
            if(json.message == 'Success'){
                $(`#${id}`).remove()
                $(`div[name=${id}]`).append('<div class="message">Удалено</div>')
                setTimeout(function () {
                    $(`div[name=${id}]`).remove()
                }, 400);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    })
});

