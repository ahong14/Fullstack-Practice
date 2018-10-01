import React, {Component} from 'react';
import './wishlist.css';
import DataService from '../services/data-service';
import NotificationService from '../services/notification-service';
import ProductCondensed from '../product_condensed/product_condensed';
import {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ns = new NotificationService();
class WishList extends Component{
    
    constructor(props){
        super(props);
        
        this.state={wishList: []};
        //bind function
        this.createWishList = this.createWishList.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    
    createWishList = () => {
        const list = this.state.wishList.map((product) => 
            <ProductCondensed product = {product} key = {product._id} />
        );

        return (list);
    }

    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }

    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }

    onWishListChanged(newWishList){
        this.setState({wishList: newWishList});
    }


    render(){
        return(
            <div className = "card"> 
                <div className = "card-block">
                    <h4 className = "card-title"> Wish List </h4>
                    <ul className = "list-group">
                        {this.createWishList()}
                    </ul>
                </div>
            </div>
        );
    }
}

export default WishList;
