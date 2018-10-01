import React, {Component} from 'react';
import './product.css';
import DataService from '../services/data-service';

let ds = new DataService();


class Product extends Component{

    constructor(props){
        super(props);

        //bind functions
        this.onButtonClicked = this.onButtonClicked.bind(this);
    }

    onButtonClicked = () => {
        ds.addWishListItem(this.props.product);
    }


    render(){
        return(
            //card container to hold product info
            <div className = "card product"> 
                <img className = "card-img-top" src = {this.props.product.imgUrl} alt = "Product"></img>

                <div className = "card-block">
                    <h4 className = "card-title"> {this.props.product.title} </h4>
                    <p  className = "card-text"> Price: $ {this.props.product.price}</p>
                    <a href = "" onClick = {() => this.onButtonClicked()} className = "btn btn-primary"> Add to WishList </a>
                </div>
            </div>
        );
    }
}

export default Product;
