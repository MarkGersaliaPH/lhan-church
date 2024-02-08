import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

export default function RichTextEditor({setData,name,value}) {

    const handleChange = (value) =>{ 
       setData(name,value)
       
    }

  return (
    <Editor
      apiKey='5ptxxeac7r9wesnteagkixj7dt638wsv44snblzk6a826nuu'
      
      onEditorChange={(newValue, editor) => handleChange(newValue)}
      init={{
        
        height: 500,
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount preview',
        toolbar: 'undo redo  | blocks fontfamily fontsize | bold italic underline strikethrough  | preview |link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat | ',
      }}
      value={value}
    />
  );
}