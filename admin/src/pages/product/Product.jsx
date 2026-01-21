import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
//import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import Notification from "../../UI/Notification";
import { useHistory } from "react-router-dom";
import app from "../../firebase";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [inputs, setInputs] = useState({});
  const [categories, setCategories] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [file, setFile] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [productStats, setProductStats] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId),
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    [],
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const response = await userRequest.get(
          "/orders/income?productId=" + productId,
        );
        const list = response.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setProductStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ]),
        );
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [MONTHS, productId]);

  const handleChange = (event) => {
    setInputs((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleColor = (event) => {
    setColor(event.target.value.split(","));
  };
  const handleSize = (event) => {
    setSize(event.target.value.split(","));
  };
  const handleCategories = (event) => {
    setCategories(event.target.value.split(","));
  };

  const handleProductSubmit = (event) => {
    event.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            color: color,
            categories: categories,
            size: size,
          };
          updateProduct(productId, product, dispatch);
          setNotify({
            isOpen: true,
            message: "Submitted Succesfully",
            type: "success",
          });
          history.push("/product");
        });
      },
    );
  };

  return (
    <Fragment>
      <div className="product">
        <div className="productTitleContainer">
          <h1 className="productTitle">Product</h1>
          <Link to="/newproduct">
            <button className="productAddButton">Create</button>
          </Link>
        </div>
        <div className="productTop">
          <div className="productTopLeft">
            <Chart
              data={productStats}
              dataKey="Sales"
              title="Sales Performance"
            />
          </div>
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={product?.img} alt="" className="productInfoImg" />
              <span className="productName">{product?.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{product?._id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">sales:</span>
                <span className="productInfoValue">5123</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">in stock:</span>
                <span className="productInfoValue">{product?.inStock}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input
                type="text"
                name="title"
                placeholder={product?.title}
                onChange={handleChange}
              />
              <label>Product Descrition</label>
              <input
                type="text"
                name="desc"
                placeholder={product?.desc}
                onChange={handleChange}
              />
              <label>Product Price</label>
              <input
                type="number"
                name="price"
                placeholder={product?.price}
                onChange={handleChange}
              />
              <label>Product Categories</label>
              <input
                type="text"
                placeholder={product?.categories}
                onChange={handleCategories}
              />
              <label>Color</label>
              <input
                type="text"
                placeholder={product?.color}
                onChange={handleColor}
              />
              <label>Size</label>
              <input
                type="text"
                placeholder={product?.size}
                onChange={handleSize}
              />
              <label>In Stock</label>
              <select name="inStock" id="idStock" onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img
                  src={
                    product?.img
                      ? product.img
                      : "https://firebasestorage.googleapis.com/v0/b/new-shopping-app-d6e85.appspot.com/o/17690066504092.png?alt=media&token=8195725e-fc89-4a9f-8151-a21766e532c1"
                  }
                  alt=""
                  className="productUploadImg"
                />
                <label for="file">
                  <Publish />
                </label>
                <input
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </div>
              <button className="productButton" onClick={handleProductSubmit}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <Notification notify={notify} setNotify={setNotify} />
    </Fragment>
  );
}
