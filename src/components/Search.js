import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { AuthApi } from "./AuthAPI";
import Result from "./Result";

function Search() {

    let { id } = useParams();
    const [values, setValues] = useState(
        {
            searchString: "",
            world: "",
            type: ""
        });
    const [checked, setChecked] = useState(true);
    const handleChange = async (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    }
    const checkboxhandler = async (e) => {
        setChecked(!checked);
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
        console.log(checked);
        //console.log("item" + `/${JSON.parse(values.num)}`);
        //window.location.href = `/item/${JSON.parse(values.num)}`;
    }

    /*const search = async (num) => {
        const data = { num };
        const response = await AuthApi.get(`/item/`);
        return response.data;
    }*/
    function clickHandler() {
        window.location.href = "/home";
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div style={{ minWidth: "25vw" }}>
                    <label htmlFor="searchString">제목, 내용</label>
                    <input type="text" id="searchString" name="searchString" onChange={handleChange} value={values.searchString} />
                </div>
                <div style={{ minWidth: "25vw" }}>
                    <label htmlFor="world">월드</label>
                    <input type="text" id="world" name="world" onChange={handleChange} value={values.world} />
                </div>
                <div style={{ minWidth: "25vw" }}>
                    <label htmlFor="type">상품타입(auction, normal)</label>
                    <input type="text" id="type" name="type" onChange={handleChange} value={values.type} />
                </div>
                <div style={{ minWidth: "25vw" }}>
                    <label htmlFor="isPossible">구매 가능한 상품만 검색</label>
                    <input type="checkbox" checked={checked} id="isPossible" name="isPossible" onChange={checkboxhandler} value={values.isPossible} />
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
