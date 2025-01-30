import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css"; 

type QuoteGeneratorProps = {
    quotes: string[];
};

const QuoteGenerator = ({ quotes }: QuoteGeneratorProps) => {
    const [index, setIndex] = useState(Math.floor(Math.random() * quotes.length));

    const getRandomIndex = () => {
        if (quotes.length <= 1) return; 

        const availableIndexes = quotes
            .map((_, i) => i) 
            .filter(i => i !== index); 

        const randomIndex = availableIndexes[Math.floor(Math.random() * availableIndexes.length)];

        setIndex(randomIndex);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(quotes[index])
            .then(() => {
                toast.success("Quote copied to clipboard ✅");
            })
            .catch(() => {
                toast.error("Failed to copy ❌");
            });
    };

    return (
        <div className="quote-container">
            <p className="advice">ADVICE #{index + 1}</p>
            <p className="quote-text">“{quotes[index]}”</p>

            <div className="divider">
                <span className="pause-icon">||</span> 
            </div>

            <div className="button-container">
                <button className="button" onClick={getRandomIndex}>
                    <span className="icon-dice"></span> 
                </button>
                <button className="button" onClick={copyToClipboard}>
                    <span className="icon-copy"></span> 
                </button>
            </div>

            <ToastContainer />
        </div>
    );
};

export default QuoteGenerator;
