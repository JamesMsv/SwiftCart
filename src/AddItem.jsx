import React from "react";
import {useState, useEffect, useRef} from "react";
import Error from "./Error";
import './AddItem.css';
import {Backend} from "./Backend"; // Assuming you have a Backend.js file for API calls

function AddItem(){

    const hasFetched = useRef(false);
    const [productName, setProductName] = useState("");     
    const [category, setCategory] = useState("");
    const [productTypeList, setProductTypeList] = useState([]);
    const [productType, setProductType] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState();
    const [discount, setDiscount] = useState("");
    const [url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [descriptionList, setDescriptionList] = useState([]);
    const [error, setError] = useState([false,""]);
    const [categorys,setCategorys] = useState([]);

        useEffect(() => {
        if(error[0]) {
            const timer = setTimeout(() => {
                setError([false, ""]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    useEffect(() => {
        if (!hasFetched.current) {
            getCategories();
            hasFetched.current = true;
            }
    }, []);

    useEffect(() => {
        fetchProductTypes();
        console.log("prd ",productType)
        //set
    }, [category]);

    async function fetchProductTypes() {
        let req;
        categorys.forEach((cat) => {
            console.log("Category: ", cat);
            if(cat.categoryName === category) {
                req ={"categoryId": cat.categoryId};
            }
        });
       console.log("Selected Category: ", req);
       if(category!== "" && category!== null) {
            let response=await Backend("POST","products/getProductType",req);
            if(response[1][0]["status"] === "success") {
                console.log("Product Types: ", response[0]);
                setProductTypeList(response[0]);
            } else {
                setError([true, "Failed to add product. Please try again."]);
            }
       }
    }

    const handleProductName = (e) => {
        setProductName(e.target.value); 
    }
    const handleCategory = (e) => {
        setCategory(e);
        setProductType("");
        setProductTypeList([]);
    }

    const handleProductType = (e) => {
        console.log("Product Type: ", e);
        setProductType(e);
    }
    const handleBrand = (e) => {
        setBrand(e.target.value);
    }

    const blockInvalidChar = (e) => {
    if (['e', 'E', '+', '-','ArrowUp','ArrowDown'].includes(e.key)) {
      e.preventDefault();
    }
    };

    let handlePrice = (e) => {
        e.preventDefault();
        let length = e.target.value.length;
        let value = Number(e.target.value);
        console.log("Price: ", e.key);
        if(length<1){
            setPrice("");
        }

        if(value < 1 || value>300000 || isNaN(value)){ 
            return;
        }
        else{
            setPrice(value);
        }
    }
    const handleDiscount = (e) => {
        setDiscount(e.target.value);
    }
    const handleImageURL = (e) => {
        setUrl(e.target.value);
        setImagePreview(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const addDescription = (e) => {
        if(description.trim() !== "") {
            setDescriptionList([...descriptionList, description.trim()]);
            setDescription("");
        }
        console.log("Description List: ", descriptionList);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById('main').scrollIntoView({ behavior: 'smooth' });
        if(productName && category && brand && price && discount && url && descriptionList.length > 0) {
            const productData = {
                "productName":productName.trim(),
                "category":category.trim(),
                "brand":brand.trim(),
                "price": price,
                "discount": discount,
                "url": url.trim(),
                "productDescription": descriptionList
            };
            console.log("Product Data Submitted: ", productData);
            setProductName("");
            setCategory("");
            setBrand("");
            setPrice("");
            setDiscount("");
            setUrl("");
            setDescription("");
            setDescriptionList([]);
            setProductType("");
            setProductTypeList([]);
            setImagePreview("");
            let response=await Backend("POST","products/AddProduct",productData);
            let status=await response["status"];
            console.log(response,status);
            try{
                if(status === "success") {
                    setError([true, "Product added successfully!"]);
                } 
                else {
                    setError([true, "Failed to add product. Please try again."]);
                }
            }
            catch(err) {
                if(status=== "success") {
                    setError([true, "Product added successfully!"]);
                } 
                else {
                    setError([true, "Failed to add product. Please try again."]);
                }
                setError([true, "An error occurred while adding the product."]);
            }   
        } else {
            setError([true,"Please fill all fields and add at least one description."]);
        }
    }

    const getCategories = async () => {
        console.log("Fetching categories...");
        try {
            let response = await Backend("GET","products/getCategories");
            console.log(response[0]);
            if(await response[1][0]["status"] === "success") {
                setCategorys(response[0].map(cat => cat));
            } else {
                setError([true, "Failed to fetch categories."]);
            }
        } catch (err) {
            setError([true, "An error occurred while fetching categories."]);
        }
    }

    let handleProductTypeButton = () => {
        console.log("Product Type Button Clicked",category);
        if(category==""){
            setError([true,"Choose Category"])
        }
    }

    return(
        <div >
        {error[0]?<Error message={error[1]} />:""}
        <div id="main">
            <h1 className="text-center">Add Product</h1>
            <div className="w-75 mx-auto d-plex align-items-center justify-content-center gap-3">
                <div className="mb-3">
                    <label htmlFor="productName" className="form-label">Product Name</label>
                    <input type="text" value={productName} onChange={(e)=>{handleProductName(e)}}className="form-control" id="productName" />
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Category</label>
                    <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {category || "Select Category"}
                    </button>
                    <ul className="dropdown-menu">
                        {categorys.map((cat, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => {handleCategory(cat.categoryName)}}>{cat.categoryName}</button>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="productType" className="form-label">Product Type</label>
                    <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" onClick={()=>handleProductTypeButton()} type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {productType || "Select Product Type"}
                    </button>
                    <ul className="dropdown-menu">
                        {productTypeList.map((prd, index) => (
                            <li key={index}>
                                <button className="dropdown-item" onClick={() => {handleProductType(prd.productName)}}>{prd.productName}</button>
                            </li>
                        ))}
                    </ul>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="brand" className="form-label">Brand</label>
                    <input type="text" value={brand} onChange={(e)=>{handleBrand(e)}} className="form-control" id="brand" />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" value={price} onKeyDown={blockInvalidChar} onChange={(e)=>{handlePrice(e)}} className="form-control" id="price" />
                </div>
                <div className="mb-3">
                    <label htmlFor="discount" className="form-label">Discount</label>
                    <input type="number" value={discount} onKeyDown={blockInvalidChar} onChange={(e)=>{handleDiscount(e)}} className="form-control" id="discount"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="url" className="form-label">Image URL</label>
                    <input type="text" value={url} onChange={(e)=>{handleImageURL(e)}} className="form-control" id="url" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Product Description</label>
                    <div className="d-flex align-items-center gap-2">
                        <input className="form-control" value={description} onChange={(e)=>{handleDescription(e)}}id="description"/>
                        <button className="btn btn-secondary" onClick={(e)=>{addDescription(e)}}><i className="bi bi-plus text-white fs-6" data-bs-toggle="tooltip" title="Add Description"></i></button>
                    </div>
                </div>
                <div className="mb-3 descriptionList">
                    <div>
                        {descriptionList.map((desc, index) => (
                            <div key={index} className="desc-item d-flex justify-content-between align-items-center">
                                {desc}
                                <button className="btn btn-danger btn-sm" onClick={() => {
                                    setDescriptionList(descriptionList.filter((_, i) => i !== index));
                                }}>
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mb-3">
                    <label className="form-label">Image Preview</label>
                    <div className="d-flex justify-content-center align-items-center">
                        <div id="imagePreview" className="imagePreview" style={{backgroundImage:`url(${url})`}}></div>
                    </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center">
                    <button type="submit" className="btn btn-primary w-25 mb-5" onClick={(e)=>{handleSubmit(e)}}>Add Item</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default AddItem;