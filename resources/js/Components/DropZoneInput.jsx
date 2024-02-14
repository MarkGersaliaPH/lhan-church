import React, { useState, useEffect } from 'react';

// React Dropzone
import { useDropzone } from 'react-dropzone';

// Pintura Image Editor
import '@pqina/pintura/pintura.css';
import { openDefaultEditor } from '@pqina/pintura';
import SecondaryButton from './SecondaryButton';

// Based on the default React Dropzone image thumbnail example
// The `thumbButton` style positions the edit button in the bottom right corner of the thumbnail
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    padding: 20,
};

const thumb = {
    position: 'relative',
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const thumbButton = {
    position: 'absolute',
    right: 10,
    bottom: 10,
};

// This function is called when the user taps the edit button.
// It opens the editor and returns the modified file when done
const editImage = (image, done) => {
    const imageFile = image.pintura ? image.pintura.file : image;
    const imageState = image.pintura ? image.pintura.data : {};

    const editor = openDefaultEditor({
        src: imageFile,
        imageState,
    });

    editor.on('close', () => {
        // the user cancelled editing the image
    });

    editor.on('process', ({ dest, imageState }) => {
        Object.assign(dest, {
            pintura: { file: imageFile, data: imageState },
        });
        done(dest);
    });
};


const onChange = (file) =>{
    var formData = new FormData();
    console.log(file);
    formData.append("file", file[0]);
    axios.post("/upload-temp", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
function DropZoneInput(props) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
          'image/*': [],
        },
        onDrop: (acceptedFiles) => {
            onChange(acceptedFiles);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        url: URL.createObjectURL(file),
                    })
                )
            );
        },
    });
 
 
    const thumbs = props.value.map((file, index) => (
        <div   className="flex flex-col justify-center items-center" key={file.name}>
            <div style={thumbInner}>
                <img src={file.url}  
                className="rounded-lg  mx-auto  w-1/2" alt="" />
            </div>
            {!props.value.url  && 
            <SecondaryButton 
            className='mt-5'
                onClick={() =>
                    editImage(file, (output) => { 
                        const updatedFiles = [...files];

                        // replace original image with new image
                        updatedFiles[index] = output;

                        // revoke url URL for old image
                        if (file.url) URL.revokeObjectURL(file.url);

                        // set new url URL
                        Object.assign(output, {
                            url: URL.createObjectURL(output),
                        });

                        // update view
                        setFiles(updatedFiles);
                    })
                }
            >
                Edit
            </SecondaryButton>
            }
        </div>
    ));
 
    useEffect(
        () => () => {
            // Make sure to revoke the Object URL to avoid memory leaks
            files.forEach((file) => URL.revokeObjectURL(file.url));
        },
        [files]
    );
   
    return (
        <section className="container">
            
            <div >
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center justify-center w-full">
                        <label
                        {...getRootProps({ className: "dropzone" })}
                            for="dropzone-file"
                            className="flex flex-col items-center justify-center w-full p-2 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <input {...getInputProps()} />
 
                                <div className="flex flex-col items-center justify-center pt-5  ">
                                    <svg
                                        className="w-10 h-10 mb-3 text-gray-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        ></path>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">
                                            Click to upload
                                        </span>{" "}
                                        or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                    </p>
                                </div> 


                        </label>
                    </div>

                </div>
                <aside className="mt-5 w-full ">{thumbs}</aside>

            </div>
        </section>
    );
}

export default DropZoneInput;