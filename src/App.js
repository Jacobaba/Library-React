import Nav from "./components/Nav";
import Home from "./Pages/Home";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Books from "./Pages/Books";
import { books } from "./data";
import BookInfo from "./Pages/BookInfo";
import Cart from "./Pages/cart";
import React, { useEffect, useState } from "react";

function App() {
  const [cart, setCart] = useState([]);

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) => item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function removeItem(item) {
    setCart(cart.filter(book => book.id !== item.id))
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach(item => {
      counter += item.quantity
    })
    return counter
  }

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route
            path="/books"
            exact
            Component={() => <Books books={books} />}
          />
          <Route
            path="/books/:id"
            Component={() => (
              <BookInfo cart={cart} books={books} addToCart={addToCart} />
            )}
          />
          <Route
            path="/cart"
            Component={() => (
              <Cart books={books} cart={cart} changeQuantity={changeQuantity} removeItem={removeItem} />
            )}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
