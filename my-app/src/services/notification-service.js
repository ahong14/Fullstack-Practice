export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

//array of objects containing notification types
var observers = {};
let instance = null;

class NotificationService {

    //create one instance of notification service
    constructor(){
        if(!instance){
            instance = this;
        }

        return instance;
    }

    //send notification with notification name, data contains wishlist
    postNotification = (notifName, data) => {
        //link observers to notification name
        let obs = observers[notifName];

        //for each observer, call set state to update wishlist items
        for (var i =0; i< obs.length; i++){
            var obj = obs[i];
            obj.callBack(data);
        }
    }

    removeObserver = (observer, notifName) => {
        var obs = observers[notifName];

        if (obs){
            for (var i = 0; i< obs.length; i++){
                if (observer === obs[i].observer){
                    obs.splice(i,1);
                    observers[notifName] = obs;
                    break;
                }
            }
        }
    }

    //add notification name, oberserve, callback function associated with that notification
    addObserver = (notifName, observer, callBack) => {
        let obs = observers[notifName];

        //check to see if notification type exists
        if(!obs) {
            observers[notifName] = [];
        }

        //create object, push to observers list
        let obj = {observer: observer, callBack: callBack};
        observers[notifName].push(obj);
    }

}

export default NotificationService;
