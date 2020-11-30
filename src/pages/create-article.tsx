import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const CreateArticle = () => {
  const options = {
    showPathLabel: false,
    charCounter: true,
    buttonList: [
      ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
      ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
      ['link', 'image', 'video'],
      ['fullScreen', 'preview', 'save'],
    ],
    callBackSave: (contents) => {
      console.log(contents);
    },
  };

  return (
    <div className='mx-auto space-y-2 max-w-6xl min-h-screen text-black'>
      <SunEditor height={500} enableToolbar={true} setDefaultStyle='font-size: 20px;' setOptions={options} />
    </div>
  );
};

export default CreateArticle;
