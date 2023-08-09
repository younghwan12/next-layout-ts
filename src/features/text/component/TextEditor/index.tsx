import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';

function CKEditorComponent({data, setData}) {
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    import('@ckeditor/ckeditor5-react')
      .then(({ CKEditor }) => {
        setEditorLoaded(true);
      })
      .catch(error => {
        console.error('Error loading CKEditor:', error);
      });
  }, []);

  if (!editorLoaded) {
    return <Spin />;
  }

  const { CKEditor } = require('@ckeditor/ckeditor5-react');
  const Editor = require('ckeditor5-custom-build/build/ckeditor');

  return (
    <div>
      <CKEditor
        editor={Editor}
        data={data}
        onChange={(event, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      />
    </div>
  ); 
}

export default CKEditorComponent;