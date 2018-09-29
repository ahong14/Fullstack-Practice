import 'whatwg-fetch';

class HttpService{
    getProducts = () => {

        //create promise to ensure data is returned
        //resolve means promise fulfilled
        //reject means error

       var promise = new Promise((resolve,reject) => {
           //make request with fetch to server, returns list of products
           //when list is returned, resolve promise with response in json format
           fetch('http://localhost:3004/product')
           .then(response => {
               resolve(response.json());
           })
       });

       //return promise, waits until data is sent back
       return promise;
    }
}

export default HttpService;
