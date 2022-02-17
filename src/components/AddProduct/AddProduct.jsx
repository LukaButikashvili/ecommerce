import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchCategories, postProduct } from "../../api";
import Modal from "../Modal/Modal";
import { nanoid } from "nanoid";
import AddProductCSS from "./AddProduct.module.css";
import { addProductAction } from "../../redux/product/actions/productActions";

const AddProduct = ({ state, setState }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const getCategory = async () => {
      const data = await fetchCategories();
      if (isMounted) {
        setCategories(data);
      }
    };

    getCategory();

    return () => {
      isMounted = false;
    };
  }, []);

  const createProduct = async (e) => {
    e.preventDefault();

    const newProduct = {
      id: nanoid(),
      title: e.target.title.value,
      price: Number(e.target.price.value),
      category: e.target.category.value,
      description: e.target.description.value,
      image: e.target.img.value,
    };

    const res = await postProduct(newProduct);
    setShowModal(false);

    const tempProducts = JSON.parse(localStorage.getItem("products")) || [];
    const products = [...tempProducts, newProduct];

    localStorage.setItem("products", JSON.stringify(products));

    // Change localstate
    if (newProduct.category === state.filtered || state.filtered === "none") {
      setState((state) => {
        return { ...state, data: [...state.data, newProduct] };
      });
    }
  };

  return (
    <>
      <div className={AddProductCSS.addProductWrapper}>
        <button onClick={() => setShowModal(true)}>Add Product</button>
      </div>
      {showModal && (
        <Modal>
          <div className={AddProductCSS.addProductModalWrapper}>
            <div className={AddProductCSS.addProductTitleWrapper}>
              <h1>New Product</h1>
            </div>
            <form
              className={AddProductCSS.formWrapper}
              onSubmit={(e) => createProduct(e)}
            >
              <div className={AddProductCSS.inputTitleWrapper}>
                <label>Product title</label>
                <input type="text" name="title" placeholder="Type a title..." />
              </div>
              <div className={AddProductCSS.inputDescriptionWrapper}>
                <label>Description</label>
                <textarea type="text" name="description" />
              </div>
              <div className={AddProductCSS.inputImageWrapper}>
                <label>Image</label>
                <input type="file" id="img" name="img" accept="image/*" />
              </div>
              <div className={AddProductCSS.selectCategoryWrapper}>
                <label>Category</label>
                <select name="category" selected="categories">
                  {categories.map((category) => {
                    return (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className={AddProductCSS.inputPriceWrapper}>
                <label>Price</label>
                <input type="number" name="price" />
              </div>
              <input
                className={AddProductCSS.submit}
                type="submit"
                value="Create"
              />
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default AddProduct;
