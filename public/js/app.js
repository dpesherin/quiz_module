$( document ).ready(function() {
    BX24.init(function(){
        BX24.callMethod('user.current', {}, function(res){
            if(res.data())
            {
                var user = res.data();
                if(!!user)
                    if(user.PERSONAL_PHOTO != null){
                        $('#user-place').append(`<img src="${user.PERSONAL_PHOTO}" class="user-avatar">`)
                    }else{
                        $('#user-place').append(`<img src="./assets/photo.png" class="user-avatar">`)
                        
                    }
                    $('#user-name').append(`${user.NAME} ${user.LAST_NAME}`)
                
                localStorage.setItem("userData", JSON.stringify({id: user.ID, userName: user.NAME +' '+ user.LAST_NAME}))
            }
        });
    });
    
});