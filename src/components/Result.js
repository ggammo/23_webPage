import { useLinkClickHandler, useLocation} from "react-router-dom";
import { useEffect, useState, useRef ,Suspense } from "react";
import { useSelector, shallowEqual } from 'react-redux';
import axios from "axios";
import * as StompJs from "@stomp/stompjs";

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



    let [client, changeClient] = useState(null);

    const [changeprice, setchangeprice] = useState(0);

    const connect = () => {
        // 소켓 연결
        try {
            const clientdata = new StompJs.Client({
                brokerURL: "ws://taonas.iptime.org:8080/ws",
                debug: function (str) {
                    console.log(str);
                },
                // reconnectDelay: 5000, // 자동 재 연결
                // heartbeatIncoming: 4000,
                //heartbeatOutgoing: 4000,
            });

            // 구독
            clientdata.onConnect = function () {
                clientdata.subscribe("/sub/changePrice", callback);
                console.log("connected");
            };

            clientdata.activate(); // 클라이언트 활성화
            changeClient(clientdata); // 클라이언트 갱신
        } catch (err) {
            console.log(err);
        }
    };

    const disConnect = () => {
        // 연결 끊기
        if (client === null) {
            return;
        }
        client.deactivate();
    };
    // 콜백함수 => ChatList 저장하기
    const callback = function (message) {
        if (message.body) {
            let msg = JSON.parse(message.body);

            console.log("msg : " + `${JSON.stringify(msg)}`);
            console.log("msg : " + msg.text);
            console.log("msg1 : " + msg.text.split("-")[1]);
            setchangeprice(msg.text.split("-")[1]);
        }
        console.log(message);
    };

    useEffect(() => {
        connect();
        return () => disConnect();
    }, []);


    const Showprice = ({ item }) => {
        if (changeprice == 0) {
            return item.currentPrice;
        }
        else if (changeprice != 0) {
            return changeprice;
        }
        return item.currentPrice;
    }


    useEffect(() => {
        J_Url = `${JSON.stringify(Url.pathname)}`;

            Search.get(`${JSON.parse(J_Url)}`)
                .then((response) => {
                    if (item !== prevItem) {
                        console.log(response);
                        setItem(response.data);
                        setPrevItem(response.data);
                        console.log(J_Url);
                        console.log(J_Url.slice(-2, -1));
                        console.log("split : " + J_Url.split('/')[2].slice(0, -1));

                        /*console.log("item : " + `${JSON.stringify(item)}`);
                        console.log("item1 : " + item);
                        console.log("id : " + item.id);
                        console.log("id1 : " + `${JSON.parse(item.id)}`);*/
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        
    }, [Url, item]);

    function clickHandler() {
        window.location.href = "/search";
    }

    function ShowImage() {
        let arr = [];
        let imagecount = item.imgCount;
        for (let i = 1; i <= imagecount; i++) {
            arr.push(<img src={"http://taonas.iptime.org:8080/item/image/" + item.id + "/" + i}
                alt="image from spring" />)
        }
        return (arr);
    }

    function ShowGlb() {
        if (item.id === undefined) {
            return (
            <div>Loading...</div>
            );
        }
        else if(item.id) {
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
        return ;
    }

    /*function Downloadbtn() {
        return <button onClick={() => { window.location.href = "http://taonas.iptime.org:8080/item/download/" + item.id + "/" + 1 }}>download</button>
    }

    function download(item, i) {
        console.log("id : " + i);
        window.location.href = "http://taonas.iptime.org:8080/item/download/" + item.id + "/" + i;
    }*/

    function bidHandler() {
        console.log("bid");

    }
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
            url: `http://taonas.iptime.org:8080/bid/` + J_Url.split('/')[2].slice(0, -1),
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

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td><ShowGlb /></td>
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
                        <td><Showprice item={item} /></td>
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