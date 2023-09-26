import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { AuthApi } from "./AuthAPI";
import Result from "./Result";
function Search() {

    let { id } = useParams();
    const [values, setValues] = useState(
        {
            num: 0
        });

    const handleChange = async (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        /*search(values)
            .then((response) => {
                console.log(values);
            }).catch((error) => {
                console.log(error);
            });*/
        //const values1 = JSON.stringify(values);
        console.log(values);
        console.log("item" + `/${JSON.parse(values.num)}`);
        window.location.href = `/item/${JSON.parse(values.num)}`;
    }

    /*const search = async (num) => {
        const data = { num };
        const response = await AuthApi.get(`/item/`);
        return response.data;
    }*/    
    function clickHandler() {
        window.location.href="/home";
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ minWidth: "25vw" }}>
                    <label htmlFor="num">상품번호</label>
                    <input type="text" id="num" name="num" onChange={handleChange} value={values.num} />
                </div>
                <div style={{ minWidth: "25vw" }}>
                    <button type="submit" style={{ width: "100%" }}>검색</button>
                </div>
            </form>
            <button onClick={clickHandler}>뒤로가기</button>
        </div >
    );
};

export default Search;
