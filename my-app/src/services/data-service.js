import NotificationService, {NOTIF_WISHLIST_CHANGED} from './notification-service';

//ensuring one data service to be created
let ns = new NotificationService();
let instance = null;
var wishList = [];

class DataService {
    constructor(){
        if (!instance) {
            instance = this;
        }

        return instance;
    }

    //when user clicks add wishlist, item is added to wishlist
    //send notification that wishlist was changed
    addWishListItem = item => {
        wishList.push(item);
        ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
    }

    //search through wishlist, compare item by id to remove
    removeWishListItem = item =>{
        for(var i = 0; i<wishList.length; i++){
            if(wishList[i]._id === item._id){
                wishList.splice(i,1);
                ns.postNotification(NOTIF_WISHLIST_CHANGED, wishList);
                break;
            }
        }
    }
}

export default DataService;