import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
export default function FileUpload({
    value,
    allowMultiple = false,
    maxFiles = 5,
    name = "file",
    label = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    onChange
}) {
    const [files, setFiles] = useState(value || []); 
 

   const handleFileChange = (fileItem) =>{ 
    onChange(fileItem)

    console.log(fileItem)
    }
 
    return (
        <div className="App">
            
                <FilePond
                    files={value}
                    onupdatefiles={(fileItems)=>{
                      setFiles({
                        files: fileItems.map(fileItem => fileItem.file)
                    })
                     handleFileChange(fileItems[0].file)
                    }}
                    allowMultiple={allowMultiple}
                    maxFiles={maxFiles}
                    // server={{
                    //     process: {
                    //         url: "/filepond_upload",
                    //         method: "POST", // Your API endpoint for handling file uploads
                    //         headers: {
                    //             "X-CSRF-TOKEN": csrfToken, // Add CSRF token if required
                    //         },
                    //     },
                    // }}
                    server={null}
                    name={
                        name
                    } /* sets the file input name, it's filepond by default */
                    labelIdle={label}
                />  
        </div>
    );
}
