import Nav from "./components/Nav";

const App = () => {
  return (
    <div className="App">
      <Nav />
      <header className="App-header mt-16">
        <img src="/icon.png" className="w-24 h-24 mx-auto" alt="Logo" />
        <h1 className="text-3xl font-bold text-center">Welcome to Docto!</h1>
      </header>

      <div className="p-4"></div>
    </div>
  );
};

export default App;
