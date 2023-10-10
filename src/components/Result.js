import { useLinkClickHandler, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useSelector, shallowEqual } from 'react-redux';
import axios from "axios";

import { Search, Download } from "./AuthAPI";
import ShowResult from "./ShowResult";
import { Bid } from "./AuthAPI";

import { Stats, OrbitControls, Circle } from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Result = () => {
    const Url = useLocation();
    let J_Url = '';
    let bid_URL = '';
    const [item, setItem] = useState([]);
    const mounted = useRef(false);
    const [prevItem, setPrevItem] = useState(false);
    const [values, setValues] = useState(0);
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    const price = useRef(0);
    bid_URL = JSON.stringify(URL);
    useEffect(() => {
        J_Url = `${JSON.stringify(Url.pathname)}`;
        if (!mounted.current) {
            mounted.current = true;
        }
        else {
            Search.get(`${JSON.parse(J_Url)}`)
                .then((response) => {
                    if (item !== prevItem) {
                        console.log(response);
                        setItem(response.data);
                        setPrevItem(response.data);
                        console.log(J_Url);
                        console.log(J_Url.slice(-2, -1));

                        /*console.log("item : " + `${JSON.stringify(item)}`);
                        console.log("item1 : " + item);
                        console.log("id : " + item.id);
                        console.log("id1 : " + `${JSON.parse(item.id)}`);*/
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [Url, item]);

    function clickHandler() {
        window.location.href = "/search";
    }

    function ShowImage() {
        let arr = [];
        let imagecount = item.fileCount;
        for (let i = 2; i <= imagecount; i++) {
            arr.push(<img src={"http://taonas.iptime.org:8080/item/image/" + item.id + "/" + i}
                onClick={() => { download(item, i) }}
                alt="image from spring" />)
        }
        return (arr);
    }

    function ShowGlb() {
        if (item.id === undefined) {
            return (<div>aaa</div>);
        }
        else {
            const gltf = useLoader(GLTFLoader, "http://taonas.iptime.org:8080/item/glb/" + item.id + "")
            return (
                <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
                    <directionalLight position={[3.3, 1.0, 4.4]} castShadow />
                    <primitive
                        object={gltf.scene}
                        position={[0, 1, 0]}
                        children-0-castShadow
                    />
                    <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
                        <meshStandardMaterial />
                    </Circle>
                    <OrbitControls target={[0, 1, 0]} />
                    <axesHelper args={[5]} />
                    <Stats />
                </Canvas>
            );
        }
    }

    function Downloadbtn() {
        return <button onClick={() => { window.location.href = "http://taonas.iptime.org:8080/item/download/" + item.id + "/" + 1 }}>download</button>
    }

    function download(item, i) {
        console.log("id : " + i);
        window.location.href = "http://taonas.iptime.org:8080/item/download/" + item.id + "/" + i;
    }

    function bidHandler() {
        console.log("bid");

    }
    /*const handleChange = async (e) => {
        price.current = e.target.value;
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    }*/
    const onChange = (e: React.ChangeEvent<HTMLInputElement>, type: React.MutableRefObject<string>) => {
        const value = e.target.value;
        type.current = value;
    };

    /*const handleSubmit = async (e) => {
        e.preventDefault();
        bid(values)
            .then((response) => {
                console.log(values);
            }).catch((error) => {
                console.log(error);
            });
    }*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(price.current);

        axios({
            method: 'POST',
            url: `http://taonas.iptime.org:8080/bid/` + J_Url.slice(-2, -1),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`, // 이것 필수
            },
            data: price.current
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.log(error);
        });
    };


    /*Bid.post(`/bid`+"/"+J_Url.slice(-2,-1))
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });*/
    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><ShowGlb /></td>
                        <td><Downloadbtn /></td>
                    </tr>
                    <tr>
                        <td><ShowImage /></td>
                    </tr>
                    <tr>
                        <td>id: </td>
                        <td>{item.id}</td>
                    </tr>
                    <tr>
                        <td>title : </td>
                        <td>{item.title}</td>
                    </tr>
                    <tr>
                        <td>sellerUsername : </td>
                        <td>{item.sellerUsername}</td>
                    </tr>
                    <tr>
                        <td>buyerUsername : </td>
                        <td>{item.buyerUsername}</td>
                    </tr>
                    <tr>
                        <td>location : </td>
                        <td>{item.location}</td>
                    </tr>
                    <tr>
                        <td>itemInformation : </td>
                        <td>{item.itemInformation}</td>
                    </tr>
                    <tr>
                        <td>startPrice : </td>
                        <td>{item.startPrice}</td>
                    </tr>
                    <tr>
                        <td>currentPrice : </td>
                        <td>{item.currentPrice}</td>
                    </tr>
                    <tr>
                        <td>endTime : </td>
                        <td>{item.endTime}</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={clickHandler}>뒤로가기</button>
            {ACCESS_TOKEN
                ?
                <form>
                    <div className="form-group" style={{ minWidth: "15vw" }}>
                        <label htmlFor="bidPrice">입찰가격</label>
                        <input type="number" id="bidPrice" name="bidPrice" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, price)} />
                    </div>
                    <button onClick={handleSubmit} >입찰하기</button>
                </form>
                :
                <h3>로그인후 입찰 가능합니다.</h3>
            }
        </div >
    );
}
export default Result;