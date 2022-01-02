var boton = document.getElementById('bell'),
notification = document.getElementById('notification'),
contador = 1;


    function cambiar(){

        if(contador== 0) {

            notification.classList.add('notification_display');
            contador=1;
        }

        else{notification.classList.remove('notification_display');
            contador =0;}
    }


    boton.addEventListener('click',cambiar,true)