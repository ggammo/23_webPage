import { useState } from 'react';
import axios from 'axios';
import { upload } from './AuthAPI';

/*import { Stats, OrbitControls, Circle } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';*/

/*function CustomCanvas() {
    const gltf = useLoader(
        GLTFLoader,
        'https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@glTFLoader/public/models/monkey.glb'//이부분을 바꾸면 될거 같은데
    )
    //const cameraRef = useRef < Camera > (null);
    return (
        <Canvas camera={{ position: [-0.5, 1, 2] }} shadows>
            <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={Math.PI * 2} />
            <primitive object={gltf.scene} position={[0, 1, 0]} children-0-castShadow />
            <Circle args={[10]} rotation-x={-Math.PI / 2} receiveShadow>
                <meshStandardMaterial />
            </Circle>
            <OrbitControls target={[0, 1, 0]} />
            <axesHelper args={[5]} />
            <Stats />
        </Canvas>
    );
}*/

function Upload() {

    const ACCESS_TOKEN = localStorage.getItem('accessToken');
    //const [selectedFiles, setselectedFiles]= useState<IFileTypes[]>([]);
    //const fieldNum = useRef<number>(0);
    //const fbxList = []; // 업로드한 파일들을 저장하는 배열
    //const textureList = []; // 업로드한 파일들을 저장하는 배열
    //const normalMapList = []; // 업로드한 파일들을 저장하는 배열

    const imageList = []; // 업로드한 파일들을 저장하는 배열
    //const [glbFile, setglbFile] = useState(null);
    const glbFile = [];
    const [values, setValues] = useState({
        title: "",
        content: "",
        startPrice: "",
        endTime: "",
        location: "",
        world: "",
        type: "",
        fbx: ""
    });

    const handleChange = async (e) => {
        setValues({
            ...values,
            [e.target.id]: e.target.value,
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(values);
        upload(values)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    const onSaveFiles = (e) => {
        const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

        uploadFiles.forEach((uploadFile) => {
            console.log(uploadFile)
            glbFile.push(uploadFile);

        });
    };

    /*const onSaveFiles2 = (e) => {
        const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

        uploadFiles.forEach((uploadFile) => {
            console.log(uploadFile)
            textureList.push(uploadFile);
        });
    };
    const onSaveFiles3 = (e) => {
        const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

        uploadFiles.forEach((uploadFile) => {
            console.log(uploadFile)
            normalMapList.push(uploadFile);
        });
    };*/
    const onSaveFiles4 = (e) => {
        console.log(e);
        const uploadFiles = Array.prototype.slice.call(e.target.files); // 파일선택창에서 선택한 파일들

        uploadFiles.forEach((uploadFile) => {
            console.log(uploadFile)
            imageList.push(uploadFile);
        });
    };

    const onFileUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        /*formData.append('fbx', '');
        fbxList.forEach((file) => {
            console.log(file);
            formData.append('fbx', file);
        });*/
        /*formData.append('textures', '');
        textureList.forEach((file) => {
            formData.append('textures', file);
        });
        formData.append('normalMaps', '');
        normalMapList.forEach((file) => {
            formData.append('normalMaps', file);
        });*/

        /*formData.append('glb', '');
        Object.values(glbFile).forEach((glbFile) => {
            formData.append('glb', glbFile);
            console.log(glbFile);
            console.log(formData);
        });*/
        formData.append('glb', '');
        glbFile.forEach((file) => {
            formData.append('glb', file);
        });

        formData.append('images', '');
        imageList.forEach((file) => {
            formData.append('images', file);
        });

        formData.append('title', values.title);
        formData.append('endTime', values.endTime);
        formData.append('location', values.location);
        formData.append('startPrice', values.startPrice);
        formData.append('content', values.content);
        formData.append('world', values.world);
        formData.append('type', values.type);

        upload(formData)
            .then((response) => {
                console.log(response);
            }).catch((error) => {
                console.log(error);
            });

    };
    /*  const onSelectFile = (e) => {
          (e: ChangeEvent<HTMLInputElement> | any): void => {
              let dragFiles: File[] = [];
              let tempFiles: IFileTypes[] = files;
  
              if (e.type === "drop") {
                  dragFiles = e.dataTransfer.files;
              } else {
                  dragFiles = e.target.files;
              }
  
              for (let file of dragFiles) {
                  tempFiles = [
                      ...tempFiles,
                      {
                          id: fieldNum.current++,
                          object: file
                      }
                  ];
              }
              setselectedFiles(tempFiles);
          },
          [files]
      }*/

    /*const registFile = async (id: any) => {
        // forData 생성
        const formData = new FormData();

        //request로 보내야할 데이터를 formData에 넣어서 보냈다. 
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('file', selectedFiles[i]);
        }
        formData.append('type', 'itemQna');
        // 서버에서 받은 id값 사용
        formData.append('targetId', id);

        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/file/upload`,
            headers: {
                Authorization: jwt,
                'Content-Type': 'multipart/form-data', // 이것 필수

            },
            data: formData,
        }).then((res) => {
            navigate('/qna-po', {
                state: {
                    data: id,
                },
            });
        });
    };*/

    /*const upload = axios.create({
        //baseURL: 'http://localhost:8080',
        baseURL: 'http://taonas.iptime.org:8080',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ACCESS_TOKEN}`,
        },
    });*/

    /*useEffect(() => {
        upload.post('/item/upload')
            .then(response => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, [ACCESS_TOKEN]);*/

    function clickHandler() {
        window.location.href = '/home';
    }
    return (
        <div>
            {!ACCESS_TOKEN
                ?
                <div>
                    <h1>로그인 후 등록해주세요.</h1>
                    <button onClick={clickHandler}>뒤로가기</button>
                </div>
                :
                <div>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <tr>
                                <td><label htmlFor="title">제목</label></td>
                                <td><input type="text" id="title" name="title" onChange={handleChange} value={values.title} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="content">내용</label></td>
                                <td><input type="text" id="content" name="content" onChange={handleChange} value={values.content} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="startPrice">시작가격(원)</label>    </td>
                                <td><input type="number" id="startPrice" name="startPrice" onChange={handleChange} value={values.startPrice} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="endTime">종료날짜</label></td>
                                <td><input type="datetime-local" id="endTime" onChange={handleChange} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="location">위치</label></td>
                                <td><input type="text" id="location" name="location" onChange={handleChange} value={values.location} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="world">월드 이름</label></td>
                                <td><input type="text" id="world" name="world" onChange={handleChange} value={values.world} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="type">상품 타입</label></td>
                                <td><input type="text" id="type" name="type" onChange={handleChange} value={values.type} /></td>
                            </tr>
                            <tr>
                                <td>Glb</td>
                                <td><input type="file"  id="glb" name="glb" onChange={e => onSaveFiles(e)}></input></td>
                            </tr>
                            <tr>
                                <td>Image</td>
                                <td><input type="file" multiple="multiple" id="glb" name="image" onChange={e => onSaveFiles4(e)}></input></td>
                            </tr>
                            <div className="form-group" style={{ minWidth: "25vw" }}>
                                <button type="submit" onClick={onFileUpload} style={{ width: "100%" }}>등록</button>
                            </div>
                        </table>
                    </form>
                    <button onClick={clickHandler}>뒤로 가기</button>
                </div>
            }
        </div>
    );
    /*return (
        <div>
            <h2>Upload</h2>
            {!ACCESS_TOKEN
                ?
                <div>
                    <h1>로그인 후 등록해주세요.</h1>
                    <button onClick={clickHandler}>뒤로가기</button>
                </div>
                :
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" style={{ minWidth: "25vw" }}>
                            <label htmlFor="title">제목</label>
                            <input type="text" id="title" name="title" onChange={handleChange} value={values.title} />
                        </div>
                        <div className="form-group" style={{ minWidth: "25vw" }}>
                            <label htmlFor="content">내용</label>
                            <input type="text" id="content" name="content" onChange={handleChange} value={values.content} />
                        </div>
                        <div className="form-group" style={{ minWidth: "25vw" }}>
                            <label htmlFor="startPrice">시작가격(원)</label>
                            <input type="number" id="startPrice" name="startPrice" onChange={handleChange} value={values.startPrice} />
                        </div>
                        <div>
                            <label htmlFor="endTime">종료날짜</label>
                            <input type="date" id="endTime" onChange={handleChange} />
                        </div>
                        <div className="form-group" style={{ minWidth: "25vw" }}>
                            <label htmlFor="location">위치</label>
                            <input type="text" id="location" name="location" onChange={handleChange} value={values.location} />
                        </div>
                        <div>
                            <FileUpload />
                        </div>
                        <div className="form-group" style={{ minWidth: "25vw" }}>
                            <button type="submit" style={{ width: "100%" }}>등록</button>
                        </div>

                    </form>
                </div>
            }
        </div>
    );*/
};

export default Upload;