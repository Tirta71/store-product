import React from "react";
import { useLocation } from "react-router-dom";
import {
  PDFDownloadLink,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import "../CSS/checkout.css";
import { Link } from "react-router-dom";
import NavbarReusable from "../component/navbarReusable";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 5,
    marginTop: 5,
  },
  itemImage: {
    marginRight: 10,
    width: 50,
    height: 50,
  },
  itemTitle: {
    flexGrow: 1,
  },
  itemPrice: {
    fontWeight: "bold",
  },
  totalPrice: {
    marginTop: 10,
    textAlign: "right",
    fontWeight: "bold",
  },
});

export default function Checkout() {
  const location = useLocation();
  const { cartItems } = location.state;

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  // Function to generate PDF content
  const generatePDFContent = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Pesanan Berhasil</Text>
          {cartItems.map((item, index) => (
            <View key={index} style={styles.listItem}>
              <Image style={styles.itemImage} src={item.image} />
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.totalPrice}>
          Total Harga : ${calculateTotalPrice()}
        </Text>
      </Page>
    </Document>
  );

  return (
    <div className="container">
      <NavbarReusable />
      <h1>Checkout</h1>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <Link className="ProdukLink" to={`/product/${item.id}`}>
              <div className="Card-Item">
                <img src={item.image} alt={item.title} />

                <div className="Harga-Judul">
                  <span>{item.title}</span>
                  <span className="harga">${item.price}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div className="CheckOut">
        <h3>Total Harga: ${calculateTotalPrice()}</h3>
        <PDFDownloadLink
          document={generatePDFContent()}
          fileName="checkout.pdf"
        >
          {({ blob, url, loading, error }) => (
            <div>
              {loading ? (
                <p style={{ fontStyle: "italic", color: "gray" }}>
                  Generating PDF...
                </p>
              ) : (
                <button
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "10px 10px",
                    borderRadius: "5px",
                    marginTop: "-10px",
                  }}
                >
                  CheckOut
                </button>
              )}
            </div>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
