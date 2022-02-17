import React, {useState} from 'react'; 

import { Card } from 'react-bootstrap';

import imageCompression from 'browser-image-compression';

const ImageCompressorComponent = () => {
    
    const [compressedLink, setCompressedLink] = useState("");
    const [originalImage, setOriginalImage] = useState("");
    const [originalLink, setOriginalLink] = useState("");
    const [clicked, setClicked] = useState(false);
    const [uploadImage, setUploadImage] = useState(false);
    const [outputFilename, setOutputFilename] = useState("");


    const handle = (e) => {
        const imageFile = e.target.files[0];
        setOriginalLink(URL.createObjectURL(imageFile));
        setOriginalImage(imageFile);
        setOutputFilename(imageFile.name);
        setUploadImage(true);
    }

    const click = (e) => {
        e.preventDefault();

        const options = {
            maxSizeMB: 2,
            maxWidthOrHeight: 800,
            useWebWorker: true 
        }

        if (options.maxSizeMB >= originalImage.size/1024) {
            alert("Svp veuillez charger une image avec une taille plus grande");
            return 0
        }

        let output;
        imageCompression(originalImage, options).then(val => {
            output = val;

            const downloadLink = URL.createObjectURL(output);
            setCompressedLink(downloadLink)
            setClicked(true);
        })
    }

    return (
        <div className='m-5'>
            <div className='text-center'>
                <h1 className='fw-600 text-white'>Application Compression d'Image</h1>
            </div>

            <div className='row mt-5 d-flex align-items-center justify-content-center'>
                <div className='border-all col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                    {uploadImage ? <Card.Img className="ht" variant="top" src={originalLink}></Card.Img> : <></> }

                    <div className="d-flex justify-content-center">
                        <input type="file" accept="image/*" className="mt-2 btn btn-warning w-75" onChange={e => handle(e)} />
                    </div>
                </div>

                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 my-5 d-flex justify-content-center align-items-baseline">
                    <br/>
                    { outputFilename ? <button type="button" className="btn btn-warning fw-600" onClick={e => click(e)}>Compresser</button> : <></>}
                </div>

                <div className={clicked ? "border-all col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3" : "col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3"} >
                    <Card.Img className="ht" variant="top" src={compressedLink}></Card.Img>

                    { clicked ? (
                        <div className="d-flex justify-content-center">
                            <a href={compressedLink} download={outputFilename} className="btn btn-warning fw-600 mt-2 w-75">Télécharger</a>
                        </div>
                    ) : <></>}
                </div>
            </div>
        </div>
    );
}

export default ImageCompressorComponent;