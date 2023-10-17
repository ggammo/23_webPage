import * as StompJs from "@stomp/stompjs";
import { useEffect, useState, useRef } from "react";


function ShowImage({ values }) {
    let arr = [];
    arr.push(<img src={"http://taonas.iptime.org:8080/item/image/" + values.id + "/" + 1}
        alt="image from spring" />)
    return arr;
}



const ShowResult = ({ values }) => {

    let [client, changeClient] = useState(null);

    const [changeprice, setchangeprice] = useState(0);
    const [finditemid, setfinditemid] = useState(0);
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
            console.log("finditemid : " + msg.text.split("-")[0]);
            setchangeprice(msg.text.split("-")[1]);
            setfinditemid(msg.text.split("-")[0]);
            //setItems(message.body.currentPrice);
            //setPrevItem(message.body.currentPrice);
            /*Search.get(`/item/all`)
            .then((response) => {
                if (item !== prevItem) {
                    setItems(response.data);
                    setPrevItem(response.data);
                    console.log(response);
                    console.log("item : " + item);
                }
            })*/
        }
        console.log(message);
    };

    useEffect(() => {
        connect();
        return () => disConnect();
    }, []);

    const Showprice = ({ values }) => {
        if (finditemid == values.id && changeprice == 0) {
            return values.currentPrice;
        }
        else if (finditemid == values.id && changeprice != 0) {
            return changeprice;
        }
        return values.currentPrice;
    }

    return (
        <div>
            {values && values.map(values => (
                <div key={values.id}>
                    <table border="1">
                        <tbody>
                            <tr colSpan="9">
                                <a href={"/item/" + values.id}>
                                    <td><ShowImage values={values} /></td>
                                </a>
                            </tr>
                            <tr>
                                <td>id: </td>
                                <td>{values.id}</td>
                            </tr>
                            <tr>
                                <td>title : </td>
                                <td>{values.title}</td>
                            </tr>
                            <tr>
                                <td>sellerUsername : </td>
                                <td>{values.sellerUsername}</td>
                            </tr>
                            <tr>
                                <td>buyerUsername : </td>
                                <td>{values.buyerUsername}</td>
                            </tr>
                            <tr>
                                <td>location : </td>
                                <td>{values.location}</td>
                            </tr>
                            <tr>
                                <td>itemInformation : </td>
                                <td>{values.itemInformation}</td>
                            </tr>
                            <tr>
                                <td>startPrice : </td>
                                <td>{values.startPrice}</td>
                            </tr>
                            <tr>
                                <td>currentPrice : </td>
                                <td><Showprice values={values} /></td>
                            </tr>
                            <tr>
                                <td>endTime : </td>
                                <td>{values.endTime}</td>
                            </tr>
                            <tr><td><button onClick={() => window.location.href = "/item/" + values.id} >detail</button></td></tr>
                        </tbody>
                    </table>
                </div>
            ))
            }
        </div >
    );
}
export default ShowResult;