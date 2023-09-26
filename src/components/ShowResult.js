function ShowImage({ values }) {
    let arr = [];
    arr.push(<img src={"http://taonas.iptime.org:8080/item/image/" + values.id + "/" + 2}
        alt="image from spring" />)
    return arr;
}

const ShowResult = ({ values }) => {
    return (
        <div>
            {values && values.map(values => (
                <div key={values.id}>
                    <table border="1">
                        <tbody>
                            <tr colSpan="9">
                                <td><ShowImage values={values} /></td>
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
                                <td>{values.currentPrice}</td>
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