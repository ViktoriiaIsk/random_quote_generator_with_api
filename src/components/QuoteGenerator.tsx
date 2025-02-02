import useSWR from "swr";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./icons.css";

// fetch advice from the API
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const QuoteGenerator = () => {
    // useSWR fetches data from the API and enables automatic revalidation
    const { data, error, mutate } = useSWR("https://api.adviceslip.com/advice", fetcher, {
        revalidateOnFocus: false, // Prevents re-fetching when the window regains focus
    });
    
    const [lastId, setLastId] = useState<number | null>(null); 

    // Handle error state
    if (error) return <p className="error">Failed to load advice.</p>;
    if (!data) return <p className="loading">Loading...</p>;

    const { advice, id } = data.slip; 
    // Fetch a new advice, but only if it's different from the last one
    const getNewQuote = async () => {
        const newData = await mutate(); // Fetch new advice
        if (newData && newData.slip.id === lastId) {
            await mutate(); // Fetch again if the new advice is the same as the last one
        }
        setLastId(newData?.slip.id || null); // Update the last advice ID
    };


    const copyToClipboard = () => {
        navigator.clipboard.writeText(advice)
            .then(() => toast.success("Quote copied to clipboard ✅"))
            .catch(() => toast.error("Failed to copy ❌"));
    };

    return (
        <div className="quote-container">
            <p className="advice">ADVICE #{id}</p>
            <p className="quote-text">“{advice}”</p>

            <div className="divider">
                <span className="pause-icon">||</span>
            </div>

            <div className="button-container">
                <button className="button" onClick={getNewQuote}>
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
