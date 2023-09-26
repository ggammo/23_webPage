import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import React, { useRef, useCallback, useEffect, useState } from 'react';
import $ from 'jquery';
//import { fetchUser } from './UserAPI';
import logo from '../logo.svg';
import axios from "axios";
//import { useNavigate } from "react-router-dom";
/*const MyBackButton = () => {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const onClickBtn = () => {
    navigate(-1); // 바로 이전 페이지로 이동, '/main' 등 직접 지정도 당연히 가능
  };
  return (
    <button onClick={onClickBtn}></button>
  );
};*/
export default function TestPage() {
    const [user, setUser] = useState('');
    const ACCESS_TOKEN = localStorage.getItem('accessToken');

    const ttt = axios.create({
        //baseURL: 'http://localhost:8080',
        baseURL: 'http://taonas.iptime.org:8080',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
    });

    const options = {
        url: '/member/me',
        method: 'GET',
        header: {
            Authorization: `Bearer ${ACCESS_TOKEN}`
        }
    }
    const getusername = useCallback(async () => {
        const request = await axios.get();
        setUser(request.data.nickname);
    }, []);

    const handleLogout = async () => {
        localStorage.clear();
        localStorage.removeItem(ACCESS_TOKEN);
    }


    useEffect(() => {

        if (ACCESS_TOKEN) {
            ttt.get('/member/me')
                .then(response => {
                    console.log(response.data.nickname);
                    setUser(response.data);
                    console.log('nickname: ' + response.data);
                })
                .catch((error) => {
                    console.log(error);
                })
        }

       /* window.addEventListener("beforeunload", handleLogout => {
            handleLogout();
        });
        return () => {
            window.removeEventListener("beforeunload", handleLogout => {
                handleLogout();
            });
        }*/
    }, [ACCESS_TOKEN]);



    // 브라우저 종료 시 로그인한 유저의 토큰값 로컬 스토리지에서 삭제
    // 유저가 window 사용 시에는 window가 닫힌 것이 아니다.
    var closing_window = false;
    $(window).on('focus', function () {
      closing_window = false;
    });
    
    $(window).on('blur', function () {
      closing_window = true;
      if (!document.hidden) { // window가 최소화된 것은 닫힌 것이 아니다.
        closing_window = false;
      }
      $(window).on('resize', function (e) { // window가 최대화된 것은 닫힌 것이 아니다.
        closing_window = false;
      });
      $(window).off('resize'); // multiple listening 회피
    });
    
    // 유저가 html을 나간다면 window가 닫힌 것으로 간주
    $('html').on('mouseleave', function () {
      closing_window = true;
    });
    
    // 유저의 마우스가 window 안에 있다면 토큰들을 삭제하지 않음
    $('html').on('mouseenter', function () {
      closing_window = false;
    });
    
    $(document).on('keydown', function (e) {
      if (e.keyCode == 91 || e.keyCode == 18) {
        closing_window = false; // 단축키 ALT+TAB (창 변경)
      }
      if (e.keyCode == 116 || (e.ctrlKey && e.keyCode == 82)) {
        closing_window = false; // 단축키 F5, CTRL+F5, CTRL+R (새로고침)
      }
    });
    
    // a 링크를 눌렀을 때 토큰값 삭제 방지
    $(document).on("click", "a", function () {
      closing_window = false;
    });
    
    // 버튼이 다른 페이지로 redirect한다면 토큰값 삭제 방지
    $(document).on("click", "button", function () {
      closing_window = false;
    });
    
    // submit이나 form 사용 시 토큰값 삭제 방지
    $(document).on("submit", "form", function () {
      closing_window = false;
    });
    
    // toDoWhenClosing 함수를 통해 window가 닫히면 토큰 관련 값 전부 삭제
    var toDoWhenClosing = function () {
      /*localStorage.removeItem("payload")
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")*/
      localStorage.clear();
      localStorage.removeItem(ACCESS_TOKEN);
      return;
    };
    
    // unload(window가 닫히는 이벤트)가 감지되면 closing_window가 true가 되고 토큰 관련 값들 전부 삭제
    window.addEventListener("unload", function (e) {
      if (closing_window) {
        toDoWhenClosing();
      }
    });

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <img src={logo} width="40" height="35" alt="" />


                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav>
                            <Nav.Link href="/home">Home </Nav.Link>
                            <Nav.Link href="/upload"> Upload </Nav.Link>
                            <Nav.Link href="/search">Search </Nav.Link>
                            <Nav.Link href="/item/all">SeeAllItem</Nav.Link>

                            {ACCESS_TOKEN
                                ?
                                <NavDropdown title={user.username + "님 환영합니다"} id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/mypage">MyPage</NavDropdown.Item>
                                    <NavDropdown.Item href="/" onClick={handleLogout}>로그아웃</NavDropdown.Item>
                                </NavDropdown>
                                :
                                <NavDropdown title="Login/SignUp" id="collasible-nav-dropdown">
                                    <NavDropdown.Item href="/login">Login </NavDropdown.Item>
                                    <NavDropdown.Item href="/signup">/ SignUp</NavDropdown.Item>
                                </NavDropdown>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}