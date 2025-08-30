import react from 'react';
import {useState,useEffect} from 'react';
import './Shop.css';

function Shop() {

  let [loginButton, setLoginButton] = useState('My Account');
  let [loginStatus,setloginStatus] = useState(false);

  let isLogin=['My Account','Orders','Logout'];
  let isNotLogin=['Login','Register'];

  let productTabList=[{"name":"Mobiles","url":"https://i.postimg.cc/8zDVdyG7/5f2ee7f883cdb774.png"},
{"name":"Fashion","url":"https://i.postimg.cc/prYsPJ6S/ff559cb9d803d424.png"},
{"name":"Electronics","url":"https://i.postimg.cc/9XG8PcQB/af646c36d74c4be9.png"},
{"name":"Furniture","url":"https://i.postimg.cc/C1bN44SK/1788f177649e6991.png"},
{"name":"Appliances","url":"https://i.postimg.cc/bJ48qd5r/e90944802d996756-removebg-preview.png"},
{"name":"Beauty & Toys","url":"https://i.postimg.cc/nc31Trbq/b3020c99672953b9.png"},
{"name":"Sports","url":"https://i.postimg.cc/wM6hQ8wW/250px-Sport-balls-svg.png"}];
  return (
    <div>
      <div className="row shop-top">
        <div className="col-2 logo"></div>
        <div className="col-6 search d-flex">
          <div className="mx-2"><i className="fa fa-search"></i></div>
          <input type="text" placeholder="Search for products..."/>
        </div>
        <div className="col-2 loginProfile">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fas fa-user"></i> &nbsp;{loginButton}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              { loginStatus ?
              isLogin.map((item, index) => (
                <li key={index}><a className="dropdown-item" href="#">{item}</a></li>
              )) :
              isNotLogin.map((item, index) => (
                <li key={index}><a className="dropdown-item" href="#">{item}</a></li>
              ))
              }
            </ul>
          </div>
        </div>
        <div className="col-2 cart">
          <i class="fas fa-shopping-cart fs-5"></i>
        </div>
      </div>
      <div className="productTabList d-flex align-items-center justify-content-around">
        {productTabList.map((ele,index)=>
          <div style={{cursor:'pointer'}}>
            <div className="d-flex align-items-center justify-content-center">
              <div className="productTabList-img" style={{backgroundImage:`url(${ele.url}})`}}></div>
            </div>
            <div>{ele.name}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Shop;