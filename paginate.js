var isloading = false;
var table = null;
var users = []

 let tableInitializer = function(url){         
             
            
       isloading = true;
       axios.get(url).then((response)=>{          
        users = response.data; 
          isloading = false;
        
        setTimeout(function(){
            table = $("#dataTablex").DataTable({    
            destroy:true,        
            pageLength: 3,             
            dom: "lBfrtip",            
            buttons:[
              {
                extend: 'csv',
                text:'Excel',
                exportOptions: {
                  columns: ':visible'
                },
              }
            ]
          }).on('draw', function () {          
            var info = table.page.info();          
            if(info.page + 1 === info.pages && users.current_page !== users.last_page) {              
              $(".paginate_button.next").removeClass('disabled');
              $('.paginate_button.next', $(".paginate_button.next").parent())          
              .on('click', function(){                        
                tableInitializer(users.next_page_url);                  
              });       
            } else {

            }
            if(info.page === 0 && users.current_page !== 1) {                                            
              $(".paginate_button.previous").removeClass('disabled');
              $('.paginate_button.previous',$(".paginate_button.previous").parent())          
              .on('click', function(){
                   tableInitializer(users.prev_page_url);                  
              });       
            } else {
            }
        })     
     }, 1000) 
    });
      
    }

    tableInitializer('https://your-route-with-laravel-paginage-response')