var countbook = 0;
function addtowishlist(bookname,authorname,price,imageloc){
    //to keep track of every added book
    //get the last used count
    countbook = getlastcount();
    
    //alert(countbook);
    var items = [bookname,authorname,price,countbook,imageloc];
    sessionStorage.setItem(countbook,JSON.stringify(items));
}

//remove previous wishlist items
function clearSession(){
    var keyofsession = Object.keys(sessionStorage);
    for (i = 0; i < keyofsession.length; i++) {

        if(keyofsession[i] == "lastcount" || keyofsession[i] == "cartkey"  ){            
            continue;
        }

        sessionStorage.removeItem(keyofsession[i]);
    }
}
//to get the count of key
function getlastcount(){
    //if the count numbe not exits specially when it is the first time of loading
    if (sessionStorage.getItem("lastcount") === null) {
        
        sessionStorage.setItem("lastcount",1);
        return 1;
    }
    else{
        
        //if key exist get the last count number and return to the addtowishlist function
        //sessinstorage return string convert to int
        var lastcount = parseInt(sessionStorage.getItem("lastcount")) ;
        //update the key again with +1
        sessionStorage.setItem("lastcount",lastcount+1);
        
        return lastcount + 1;
    }
}

function showWishList(){       

    //get the div element
    var  wishlistdiv = document.getElementById('wishlistitemsid');     

    //now loop through each item in the session and edit the content inside
    var keyofsession = Object.keys(sessionStorage);
    for (i = 0; i < keyofsession.length; i++) {
        
        //no need of fetching count session to this
        if(keyofsession[i] == "lastcount" || keyofsession[i] == "cartkey" ){
            
            continue;
        }
        //get the required details from respective session
        var bookdetails = JSON.parse(sessionStorage.getItem(keyofsession[i]));
        //edit teh content which need to go inside
        var content = 
        '<div class="col-sm-8"> '+
                            '<div class="product-img" style="background-image: url('+bookdetails[4]+');">'+
                            '</div>'+
                            '<div class="display-tc">'+
                            '	<h3 style="padding-bottom: 10px;"><span>'+bookdetails[0]+'</span>: </h3>'+
                            '	<h3 style="padding-bottom: 10px;">'+bookdetails[1]+'</h3> '+
                            '	<h3>'+bookdetails[2]+'</h3>'+
                            '</div>'+
                        '</div><p>'+
                        '<div class="col-sm-4 ">'+
                            '<div class="display-tc">'+
                            '	<a onclick ="removeWishListItem('+bookdetails[3]+')" href="#" style="padding-left: 90px;"><svg width="4em" height="2em" viewBox="0 0 16 16" class="bi bi-trash-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                                '	<path fill-rule="evenodd" d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"/>'+
                                '  </svg></a>'+
                                '<a onclick = "SendCart('+bookdetails[3]+')" href="#"><svg width="4em" height="2em" viewBox="0 0 16 16" class="bi bi-cart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">'+
                                    '<path fill-rule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>'+
                                ' </svg></a>'+
                            '</div><p>'+
                        '</div>';
        wishlistdiv.insertAdjacentHTML('afterbegin', content);

    }
    
      
    
}

function removeWishListItem(key){
    sessionStorage.removeItem(key);
    //then update the div again
    //first remve all items and update the items again
    document.getElementById('wishlistitemsid').innerHTML = "";
    showWishList();
}

function SendCart(key){
    //first get the items from the sessin key and add it to the new key
    var caritems =  JSON.parse(sessionStorage.getItem(key));
    sessionStorage.setItem('cartkey',caritems);


}



