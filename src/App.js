import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductsComponent from "./component/product";

function App() {
  return (
    <div className="container mt-4">
      <h1 className="text-center">Daftar Product</h1>
      <div className="card-container">
        <ProductsComponent />
        <hr />
      </div>
    </div>
  );
}

export default App;
