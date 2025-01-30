import QuoteGenerator from "./components/QuoteGenerator";
import "./App.css";

const quotesList: string[] = [
    "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    "The best way to predict the future is to create it.",
    "Your time is limited, so don’t waste it living someone else’s life.",
    "It is easy to sit up and take notice, what's difficult is getting up and taking action.",
    "Success is not the key to happiness. Happiness is the key to success.",
    "Don’t watch the clock; do what it does. Keep going.",
    "Opportunities don't happen. You create them.",
    "Do what you can, with what you have, where you are.",
    "Difficulties in life are intended to make us better, not bitter."
];


function App() {
    return (
        <div className="app-container">
            <QuoteGenerator quotes={quotesList} />
        </div>
    );
}

export default App;
