import Editor from '../components/Editor';

const CreateArticle = () => {
  return <Editor />;
};

export default CreateArticle;

// import SunEditor from 'suneditor-react';
// import 'suneditor/dist/css/suneditor.min.css';

// const CreateArticle = () => {
//   const options = {
//     showPathLabel: false,
//     charCounter: true,
//     width : '100%',
//     buttonList: [
//       ['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
//       ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
//       ['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
//       ['link', 'image', 'video'],
//       ['fullScreen', 'preview', 'save'],
//     ],
//     callBackSave: (contents) => {
//       console.log(contents);
//     },
//   };

//   return (
//     <div className='mx-auto space-y-2 max-w-6xl min-h-screen text-black'>
//       <SunEditor
//         height={500}
//         enableToolbar={true}
//         setDefaultStyle='font-size: 20px;'
//         setOptions={options}
//         onImageUploadBefore={onImageUploadBefore}
//       />
//     </div>
//   );
// };

// export default CreateArticle;

// const onImageUploadBefore = (files, info, uploadHandler) => {
//   try {
//     ResizeImage(files, uploadHandler);
//   } catch (err) {
//     uploadHandler(err.toString());
//   }
// };

// const ResizeImage = (files, uploadHandler) => {
//   const uploadFile = files[0];
//   const img = document.createElement('img');
//   const canvas = document.createElement('canvas');
//   const reader = new FileReader();

//   reader.onload = (e) => {
//     img.src = e.target.result.toString();
//     img.onload = () => {
//       let ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0);

//       const MAX_WIDTH = 1000;
//       const MAX_HEIGHT = 1000;
//       let width = img.width;
//       let height = img.height;

//       if (width > height) {
//         if (width > MAX_WIDTH) {
//           height *= MAX_WIDTH / width;
//           width = MAX_WIDTH;
//         }
//       } else {
//         if (height > MAX_HEIGHT) {
//           width *= MAX_HEIGHT / height;
//           height = MAX_HEIGHT;
//         }
//       }

//       canvas.width = width;
//       canvas.height = height;

//       ctx = canvas.getContext('2d');
//       ctx.drawImage(img, 0, 0, width, height);

//       canvas.toBlob(
//         (blob) => {
//           uploadHandler([new File([blob], uploadFile.name)]);
//         },
//         uploadFile.type,
//         1
//       );
//     };
//   };

//   reader.readAsDataURL(uploadFile);
// };
