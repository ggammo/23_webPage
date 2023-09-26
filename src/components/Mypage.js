function clickHandler() {
    window.location.href = '/home';
};
function Mypage() {
    return (
        <div>
            <h2>myPage</h2>
            <button type="button" onClick={clickHandler}>back</button>
        </div>
    );
};

export default Mypage;