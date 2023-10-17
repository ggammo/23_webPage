import { useState, useEffect } from "react";
import { Search } from "./AuthAPI";
import ShowResult from "./ShowResult";
import * as StompJs from "@stomp/stompjs";





export default function SearchAll() {
    const [item, setItems] = useState([]);
    const [prevItem, setPrevItem] = useState(false);
    function clickHandler() {
        window.location.href = "/home";
    }
   // const[changeprice,setchangeprice]=useState(0);

    /*let [client, changeClient] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState("");

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
                //clientdata.subscribe("/sub/newItem", callback);
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
            setChatList((chats) => [...chats, msg]);

            console.log("msg : " + `${JSON.stringify(msg)}`);
            console.log("msg : "+msg.text);
            console.log("msg1 : "+ msg.text.split("-")[1]);
            setItems((items)=>[...items,msg.text.split("-")[1]]);
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
            })
        }
        console.log(message);
    };*/

    /*function CreateReadChat() {
        const [chatList, setChatList] = useState([]);
        const [value, setvalues] = useState('');

        //const { apply_id } = useParams();
        const client = useRef({});

        const connect = () => {
            console.log("aa");
            client.current = new StompJs.Client({
                brokerURL: 'ws://taonas.iptime.org:8080/ws',
                onConnect: () => {
                    console.log('success');
                    subscribe();
                },
            });
            client.current.activate();
        };

        const subscribe = () => {
            client.current.subscribe('/sub/changePrice' , (body) => {
                const json_body = JSON.parse(body.body);
                setvalues((_chat_list) => [
                    ..._chat_list,json_body
                ]);
                console.log(value);
            });
        };

        const disconnect = () => {
            client.current.deactivate();
            console.log("disconnect");
        };

        useEffect(() => {
            connect();

            return () => disconnect();
        }, []);
    }*/

   /* useEffect(()=>{
        connect();
        return () => disConnect();
    },[]);*/


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
            <ShowResult values={item} />
            <button onClick={clickHandler}>back</button>
        </div>
    );
}