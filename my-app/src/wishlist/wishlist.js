import React, {Component} from 'react';
import './wishlist.css';
import ProductCondensed from '../product_condensed/product_condensed';

class WishList extends Component{
    
    constructor(props){
        super(props);
        
        this.state={wishList: [
            {
                title: "Test",
                price: 25.00,
                _id: "ascbvs"
            }
        ]};
        //bind function
        this.createWishList = this.createWishList.bind(this);
    }
    
    
    
    createWishList = () => {
        const list = this.state.wishList.map((product) => 
            <ProductCondensed product = {product} key = {product._id} />
        );

        return (list);
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
