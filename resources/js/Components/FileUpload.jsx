import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Import React FilePond
import { FilePond, registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import SecondaryButton from "./SecondaryButton";
import FilePondPluginImageEdit from "filepond-plugin-image-edit";
import { createDefaultImageReader, createDefaultImageWriter, legacyDataToImageState, openEditor, processImage,getEditorDefaults } from "@pqina/pintura";

// Register the plugins
registerPlugin( 
    FilePondPluginImagePreview,
    FilePondPluginImageEdit,
    
);

// Our app
export default function FileUpload({
    value,
    allowMultiple = false,
    maxFiles = 5,
    name = "file",
    label = 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>',
    onChange,
}) {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (value && value.url) {
            setFiles([
                {
                    source: value.url,
                    options: { type: "local" },
                },
            ]);
        }
    }, [value]);

    const handleFileChange = (newFiles) => {
        setFiles(newFiles);
    };

    return (
        <div className="App">
            <FilePond
                files={files}
                onupdatefiles={handleFileChange}
                allowMultiple={allowMultiple}
                maxFiles={maxFiles}
                server={{
                    process: {
                        url: "/upload-temp",
                        method: "POST", // Your API endpoint for handling file uploads
                        headers: {
                            "X-CSRF-TOKEN": csrfToken, // Add CSRF token if required
                        },
                    },
                    load: (source, load, error, progress, abort, headers) => {
                        var myRequest = new Request(source);
                        fetch(myRequest).then(function (response) {
                            response.blob().then(function (myBlob) {
                                load(myBlob);
                            });
                        });
                    },
                }}
                imageEditAllowEdit={true}
                imageEditorInstantEdit={false}
                allowImageEditor={true}
                imageEditorWriteImage={true}
                imageEditorSupportEdit={true}
                imageEditorSupportWriteImage={true}
                imageEditorSupportImage={(file) => /^image/.test(file.type)}
                imageEditorIconEdit="<svg>"
                styleImageEditorButtonEditItemPosition="bottom center"
                imageEditorAfterWriteImage={(res) => res.dest}
                imageEditEditor={{
                 
                        // Maps legacy data objects to new imageState objects (optional)
                        legacyDataToImageState: legacyDataToImageState,

                        // Used to create the editor (required)
                        createEditor: openEditor,

                        // Used for reading the image data. See JavaScript installation for details on the `imageReader` property (required)
                        imageReader: [
                            createDefaultImageReader,
                            {
                                // createDefaultImageReader options here
                            },
                        ],

                        // Required when generating a preview thumbnail and/or output image
                        imageWriter: [
                            createDefaultImageWriter,
                            {
                                // We'll resize images to fit a 512 × 512 square
                                targetSize: {
                                    width: 512,
                                    height: 512,
                                },
                            },
                        ],

                        // Used to create poster and output images, runs an invisible "headless" editor instance
                        imageProcessor: processImage,

                        // Pintura Image Editor options
                        editorOptions: {
                            // Pass the editor default configuration options
                            ...getEditorDefaults(),

                            // This will set a square crop aspect ratio
                            imageCropAspectRatio: 1,
                        }, 
                }}
                name={
                    name
                } /* sets the file input name, it's filepond by default */
                labelIdle={label}
            />
        </div>
    );
}
