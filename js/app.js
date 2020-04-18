(function(){
    let element = document.getElementById('courses-list');
    element.addEventListener('click',function(e){
        e.preventDefault();
        course = e.target.parentElement.parentElement;

        //retriving course info
        couresInfo(course);
    });


    let cart = document.querySelector('#cart-content tbody');
    cart.addEventListener('click',function(e){
        e.preventDefault();
        let row = e.target.parentElement.parentElement;
        
        //remove from cart
        removeFromCart(row);
    });



    // clear cart
    let clearBtn = document.querySelector('#clear-cart');
    clearBtn.addEventListener('click',function(e){
        e.preventDefault();
        clearCart(cart);
    });

//showing carts on page load
    document.addEventListener('DOMContentLoaded',display);

})();


//retriving course info like img src, price,tile
function couresInfo(course){
    const couresInfo = {
        img: course.querySelector('img').src,
        name:course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }



        //check if it already exists in cart

        let items = getFromStorage();
        let flag = 1;

        items.forEach(function(element){
            if(element.name === couresInfo.name){
                 flag=0;
            }
            else{
                flag = 1;
            }
        });


            if(flag != 0){
                addToCart(couresInfo);
                //saving course to localstorage
                saveToLocalStorage(couresInfo);
            }

}


//adding to cart
function addToCart(couresInfo){
    let cart = document.querySelector('#cart-content tbody');
    let row = document.createElement('tr');
    row.innerHTML = '<td><img src="'+ couresInfo.img +'" alt="image" style="width:100px;"></td><td>'+couresInfo.name+'</td><td>'+ couresInfo.price +'</td><td><a href="#" class="remove" data-id="'+ couresInfo.id +'">X</a></td>';
    cart.appendChild(row);

}

//remove from cart
function removeFromCart(row){
    row.remove();
    let id = row.querySelector('a').getAttribute('data-id');
    let items = getFromStorage();
    items.forEach(function(element,index){
        if(element.id === id){
            items.splice(index,1);
        }
    });
    localStorage.setItem("items",JSON.stringify(items));
}



// clear cart 
function clearCart(cart){
    while(cart.firstChild){
        cart.removeChild(cart.firstChild);
    }
    localStorage.setItem("items",JSON.stringify([]));
}



//save to local storage
function saveToLocalStorage(couresInfo){
    let items = getFromStorage();
    items.push(couresInfo);
    localStorage.setItem("items",JSON.stringify(items));
}


//get from localStorage
function getFromStorage(){
    let items;
    items_str = localStorage.getItem("items");
    if(items_str === null){
        items = [];
    }
    else{
        items = JSON.parse(items_str);
    }
    return items;
}

//display from storage
function display(){
    let items = getFromStorage();
    let cart = document.querySelector('#cart-content tbody');
    
    items.forEach(function(element){
        let row = document.createElement('tr');
        row.innerHTML = '<td><img src="'+ element.img +'" alt="image" style="width:100px;"></td><td>'+element.name+'</td><td>'+ element.price +'</td><td><a href="#" class="remove" data-id="'+ element.id +'">X</a></td>';
        cart.appendChild(row);
    });
    
}