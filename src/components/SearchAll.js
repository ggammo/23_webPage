import { useState, useEffect } from "react";
import { Search } from "./AuthAPI";
import ShowResult from "./ShowResult";


export default function SearchAll() {
    const [item, setItems] = useState([]);
    const [prevItem, setPrevItem] = useState(false);

    function clickHandler() {
        window.location.href = "/home";
    }

    useEffect(() => {
        Search.get(`/item/all`)
            .then((response) => {
                if (item !== prevItem) {
                    setItems(response.data);
                    setPrevItem(response.data);
                    console.log(response);
                    console.log("item : " + item);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, [item]);
    return (
        <div>
            <ShowResult values={item}/>
            <button onClick={clickHandler}>back</button>
        </div>
    );
}