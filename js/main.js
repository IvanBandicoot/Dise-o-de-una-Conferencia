var api = 'AIzaSyARFEmvCjV7xlUzhMWLg0nmhR22HL8U2Xk';

      function initMap() {
          var latLng ={
              lat:10.4903052,
              lng:-66.8652656
          };

       var map = new google.maps.Map(document.getElementById('mapa'), {
          'center':latLng,
          'zoom': 15,
          'mapTypeId': google.maps.MapTypeId.ROADMAP /*ROADMAP,TERRAIN,SATELLITE,HYBRID*/ 
          /*'draggable':false,
          'scroll':false*/
        });

        var market = new google.maps.Marker({/*para que tu mapa tenga el lugar marcado */
            position:latLng,
            map:map,
            title:'iBandi'
        });
        var contenidO = '<h2>iBandi</h2>'+
                        '<p>Del 11 al 13 de Febrero</p>'+
                        '<p>Visitanos!:</p>';
        var informacion = new google.maps.InfoWindow({/*Para poner un mensaje en el marcador de tu mapa*/
            content: contenidO
        });
        market.addListener('click',function(){
            informacion.open(map,market);
        });
      }

(function() {
   "use strict";
  var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function(){
     
     //Campos datos Usuarios
        
      var nombre = document.getElementById('nombre');
      var apellido = document.getElementById('apellido'); 
      var email = document.getElementById('email');       
      
     //Campos pases  
     
      var pase_dia = document.getElementById('pase_dia');
      var pase_dosdias = document.getElementById('pase_dosdias');
      var pase_completo = document.getElementById('pase_completo');
         
      //Botones y divs

      var calcular = document.getElementById('calcular');
      var error = document.getElementById('error');
      var btnRegistro = document.getElementById('btnRegistro');
      var listaProductos = document.getElementById('lista-productos');
      var sumaTotal = document.getElementById('suma-total');
       
      // Extras 

       var Etiquetas = document.getElementById('etiquetas');
       var Camisas = document.getElementById('camisa_evento');
       
       
       /*Validar usuario */ 
        if(document.getElementById('calcular')){

       nombre.addEventListener('blur',validarcampo);
       apellido.addEventListener('blur',validarcampo);
       email.addEventListener('blur',validarcampo);
       
       function validarcampo(){
        if(this.value == ''){
            error.style.display = 'block'; 
            error.innerHTML = 'Este campo es obligatorio';
            this.style.border = '1px solid red';
            error.style.border = '1px solid red';
          }else{
              error.style.display = 'none';
              this.style.border = '2px solid #353535'; 
          }
       }
       
       //validar email especificamente

       email.addEventListener('blur',validarEmail);

       function validarEmail(){
           if(this.value.indexOf('@') >- 1){
            error.style.display = 'none';
            this.style.border = '2px solid #353535'; 
           }else{
            error.style.display = 'block'; 
            error.innerHTML = 'Debe tener al menos una @';
            this.style.border = '1px solid red';
            error.style.border = '1px solid red';  
           }
       }

      /*Calcular boton */

      calcular.addEventListener('click',calcularMontos);
       
      function calcularMontos(event){
            event.preventDefault();
            if(regalo.value === ''){
               alert('Debes elegir un regalo');
               regalo.focus();
            }else{
                var BoletosDia = parseInt(pase_dia.value,10)|| 0,
                    Boletos2Dias = parseInt(pase_dosdias.value,10)|| 0,
                    BoletosCompletos = parseInt(pase_completo.value,10)|| 0,
                    cantidadCamisas = parseInt(Camisas.value,10)|| 0,
                    cantidadEtiqueta = parseInt(Etiquetas.value,10)|| 0;

                var TotalaPagar = (BoletosDia*30) + (Boletos2Dias*45) + (BoletosCompletos*50) + ((cantidadCamisas*10)*.93) + (cantidadEtiqueta*2);
                
                var ListadosDeProductos = [];
                if(BoletosDia>=1){ListadosDeProductos.push(BoletosDia+' Pases por dia');}
                if(Boletos2Dias>=1){ListadosDeProductos.push(Boletos2Dias+' Pases por 2 dias');}
                if(BoletosCompletos>=1){ListadosDeProductos.push(BoletosCompletos+' Pases completos');}
                if(cantidadCamisas>=1){ListadosDeProductos.push(cantidadCamisas+' Camisas');}
                if(cantidadEtiqueta>=1){ListadosDeProductos.push(cantidadEtiqueta+' Etiquetas');}
                listaProductos.style.display = 'block'; /*hacemos aparecer la lista */
                listaProductos.innerHTML = '';
                for(var i = 0; i < ListadosDeProductos.length; i++){
                   listaProductos.innerHTML += ListadosDeProductos[i] + '</br>';
                }
                sumaTotal.innerHTML = '$ '+TotalaPagar.toFixed(2);
            }
      }     
      
      /*Ocultar y mostrar eventos del dia */

     pase_dia.addEventListener('blur',mostrardias);
     pase_dosdias.addEventListener('blur',mostrardias);
     pase_completo.addEventListener('blur',mostrardias);

     function mostrardias(){
      var BoletosDia = parseInt(pase_dia.value,10)|| 0,
      Boletos2Dias = parseInt(pase_dosdias.value,10)|| 0,
      BoletosCompletos = parseInt(pase_completo.value,10)|| 0;
      var diasElegidos = [];
      if(BoletosDia > 0){diasElegidos.push('viernes');}
      if(Boletos2Dias > 0){diasElegidos.push('viernes','sabado');}
      if(BoletosCompletos > 0){diasElegidos.push('viernes','sabado','domingo');}
      for(var i = 0; i < diasElegidos.length; i++){
        document.getElementById(diasElegidos[i]).style.display='block';
      }
     }
    }//if del seguro
    });//DOM CONTENT LOADED

})();

/*Escribiendo el codigo necesario en jQuery para nuestro proyecto */
$(function(){
   
    // menu responsive hamburguesa
       $('.menu-movil').on('click',function(){
           $('.navegacion-principal').slideToggle();
       });
       var breakpoint = 768;//importante pra las barras de menu en los moviles!!!!
       $(window).resize(function() {
            if($(document).width() >= breakpoint){
              $('.navegacion-principal').show();
            } else {
              $('.navegacion-principal').hide();
            }
       });

       
    // Menu fijo
    var windowheight = $(window).height();
    var barraheight = $('.barra').height(); 

    $(window).scroll(function(){
        var scroll = $(window).scrollTop();
        if(scroll > windowheight){
          $('.barra').addClass('fixed');
          $('body').css({'margin-top':barraheight+'px'});
        }else{
            $('.barra').removeClass('fixed');
            $('body').css({'margin-top':'0px'});
        }
    });

    // Lettering

    $('.nombre-sitio').lettering();

    /*programa de conferencias */
    /*$('div.ocultar').hide();*/
    $('.programa-evento .info-curso:first').show();
    $('.programa-evento a:first').addClass('activo');
    $('.menu-programa a').on('click', function(){
        $('.programa-evento a').removeClass('activo');
        $(this).addClass('activo');
        $('.ocultar').hide();
        var enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);
        return false;
    });

    /*Animaciones para los numeros */

    /*primer opcion */
   /*$('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
   $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
   $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
   $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);
   $('.resumen-evento li p').append('0');*/

  /*segunda opcion */
  $('.resumen-evento').mouseenter(function() {
    $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
    $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
    $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1500);
    $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1500);
  });

   /*tercera opcion */
    /*var resumenLista = jQuery('.resumen-evento');
    if(resumenLista.length > 0){
      $('.resumen-evento').waypoint(function(){
        $('.resumen-evento li:nth-child(1) p').animateNumber({number: 6}, 1200);
        $('.resumen-evento li:nth-child(2) p').animateNumber({number: 15}, 1200);
        $('.resumen-evento li:nth-child(3) p').animateNumber({number: 3}, 1200);
        $('.resumen-evento li:nth-child(4) p').animateNumber({number: 9}, 1200);
      },{
         offset: '60%'
      });
    }*/

   /*Cuenta regresiva */

   $('.cuenta-regresiva').countdown('2018/04/22 10:00:00', function(event){
       $('#dias').html(event.strftime('%D'));
       $('#horas').html(event.strftime('%H'));
       $('#minutos').html(event.strftime('%M'));
       $('#segundo').html(event.strftime('%S'));
   });


});